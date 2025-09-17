package com.project.ai_marketing.dto;


public class MarketingEmailRequest {
    private String cgid;
    private String requirement;

    public String getCgid() {
        return cgid;
    }

    public void setCgid(String cgid) {
        this.cgid = cgid;
    }

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }
}
