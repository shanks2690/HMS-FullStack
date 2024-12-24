package org.hms.Guard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableFeignClients

public class GuardStart {

	public static void main(String[] args) {
		SpringApplication.run(GuardStart.class, args);
	}

}
