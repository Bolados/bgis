package dev.bscako.bgis.bgisapi.domains.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.bscako.bgis.bgisapi.domains.entities.embeddable.LanguageCountryNameId;
import dev.bscako.bgis.bgisapi.domains.entities.meta.AbstractMetaEntityDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"country", "language"})
public class LanguageCountryName extends AbstractMetaEntityDate {

    @EmbeddedId
    private LanguageCountryNameId id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("countryId")
    @JsonIgnoreProperties(value = {"languageCountryNames"})
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("languageId")
    @JsonIgnoreProperties(value = {"languageCountryNames"})
    private Language language;
}
