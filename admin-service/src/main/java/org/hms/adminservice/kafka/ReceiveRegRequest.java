package org.hms.adminservice.kafka;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.hms.adminservice.dto.CredToken;
import org.hms.adminservice.mapper.PatCredMapper;
import org.hms.adminservice.repository.RegRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class ReceiveRegRequest {

private final RegRepository regRepository;
    private final ObjectMapper objectMapper;
    private final String topic = "PATREG";
    @KafkaListener(topics = topic, groupId = "ADMINBOX")
    public void consumeMessage(String message) {
       try{
           CredToken request = objectMapper.readValue(message,CredToken.class);
           log.info("Received message: {}", request);
           if(regRepository.findByEmail(request.getEmail()).isEmpty()) {
               regRepository.save(PatCredMapper.tokenToCred(request));
           }
           }
       catch (Exception e) {
           throw new RuntimeException(e);
       }
    }
}
