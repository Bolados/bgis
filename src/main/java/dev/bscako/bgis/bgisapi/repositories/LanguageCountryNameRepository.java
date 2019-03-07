package dev.bscako.bgis.bgisapi.repositories;

import dev.bscako.bgis.bgisapi.domains.entities.LanguageCountryName;
import dev.bscako.bgis.bgisapi.domains.entities.embeddable.LanguageCountryNameId;
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
@RepositoryRestResource(collectionResourceRel = LanguageCountryNameRepository.PATH, path = LanguageCountryNameRepository.PATH)
public interface LanguageCountryNameRepository extends JpaRepository<LanguageCountryName, LanguageCountryNameId> {
    String PATH = "languagesCountryNames";

    @RestResource(path = "byCountryName", rel = "customFindMethod")
    @Query("select l from LanguageCountryName l left join " +
            "fetch l.country left join fetch l.language " +
            " where l.country.name =:name ")
    List<LanguageCountryName> findByCountryName(@Param("name") String name);

    @RestResource(path = "byCountryCode", rel = "customFindMethod")
    @Query("select l from LanguageCountryName l left join " +
            "fetch l.country left join fetch l.language " +
            "where l.country.code2 =:code or l.country.code3=:code or l.country.phoneCode=:code")
    List<LanguageCountryName> findByCountryCode(@Param("code") String code);

    @RestResource(path = "byCountryDomain", rel = "customFindMethod")
    @Query("select l from LanguageCountryName l left join " +
            "fetch l.country left join fetch l.language " +
            " where l.country.domain =:domain ")
    List<LanguageCountryName> findByCountryDomain(@Param("domain") String domain);

    @RestResource(path = "byLanguageName", rel = "customFindMethod")
    @Query("select l from LanguageCountryName l left join " +
            "fetch l.country left join fetch l.language " +
            " where l.language.name =:name ")
    List<LanguageCountryName> findByLanguageName(@Param("name") String name);

    @RestResource(path = "byLanguageCode", rel = "customFindMethod")
    @Query("select l from LanguageCountryName l left join " +
            "fetch l.country left join fetch l.language " +
            "where l.language.code =:code ")
    List<LanguageCountryName> findByLanguageCode(@Param("code") String code);


    @RestResource(path = "all", rel = "customFindMethod")
    @Query("select l from LanguageCountryName l left join fetch l.country left join fetch l.language ")
    List<LanguageCountryName> findAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    @Query("select l from LanguageCountryName l left join " +
            "fetch l.country left join fetch l.language  where l.id =:aLong")
    Optional<LanguageCountryName> findById(LanguageCountryNameId aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteById(LanguageCountryNameId aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void delete(LanguageCountryName entity);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll(Iterable<? extends LanguageCountryName> entities);

}
