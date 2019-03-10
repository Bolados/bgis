package dev.bscako.bgis.bgisapi.domains.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.bscako.bgis.bgisapi.domains.entities.meta.AbstractMetaEntityIdDate;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@ApiModel
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"languageCountryNames"})
public class Language extends AbstractMetaEntityIdDate {

    private static final long serialVersionUID = 4948305213017023543L;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false, length = 3)
    private String code;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "language", orphanRemoval = true)
    @JsonIgnoreProperties(value = {"language"})
    private List<LanguageCountryName> languageCountryNames = new ArrayList<>();

    @PrePersist
    @PreUpdate
    public void updateLanguageCountryNameAssociation() {
        for (LanguageCountryName languageCountryName : this.languageCountryNames) {
            languageCountryName.setLanguage(this);
        }
    }

}
