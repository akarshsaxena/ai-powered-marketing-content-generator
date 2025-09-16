package com.project.ai_marketing.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDTO {
    private long id;
    private String cgid;
    private String fullName;
    private String email;       // masked
    private String phone;       // masked
    private String gender;
    private String customerType;
    private String city;
    private String state;
    private String country;
    private String pincode;
}
