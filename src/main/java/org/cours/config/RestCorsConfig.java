
package org.cours.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.cours.modele.Voiture;
import org.cours.modele.Proprietaire;

@Configuration
public class RestCorsConfig implements RepositoryRestConfigurer {
  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
    cors.addMapping("/api/**")
        .allowedOrigins("http://localhost:3000")
        .allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
        .allowCredentials(true);
    config.exposeIdsFor(Voiture.class, Proprietaire.class);	
  }
}
