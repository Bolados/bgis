package dev.bscako.bgis.bgisapi.domains.entities.meta;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.MappedSuperclass;
import javax.persistence.Version;
import java.io.Serializable;


@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public abstract class AbstractMetaEntity implements Serializable, Cloneable {

    @Version
    private int version;
}
