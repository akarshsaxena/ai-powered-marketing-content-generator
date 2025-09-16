package com.project.ai_marketing.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerDTO {
    private String cgid;
    private String fullName;
    private String email;       // masked
    private String phone;       // masked
    private String customerType;
    private String city;
    private String state;
    private String country;
    private String pincode;
}
