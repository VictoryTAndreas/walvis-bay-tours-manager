package com.backend.config;

import com.backend.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                // IMPORTANT: You must link the CORS configuration source here
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**", "/api/payments/**", "/api/promotions/**", "/api/packages/**", "/api/guides/**", "/api/availability/**", "/api/reports/**").permitAll()
                        .requestMatchers("/api/manager/dashboard/**", "/api/clients/**", "/api/adminmanagement/**").permitAll()
                        .requestMatchers("/api/consultant/**").hasRole("SENIOR_TRAVEL_CONSULTANT")
                        .requestMatchers("/api/customer-service/**", "/api/reservations/**").hasRole("CUSTOMER_SERVICE_EXECUTIVE")
                        .requestMatchers("/api/marketing/**").hasRole("MARKETING_MANAGER")
                        .requestMatchers("/api/admin/**").hasAnyRole("GENERAL_MANAGER", "SENIOR_TRAVEL_CONSULTANT", "CUSTOMER_SERVICE_EXECUTIVE", "MARKETING_MANAGER")
                        .anyRequest().authenticated())
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        
        // Include Vite (5173), legacy React (3000), and your production URL
        cfg.setAllowedOrigins(List.of(
            "http://localhost:5173", 
            "http://localhost:3000", 
            "https://victorytandreas.github.io"
        ));
        
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        
        // Allowing all headers avoids issues with custom JWT or Content-Type headers
        cfg.setAllowedHeaders(List.of("*"));
        
        // Essential if you are using cookies or Authorization headers
        cfg.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}