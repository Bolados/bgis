package dev.bscako.bgis.bgisapi.domains.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.bscako.bgis.bgisapi.domains.entities.meta.AbstractMetaEntityIdDateGeometry;
import lombok.*;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@RestResource
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"region", "languageCountryNames", "departments"})
@ToString(callSuper = true, exclude = {"languageCountryNames", "departments"})
@Table(indexes = {@Index(columnList = "shape", name = "sidx_country_shape")},
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name", name = "uk_country_name"),
                @UniqueConstraint(columnNames = "code2", name = "uk_country_code2"),
                @UniqueConstraint(columnNames = "code3", name = "uk_country_code3"),
                @UniqueConstraint(columnNames = "domain", name = "uk_country_domain"),
                @UniqueConstraint(columnNames = "phoneCode", name = "uk_country_phoneCode")
        })
public class Country extends AbstractMetaEntityIdDateGeometry {

    @Column(nullable = false)
    private String name;

    @Column
    private String variant;

    @Column(length = 2)
    private String code2;

    @Column(length = 3)
    private String code3;

    @Column
    private Integer phoneCode;

    @Column
    private Long population;

    @Column
    private Float density;

    @Column
    private String domain;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "region", nullable = false)
    @JsonIgnoreProperties(value = {"countries"})
    private Region region;

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "country", orphanRemoval = true)
    @JsonIgnoreProperties(value = {"country"})
    private Set<LanguageCountryName> languageCountryNames = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "country", orphanRemoval = true)
    @JsonIgnoreProperties(value = {"country"})
    private Set<Department> departments = new HashSet<>();

    @PrePersist
    @PreUpdate
    public void updateAssociations() {
        for (LanguageCountryName languageCountryName : this.languageCountryNames) {
            languageCountryName.setCountry(this);
        }
        for (Department department : this.departments) {
            department.setCountry(this);
        }
    }


}
