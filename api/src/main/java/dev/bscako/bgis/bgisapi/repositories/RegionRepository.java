package dev.bscako.bgis.bgisapi.repositories;

import dev.bscako.bgis.bgisapi.domains.entities.Region;
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
@RepositoryRestResource(collectionResourceRel = RegionRepository.PATH, path = RegionRepository.PATH)
public interface RegionRepository extends JpaRepository<Region, Long> {
    String PATH = "regions";

    @RestResource(path = "byName", rel = "customFindMethod")
    @Query("select l from Region l left join fetch l.countries " +
            "where l.code=:name ")
    Optional<Region> findByName(@Param("name") String name);

    @RestResource(path = "byCode", rel = "customFindMethod")
    @Query("select l from Region l left join fetch l.countries " +
            "where l.code=:code ")
    Optional<Region> findByCode(@Param("code") String code);

    @RestResource(path = "all", rel = "customFindMethod")
    @Query("select l from Region l left join fetch l.countries ")
    List<Region> findAllWithCountries();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    @Query("select l from Region l left join fetch l.countries " +
            "where l.id=:aLong ")
    Optional<Region> findById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void delete(Region entity);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll(Iterable<? extends Region> entities);

}
