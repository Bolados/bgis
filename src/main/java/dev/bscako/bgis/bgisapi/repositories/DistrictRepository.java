package dev.bscako.bgis.bgisapi.repositories;

import dev.bscako.bgis.bgisapi.domains.entities.District;
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
@RepositoryRestResource(collectionResourceRel = DistrictRepository.PATH, path = DistrictRepository.PATH)
public interface DistrictRepository extends JpaRepository<District, Long> {
    String PATH = "districts";


    @RestResource(path = "byName", rel = "customFindMethod")
    @Query("select l from District l left join fetch l.department " +
            "left join fetch l.towns where l.name =:name")
    Optional<District> findByName(@Param("name") String name);

    @RestResource(path = "byCode", rel = "customFindMethod")
    @Query("select l from District l left join fetch l.department " +
            "left join fetch l.towns where l.code =:code")
    Optional<District> findByCode(@Param("code") String code);


    @RestResource(path = "all", rel = "customFindMethod")
    @Query("select l from District l left join fetch l.department " +
            "left join fetch l.towns")
    List<District> findAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    @Query("select l from District l left join fetch l.department " +
            "left join fetch l.towns where l.id =:aLong")
    Optional<District> findById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void delete(District entity);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll(Iterable<? extends District> entities);

}
