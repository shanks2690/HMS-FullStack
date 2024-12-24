package org.hms.Guard.feignservices;

import org.hms.Guard.entity.SimpleMail;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;


@FeignClient(name="MAILING-SERVICE")
public interface MailFeign {
    @PostMapping("mail/normal")
    public ResponseEntity<?> sendMail( SimpleMail simpleMail);
}
