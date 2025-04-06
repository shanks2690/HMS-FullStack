package org.shanks;


public class MailBoxObject {
    public String pname;
    public String dname;
    public Boolean approval;

    public MailBoxObject() {
    }

    public MailBoxObject(String pname, String dname, Boolean approval) {
        this.pname = pname;
        this.dname = dname;
        this.approval = approval;
    }
}