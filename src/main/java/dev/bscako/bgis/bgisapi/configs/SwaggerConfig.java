package dev.bscako.bgis.bgisapi.configs;

import com.fasterxml.classmate.TypeResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.BuildProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.async.DeferredResult;
import springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.WildcardType;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.*;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;

import java.time.LocalDate;

import static springfox.documentation.schema.AlternateTypeRules.newRule;

@Configuration
@EnableSwagger2WebMvc
@Import({SpringDataRestConfiguration.class
         , BeanValidatorPluginsConfiguration.class
        })
public class SwaggerConfig {

    private TypeResolver typeResolver;

    private BuildProperties buildProperties;

    @Autowired
    public SwaggerConfig(TypeResolver typeResolver,BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
        this.typeResolver = typeResolver;
    }

    @Bean
    public Docket bgisApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("bgis-api")
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiMetadata())
                .pathMapping("/")
                .directModelSubstitute(LocalDate.class, String.class)
                .genericModelSubstitutes(ResponseEntity.class)
                .alternateTypeRules(
                        newRule(typeResolver.resolve(DeferredResult.class,
                                typeResolver.resolve(ResponseEntity.class, WildcardType.class)),
                                typeResolver.resolve(WildcardType.class)))
//                .useDefaultResponseMessages(false)
//                .globalResponseMessage(RequestMethod.GET,
//                        CollectionHelper.newArrayList(new ResponseMessageBuilder()
//                                .code(500)
//                                .message("500 message")
//                                .responseModel(new ModelRef("Error"))
//                                .build()))
//                .securitySchemes(newArrayList(apiKey()))
//                .securityContexts(newArrayList(securityContext()))
//                .enableUrlTemplating(true)
//                .globalOperationParameters(
//                        newArrayList(new ParameterBuilder()
//                                .name("someGlobalParameter")
//                                .description("Description of someGlobalParameter")
//                                .modelRef(new ModelRef("string"))
//                                .parameterType("query")
//                                .required(true)
//                                .build()))
                .tags(new Tag("BGIS Service", "All apis relating to bgis"))
//                .additionalModels(typeResolver.resolve(AdditionalModel.class))
                ;
    }

    @Bean
    UiConfiguration uiConfig() {
        return UiConfigurationBuilder.builder()
                .deepLinking(true)
                .displayOperationId(false)
                .defaultModelsExpandDepth(1)
                .defaultModelExpandDepth(1)
                .defaultModelRendering(ModelRendering.EXAMPLE)
                .displayRequestDuration(false)
                .docExpansion(DocExpansion.NONE)
                .filter(false)
                .maxDisplayedTags(null)
                .operationsSorter(OperationsSorter.ALPHA)
                .showExtensions(false)
                .tagsSorter(TagsSorter.ALPHA)
                .supportedSubmitMethods(UiConfiguration.Constants.DEFAULT_SUBMIT_METHODS)
                .validatorUrl(null)
                .build();
    }


//    @Bean
//    public Docket api() {
//        return new
//                Docket(DocumentationType.SWAGGER_2)
//                .groupName("Example")
//                .directModelSubstitute(XMLGregorianCalendar.class, String.class)
//                .select()
//                .apis(RequestHandlerSelectors.any())
////                        .apis(RequestHandlerSelectors.withMethodAnnotation(RepositoryRestResource.class))
////                        .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
//                .paths(PathSelectors.any())
//                .build().apiInfo(apiMetadata())
////                    .securitySchemes(this.securitySchemes())
////                    .securityContexts(Arrays.asList(this.securityContext()))
//                ;
//
//    }

    /*
        Security implementation
     */
//    public SecurityContext securityContext() {
//        AuthorizationScope[] scopes = {
//                new AuthorizationScope("read", "for read operation"),
//                new AuthorizationScope("write", "for write operation")
//        };
//        List<SecurityReference> securityReferences = Arrays.asList(
//                new SecurityReference("basicAuth", scopes),
//                new SecurityReference("Key", scopes),
//                new SecurityReference("User Authentification Token", scopes)
//        );
//        return SecurityContext.builder().securityReferences(securityReferences)
//                .forPaths(PathSelectors.any())
//                .build();
//    }
//
//    public List<SecurityScheme> securitySchemes() {
//        SecurityScheme basicAuth = new BasicAuth("basicAuth");
//        SecurityScheme userAuthToken = new ApiKey("User Authentification Token", "Authorization", "header");
//        SecurityScheme keyAuth = new ApiKey("Key", "Key", "header");
//        return Arrays.asList(keyAuth, userAuthToken, basicAuth);
//    }

    /**
     * Adds meta to Swagger
     *
     * @return ApiInfo
     */
    private ApiInfo apiMetadata() {
        String title = "BGIS API";
        String description = "Description";
        String company = "BTECH";
        String website = "bscako.tech";
        String email = "contact@bscako.tech";
        String licence = "";
        String licenceUrl = "";
        String termService = "";
        return new ApiInfoBuilder().title(title)
                .description(description)
                .version(buildProperties.getVersion())
                .contact(new Contact(company,
                        website,
                        email))
                .license(licence)
                .licenseUrl(licenceUrl)
                .termsOfServiceUrl(termService).build();
    }
}
