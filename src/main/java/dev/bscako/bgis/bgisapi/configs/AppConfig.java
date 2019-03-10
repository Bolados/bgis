package dev.bscako.bgis.bgisapi.configs;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@Configuration
@EnableJpaAuditing
public class AppConfig {

    @Bean
    public ObjectMapper objectMapperBean() {
        return new ObjectMapper();
    }


}
