package org.hms.Guard.kafka;


import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class ProducerConfiguration {

    @Bean
    public NewTopic newTopic2() {
        return TopicBuilder.name("PATCRED").build();
    }


}
