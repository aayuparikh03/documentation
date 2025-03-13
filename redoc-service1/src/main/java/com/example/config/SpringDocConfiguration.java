package com.example.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfiguration {
    @Bean
    public OpenAPI customOpenAPI() {
        Info apiInfo = new Info();
        apiInfo.setTitle("Greeting API");
        apiInfo.setVersion("1.0");
        apiInfo.setDescription("API documentation using Redoc");

        return new OpenAPI().info(apiInfo);
    }
}
