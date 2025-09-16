package com.project.ai_marketing.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TrialController {
    @GetMapping("/")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}

