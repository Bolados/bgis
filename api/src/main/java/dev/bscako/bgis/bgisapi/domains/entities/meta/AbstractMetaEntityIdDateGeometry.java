package dev.bscako.bgis.bgisapi.domains.entities.meta;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import dev.bscako.bgis.bgisapi.domains.helpers.jtsgeojson.JtsGeometryDeserializer;
import dev.bscako.bgis.bgisapi.domains.helpers.jtsgeojson.JtsGeometrySerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Polygon;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public abstract class AbstractMetaEntityIdDateGeometry extends AbstractMetaEntityIdDate {

    @Column
    @JsonSerialize(using = JtsGeometrySerializer.class)
    @JsonDeserialize(using = JtsGeometryDeserializer.class)
    private Polygon shape;

    public void setShape(Polygon polygon) {
        setShape(polygon, 4326);
    }

    public void setShape(Polygon polygon, int srid) {
        shape = polygon;
        shape.setSRID(srid);
    }


}
