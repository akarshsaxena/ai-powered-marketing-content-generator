package com.project.ai_marketing.service;


import com.project.ai_marketing.entity.Customer;
import com.project.ai_marketing.repository.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class GeminiService {
    private final CustomerRepository customerRepository;
    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String apiUrl;
    private final String bankName = "NAB";

    public GeminiService(
            CustomerRepository customerRepository,
            RestTemplate restTemplate,
            @Value("${gemini.api.key}") String apiKey,
            @Value("${gemini.api.url}") String apiUrl) {
        this.customerRepository = customerRepository;
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;


    }


    public String generateEmail(String cgid,String requirement) {
        Customer customer = customerRepository.findByCgid(cgid)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        String prompt = """
            You are an AI assistant specialized in personalized marketing.
            Generate a professional marketing email for the following customer:

            Customer Details:
            - Full Name: %s
            - Gender: %s
            - Customer Type: %s
            - Location: %s, %s, %s, %s

            Marketing Requirement:
            %s

            Bank Details:
            - Bank Name: %s

            Guidelines:
            - Use customer name in greeting.
            - Tailor tone according to customer type: %s.
            - Keep tone professional, engaging, and concise.
            - Do not reveal PII like email/phone directly.
            """.formatted(
                customer.getFullName(),
                customer.getGender(),
                customer.getCustomerType(),
                customer.getCity(),
                customer.getState(),
                customer.getCountry(),
                customer.getPincode(),
                requirement,
                bankName,
                customer.getCustomerType()
        );
        log.info("GEMINI prompt - {}", prompt);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        String url = apiUrl + "?key=" + apiKey;

        Map<String, Object> response =
                restTemplate.postForObject(url, requestBody, Map.class);

        if (response != null && response.containsKey("candidates")) {
            log.info("GEMINI response - {}", response);

            Map candidate = ((List<Map>) response.get("candidates")).get(0);
            Map content = (Map) candidate.get("content");
            List<Map> parts = (List<Map>) content.get("parts");
            return (String) parts.get(0).get("text");
        }
        return "No response from Gemini.";
    }
}
