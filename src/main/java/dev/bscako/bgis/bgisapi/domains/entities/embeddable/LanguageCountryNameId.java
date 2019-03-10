package dev.bscako.bgis.bgisapi.domains.entities.embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class LanguageCountryNameId implements Serializable {

    @Column(name = "country_id")
    private Long countryId;

    @Column(name = "language_id")
    private Long languageId;

}
