package com.shanks.appointmentservice.feign;

import com.shanks.appointmentservice.dto.DocDepDto;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class ExternalServiceFallback implements DocFeign {
    @Override
    public List<DocDepDto> getAllDocs() {

        System.out.println("Using circuit breaker");
        return List.of(DocDepDto.builder().message("Fallback response: Service is currently unavailable.").build());
    }
}
