package org.hms.Guard.exception;


import org.hms.Guard.exception.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ApiResponse> handleUserNotFoundException(UserNotFoundException ex) {

        ApiResponse response = ApiResponse.builder().message(ex.getMessage()).status(HttpStatus.NOT_FOUND).success(true).build();
return new ResponseEntity<ApiResponse>(response,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    public ResponseEntity<ApiResponse> handleException(Exception ex) {

        ApiResponse response = ApiResponse.builder().message(ex.getMessage()).status(HttpStatus.NOT_FOUND).success(true).build();
        return new ResponseEntity<ApiResponse>(response, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    public ResponseEntity<ApiResponse> handleErrorSavingUserException(UserNameAlreadyExistsException ex) {

        ApiResponse response = ApiResponse.builder().message(ex.getMessage()).status(HttpStatus.CONFLICT).success(true).build();
        return new ResponseEntity<ApiResponse>(response,HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public ResponseEntity<ApiResponse> handleMailError(MailServiceNotReady ex) {

        ApiResponse response = ApiResponse.builder().message(ex.getMessage()).status(HttpStatus.CONFLICT).success(true).build();
        return new ResponseEntity<ApiResponse>(response,HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public ResponseEntity<ApiResponse> handleBadCredentials(BadCredentialsException ex) {

        ApiResponse response = ApiResponse.builder().message(ex.getMessage()).status(HttpStatus.CONFLICT).success(true).build();
        return new ResponseEntity<ApiResponse>(response,HttpStatus.CONFLICT);
    }
}
