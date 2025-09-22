package com.yourapp.model;

import jakarta.persistence.*;

@Entity
public class ApprovalRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String prompt;

    private String status; // <- make sure this exists

    // getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getStatus() { // <- getter for status
        return status;
    }

    public void setStatus(String status) { // <- setter for status
        this.status = status;
    }
}
