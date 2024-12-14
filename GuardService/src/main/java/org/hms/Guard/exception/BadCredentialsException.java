package org.hms.Guard.exception;

public class BadCredentialsException extends  RuntimeException{
    public BadCredentialsException(String message) {
        super(message);
    }

    public BadCredentialsException() {
        super("Resource not found");
    }
}
