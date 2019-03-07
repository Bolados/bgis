package dev.bscako.bgis.bgisapi.domains.helpers.jtsgeojson;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.locationtech.jts.geom.Geometry;

public class JtsGeoJsonModule extends SimpleModule {

    public JtsGeoJsonModule() {
        super("GeoJson", new Version(1, 0, 0, null,"dev.bscako","jackson-jtsgeojson"));

        addSerializer(Geometry.class, new JtsGeometrySerializer());
        addDeserializer(Geometry.class, new JtsGeometryDeserializer());
    }
}
