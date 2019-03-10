package dev.bscako.bgis.bgisapi.repositories;

import dev.bscako.bgis.bgisapi.domains.entities.Department;
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
@RepositoryRestResource(collectionResourceRel = DepartmentRepository.PATH, path = DepartmentRepository.PATH)
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    String PATH = "departments";


    @RestResource(path = "byName", rel = "customFindMethod")
    @Query("select l from Department l left join fetch l.country " +
            "left join fetch l.districts where l.name =:name")
    Optional<Department> findByName(@Param("name") String name);

    @RestResource(path = "byCode", rel = "customFindMethod")
    @Query("select l from Department l left join fetch l.country " +
            "left join fetch l.districts where l.code =:code")
    Optional<Department> findByCode(@Param("code") String code);


    @RestResource(path = "all", rel = "customFindMethod")
    @Query("select l from Department l left join fetch l.country " +
            "left join fetch l.districts")
    List<Department> findAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    @Query("select l from Department l left join fetch l.country " +
            "left join fetch l.districts where l.id =:aLong")
    Optional<Department> findById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void delete(Department entity);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll(Iterable<? extends Department> entities);

}
