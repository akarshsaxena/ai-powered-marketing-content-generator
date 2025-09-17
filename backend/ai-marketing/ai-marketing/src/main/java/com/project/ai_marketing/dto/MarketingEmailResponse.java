package com.project.ai_marketing.dto;


public class MarketingEmailResponse {
    private String generatedEmail;

    public MarketingEmailResponse(String generatedEmail) {
        this.generatedEmail = generatedEmail;
    }

    public String getGeneratedEmail() {
        return generatedEmail;
    }

    public void setGeneratedEmail(String generatedEmail) {
        this.generatedEmail = generatedEmail;
    }
}
