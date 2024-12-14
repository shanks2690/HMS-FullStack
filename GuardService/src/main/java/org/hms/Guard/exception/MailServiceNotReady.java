package org.hms.Guard.exception;

public class MailServiceNotReady extends  RuntimeException{

    public MailServiceNotReady(String message) {
        super(message);
    }

}
