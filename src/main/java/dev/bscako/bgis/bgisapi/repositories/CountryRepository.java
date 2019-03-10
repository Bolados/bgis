package dev.bscako.bgis.bgisapi.repositories;

import dev.bscako.bgis.bgisapi.domains.entities.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = CountryRepository.PATH, path = CountryRepository.PATH)
public interface CountryRepository extends JpaRepository<Country, Long> {
    String PATH = "countries";


    @RestResource(path = "byName", rel = "customFindMethod")
    @Query("select l from Country l left join fetch l.region " +
            "left join fetch l.languageCountryNames " +
            "left join fetch l.departments " +
            "where l.name =:name")
    Optional<Country> findByName(@Param("name") String name);

    @RestResource(path = "byCode", rel = "customFindMethod")
    @Query("select l from Country l left join fetch l.region " +
            "left join fetch l.languageCountryNames " +
            "left join fetch l.departments " +
            "where l.code2 =:code or l.code3=:code or l.phoneCode=:code")
    Optional<Country> findByCode(@Param("code") String code);

    @RestResource(path = "byDomain", rel = "customFindMethod")
    @Query("select l from Country l left join fetch l.region " +
            "left join fetch l.languageCountryNames " +
            "left join fetch l.departments " +
            "where l.domain =:domain ")
    Optional<Country> findByDomain(@Param("domain") String domain);

    @RestResource(path = "all", rel = "customFindMethod")
    @Query("select l from Country l left join fetch l.region " +
            "left join fetch l.languageCountryNames " +
            "left join fetch l.departments "
    )
    List<Country> findAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    @Query("select l from Country l left join fetch l.region " +
            "left join fetch l.languageCountryNames where l.id =:aLong")
    Optional<Country> findById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void delete(Country entity);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll(Iterable<? extends Country> entities);

}
