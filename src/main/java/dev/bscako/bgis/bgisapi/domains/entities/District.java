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
@EqualsAndHashCode(callSuper = true, exclude = {"department", "towns"})
@ToString(callSuper = true, exclude = "towns")
@Table(indexes = {@Index(columnList = "shape", name = "sidx_district_shape")},
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name", name = "uk_district_name"),
                @UniqueConstraint(columnNames = "code", name = "uk_district_code")
        })
public class District extends AbstractMetaEntityIdDateGeometry {

    @Column(nullable = false)
    private String name;

    @Column
    private String variant;

    @Column(length = 3)
    private String code;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(nullable = false)
    @JsonIgnoreProperties(value = {"departments"})
    private Department department;

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "district", orphanRemoval = true)
    @JsonIgnoreProperties(value = {"district"})
    private Set<Town> towns = new HashSet<>();

    @PrePersist
    @PreUpdate
    public void updateAssociations() {
        for (Town town : this.towns) {
            town.setDistrict(this);
        }
    }

}
