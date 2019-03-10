package dev.bscako.bgis.bgisapi.repositories;

import dev.bscako.bgis.bgisapi.domains.entities.Town;
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
@RepositoryRestResource(collectionResourceRel = TownRepository.PATH, path = TownRepository.PATH)
public interface TownRepository extends JpaRepository<Town, Long> {
    String PATH = "towns";


    @RestResource(path = "byName", rel = "customFindMethod")
    @Query("select l from Town l left join fetch l.district " +
            "where l.name =:name")
    Optional<Town> findByName(@Param("name") String name);


    @RestResource(path = "all", rel = "customFindMethod")
    @Query("select l from Town l left join fetch l.district ")
    List<Town> findAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    @Query("select l from Town l left join fetch l.district " +
            "where l.id =:aLong")
    Optional<Town> findById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void delete(Town entity);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll(Iterable<? extends Town> entities);

}
