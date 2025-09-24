package com.project.ai_marketing.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllEmailResponse {
    private String customerId;
    private String customerType;
    private String email;
    private String status;
}
