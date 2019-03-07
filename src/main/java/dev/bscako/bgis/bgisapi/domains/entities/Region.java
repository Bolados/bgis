package dev.bscako.bgis.bgisapi.domains.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.bscako.bgis.bgisapi.domains.entities.meta.AbstractMetaEntityIdDate;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"code", "name"}, name = "uk_region_code_name_orientation")
})
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"countries"})
@ToString(callSuper = true, exclude = "countries")
public class Region extends AbstractMetaEntityIdDate {
    public static final String FIELD_ENTITY = "Region";

    @Column(length = 2, nullable = false)
    private String code;

    @Column(nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "region", orphanRemoval = true)
    @JsonIgnoreProperties(value = {"region"})
    private List<Country> countries = new ArrayList<>();

    @PrePersist
    @PreUpdate
    public void updateCountryAssociation() {
        for (Country country : this.countries) {
            country.setRegion(this);
        }
    }

}

