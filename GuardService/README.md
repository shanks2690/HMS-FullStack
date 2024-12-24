# Spring-Security-jwt
created new boilerplate code for implementing spring security using jwt token for authorizing and authenticating restful  api endpoints

# Spring Boot Authentication 🌱🔒

Welcome to the modern Spring Boot Authentication setup guide! This guide will help you create a secure authentication system using Spring Boot. 

## Step 1: Create User Entity 🧑🔑

Create a `User` entity with all required fields. Implement the `UserEntity` interface and provide necessary implementations.


## Step 2: Use Repository Interface 🗃️

Extend `JpaRepository<User, Integer>` and declare `findByEmail` method. This handles database interactions.

## Step 3: Implement JwtAuthenticationFilter 🕵️‍♂️🔍

Create a `JwtAuthenticationFilter` by extending `OncePerRequestFilter`. Override `doFilterInternal` method to validate JWT tokens. Ensure it runs once per request.

## Step 4: JwtService Utilities 🛠️🔐

Write utility methods using `io.jsonwebtoken` to generate, check, and validate JWT tokens. Dependencies required.

## Step 5: Security Configuration ⚙️🔐

Annotate your security configuration class with `@EnableSecurity`. Provide a `SecurityFilterChain` bean, specifying routes to exclude from authentication (like login and register). Add `JwtAuthenticationFilter` before `UserNamePasswordAuthenticationFilter.class`. Configure `AuthenticationProvider` specifying the source for username and password (use `UserDetailsService` and `passwordEncoder`).

## Step 6: Authentication Controller 🎛️🔑

Implement authentication controller with `/register` and `/authenticate` routes. Create corresponding methods in `AuthenticationService` for user authentication and registration.

## Inroder to run the local container of postgres db
try running the following command
`
docker-compose -f .\docker-compose.yml up -d db`.
Happy coding! 🚀👨‍💻
link to docs (for personal use only, do not try to visit this link) - https://docs.google.com/document/d/1xBuy9bulgxAwfsA7ZwUTZo8Hh5RhriYJ6RisY4xmEas/edit

