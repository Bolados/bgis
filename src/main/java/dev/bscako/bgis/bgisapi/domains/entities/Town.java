package dev.bscako.bgis.bgisapi.domains.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.bscako.bgis.bgisapi.domains.entities.meta.AbstractMetaEntityIdDateGeometry;
import lombok.*;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;


@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@RestResource
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"district"})
@ToString(callSuper = true)
@Table(indexes = {@Index(columnList = "shape", name = "sidx_town_shape")},
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name", name = "uk_town_name")
        })
public class Town extends AbstractMetaEntityIdDateGeometry {

    private static final long serialVersionUID = 177223631740299185L;

    @Column(nullable = false)
    private String name;

    @Column
    private String variant;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(nullable = false)
    @JsonIgnoreProperties(value = {"towns"})
    private District district;


    @PrePersist
    @PreUpdate
    public void updateAssociations() {

    }

}
