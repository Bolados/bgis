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
@EqualsAndHashCode(callSuper = true, exclude = {"country", "districts"})
@ToString(callSuper = true, exclude = "districts")
@Table(indexes = {@Index(columnList = "shape", name = "sidx_department_shape")},
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name", name = "uk_department_name"),
                @UniqueConstraint(columnNames = "code", name = "uk_department_code")
        })
public class Department extends AbstractMetaEntityIdDateGeometry {

    @Column(nullable = false)
    private String name;

    @Column
    private String variant;

    @Column(length = 3)
    private String code;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "country", nullable = false)
    @JsonIgnoreProperties(value = {"departments"})
    private Country country;

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "department", orphanRemoval = true)
    @JsonIgnoreProperties(value = {"department"})
    private Set<District> districts = new HashSet<>();

    @PrePersist
    @PreUpdate
    public void updateAssociations() {
        for (District district : this.districts) {
            district.setDepartment(this);
        }
    }

}
