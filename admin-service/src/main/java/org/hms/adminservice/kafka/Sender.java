package org.hms.adminservice.kafka;

import org.hms.adminservice.dto.CredToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;


@Service
public class Sender {
    @Autowired
    private KafkaTemplate<String, CredToken> kafkaTemplate;

    public void sendToPat(CredToken message) {

        kafkaTemplate.send("PATCRED", message);
    }
}
