package dev.bscako.bgis.bgisapi.repositories;

import dev.bscako.bgis.bgisapi.domains.entities.Language;
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
@RepositoryRestResource(collectionResourceRel = LanguageRepository.PATH, path = LanguageRepository.PATH)
public interface LanguageRepository extends JpaRepository<Language, Long> {
    String PATH = "languages";

    @RestResource(path = "byName", rel = "customFindMethod")
    @Query("select l from Language l left join " +
            "fetch l.languageCountryNames where l.name =:name ")
    Optional<Language> findByName(@Param("name") String name);

    @RestResource(path = "byCode", rel = "customFindMethod")
    @Query("select l from Language l left join " +
            "fetch l.languageCountryNames where l.code=:code ")
    Optional<Language> findByCode(@Param("code") String code);


    @RestResource(path = "all", rel = "customFindMethod")
    @Query("select l from Language l left join fetch l.languageCountryNames ")
    List<Language> findAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    @Query("select l from Language l left join " +
            "fetch l.languageCountryNames where l.id =:aLong")
    Optional<Language> findById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteById(Long aLong);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void delete(Language entity);

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll();

    @Override
    @RestResource(exported = false)
    @ApiIgnore
    void deleteAll(Iterable<? extends Language> entities);
}
