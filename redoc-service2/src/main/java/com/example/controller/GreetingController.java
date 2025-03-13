package com.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") // Optional base path for the controller
public class GreetingController {

    @GetMapping("/hello")
    public String getGreeting() {
        return "Hello from Spring Boot!";
    }
}
