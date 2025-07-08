package org.hms.adminservice;

import org.hms.adminservice.controller.AdminController;
import org.hms.adminservice.document.RegDoc;
import org.hms.adminservice.dto.CredentialsDto;
import org.hms.adminservice.dto.DocCredDto;
import org.hms.adminservice.dto.RegistrationCredentials;
import org.hms.adminservice.exception.ErrorSavingUserException;
import org.hms.adminservice.exception.GlobalExceptionHandler;
import org.hms.adminservice.exception.UserNotFoundException;
import org.hms.adminservice.exception.payload.ApiResponse;
import org.hms.adminservice.kafka.ReceiveRegRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class AdminServiceApplicationTests {
    @Autowired
    AdminController controller;
    @Autowired
    ReceiveRegRequest request;


    @Test
    void contextLoads() {
        new AdminServiceApplication();

//        controller.getAllUsers();
        controller.getUser("paritosh.anand@gmail.com");
        controller.getRegRequests();
        // registerting and deleting admin
        RegistrationCredentials registrationCredentials = new RegistrationCredentials();
        registrationCredentials.setLastname("abc");
        registrationCredentials.setFirstname("xyz");
        registrationCredentials.setRole("ADMIN");
        registrationCredentials.setEmail("abc@xyz.com");
        registrationCredentials.setPassword("abcd");
        controller.registerUser(registrationCredentials);
        controller.delUser("abc@xyz.com");
// registering and deleting doctor
        registrationCredentials = new RegistrationCredentials();
        registrationCredentials.setLastname("abc");
        registrationCredentials.setFirstname("xyz");
        registrationCredentials.setRole("DOCTOR");
        registrationCredentials.setEmail("abc@xyz.com");
        registrationCredentials.setPassword("abcd");
        controller.registerUser(registrationCredentials);
        controller.delUser("abc@xyz.com");

// registering and deleting RECEPTIONIST
        registrationCredentials = new RegistrationCredentials();
        registrationCredentials.setLastname("abc");
        registrationCredentials.setFirstname("xyz");
        registrationCredentials.setRole("RECEPTIONIST");
        registrationCredentials.setEmail("abc@xyz.com");
        registrationCredentials.setPassword("abcd");
        controller.registerUser(registrationCredentials);
        controller.delUser("abc@xyz.com");

// registering and deleting PATIENT
        registrationCredentials = new RegistrationCredentials();
        registrationCredentials.setLastname("abc");
        registrationCredentials.setFirstname("xyz");
        registrationCredentials.setRole("PATIENT");
        registrationCredentials.setEmail("abc@xyz.com");
        registrationCredentials.setPassword("abcd");
        controller.registerUser(registrationCredentials);
        controller.delUser("abc@xyz.com");
        RegistrationCredentials.builder().toString();
		// registering and deleting PHARMACIST
		registrationCredentials = new RegistrationCredentials();
		registrationCredentials.setLastname("abc");
		registrationCredentials.setFirstname("xyz");
		registrationCredentials.setRole("PHARMACIST");
		registrationCredentials.setEmail("abc@xyz.com");
		registrationCredentials.setPassword("abcd");
		controller.registerUser(registrationCredentials);
		controller.delUser("abc@xyz.com");
    }



    @Test
    void forDto() {
        new CredentialsDto();
        new CredentialsDto("asda", "asdsa", "asdasd", "Asdas");
        DocCredDto doc = new DocCredDto();
        new DocCredDto("asdsa", "Asdasd", "asdasd");
        doc.setEmail(doc.getEmail());
        doc.setFirstname(doc.getFirstname());
        doc.setLastname(doc.getLastname());
        System.out.println(new RegistrationCredentials());
        new RegistrationCredentials("asda", "asdsa", "asdasd", "Asdas", "asdasd");
        RegistrationCredentials.builder().email("Asdasd").role("asdasd").firstname("ASdas").lastname("asdas").password("asdasd").build().toString();

    }


    @Test
    void forExecption() {
        ApiResponse api = new ApiResponse();
        new ApiResponse("asdasd", true, HttpStatus.ACCEPTED);
        api.setMessage(api.getMessage());
        api.setSuccess(api.getSuccess());
        api.setStatus(api.getStatus());
        System.out.println(api);
        ApiResponse.builder().toString();
        ApiResponse.builder().message("Asd").success(true).status(HttpStatus.ACCEPTED).build().toString();
        ErrorSavingUserException eruser = new ErrorSavingUserException("asds");
        UserNotFoundException usernf = new UserNotFoundException("asdsad");
        new GlobalExceptionHandler().handleErrorSavingUserException(eruser);
        new GlobalExceptionHandler().handleUserNotFoundException(usernf);
        new UserNotFoundException();
        new ErrorSavingUserException();
    }


    @Test
    void forDocument() {
        RegDoc regDoc = new RegDoc();
        regDoc.setEmail(regDoc.getEmail());
        regDoc.setFirstname(regDoc.getFirstname());
        regDoc.setRole(regDoc.getRole());
        regDoc.setLastname(regDoc.getLastname());
        System.out.println(regDoc);
        new RegDoc("Asds", "Asdas", "asdads", "asdas");
    }
}
