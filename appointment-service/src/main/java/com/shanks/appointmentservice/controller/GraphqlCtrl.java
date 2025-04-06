package com.shanks.appointmentservice.controller;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class GraphqlCtrl {
@QueryMapping
    public String test() {
    return "Hi Shanks";
}
}
