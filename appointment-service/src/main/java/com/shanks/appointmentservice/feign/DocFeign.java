package com.shanks.appointmentservice.feign;

import com.shanks.appointmentservice.dto.DocDepDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;


@FeignClient(name="DOCTOR", url = "http://localhost:8081",fallback = ExternalServiceFallback.class)
public interface DocFeign {
    @GetMapping("doc/alldocs")
    List<DocDepDto> getAllDocs();
}
