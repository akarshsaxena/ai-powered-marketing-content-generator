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
    private final String
            apiKey;
    private final String apiUrl;

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

    public String formatGeminiResponse(Map<String, Object> response) {
        if (response == null || !response.containsKey("candidates")) {
            return "";
        }

        Map<String, Object> candidate = ((List<Map<String, Object>>) response.get("candidates")).get(0);
        Map<String, Object> content = (Map<String, Object>) candidate.get("content");
        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");

        String rawText = (String) parts.get(0).get("text");

        // Initialize StringBuilder for structured HTML
        StringBuilder html = new StringBuilder();

        // Split by lines for parsing
        String[] lines = rawText.split("\\r?\\n");

        for (String line : lines) {
            line = line.trim();
            if (line.isEmpty()) continue;

            // Subject line
            if (line.startsWith("Subject:")) {
                html.append("<h1 style=\"color:#333;\">")
                        .append(line.replace("Subject:", "").trim())
                        .append("</h1>");
                continue;
            }

            // Header/Banner
            if (line.startsWith("Header/Banner Text:")) {
                html.append("<h2 style=\"color:#555;\">")
                        .append(line.replace("Header/Banner Text:", "").trim())
                        .append("</h2>");
                continue;
            }

            // CTA Button
            if (line.startsWith("[CTA Button Text:")) {
                String buttonText = line.replaceAll("\\[CTA Button Text:(.*?)\\]", "$1").trim();
                // Example: you can replace link dynamically
                html.append("<a href=\"https://yourbank.com/offer\" ")
                        .append("style=\"display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:5px;\">")
                        .append(buttonText)
                        .append("</a><br/>");
                continue;
            }

            // Signature block
            if (line.startsWith("Signature Block:")) {
                html.append("<p style=\"margin-top:20px;font-style:italic;\">")
                        .append(line.replace("Signature Block:", "").trim())
                        .append("</p>");
                continue;
            }

            // Bold Markdown
            line = line.replaceAll("\\*\\*(.*?)\\*\\*", "<b>$1</b>");
            // Italic Markdown
            line = line.replaceAll("\\*(.*?)\\*", "<i>$1</i>");
            // Inline visuals instructions can be highlighted
            line = line.replaceAll("\\(Visual.*?\\)", "<span style=\"color:#888; font-size:0.9em;\">$0</span>");

            html.append("<p>").append(line).append("</p>");
        }

        return html.toString();
    }

    //    public String generateEmail(String cgid,String requirement,String overrideCustomerType) {
//        Customer customer = customerRepository.findByCgid(cgid)
//                .orElseThrow(() -> new RuntimeException("Customer not found"));
//
//        String prompt = """
//            You are an AI assistant specialized in personalized marketing.
//            Generate a professional marketing email for the following customer:
//
//            Customer Details:
//            - Full Name: %s
//            - Gender: %s
//            - Customer Type: %s
//            - Location: %s, %s, %s, %s
//
//            Marketing Requirement:
//            %s
//
//            Bank Details:
//            - Bank Name: %s
//
//            Guidelines:
//            - Use customer name in greeting.
//            - Tailor tone according to customer type: %s.
//            - Keep tone professional, engaging, and concise.
//            - Do not reveal PII like email/phone directly.
//            """.formatted(
//                customer.getFullName(),
//                customer.getGender(),
//                customer.getCustomerType(),
//                customer.getCity(),
//                customer.getState(),
//                customer.getCountry(),
//                customer.getPincode(),
//                requirement,
//                bankName,
//                customer.getCustomerType()
//        );
public String generateEmail(String cgid, String requirement, String overrideCustomerType) {
    Customer customer = customerRepository.findByCgid(cgid)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

    // use UI override if provided, otherwise DB value
    String effectiveCustomerType = (overrideCustomerType != null && !overrideCustomerType.isBlank())
            ? overrideCustomerType
            : customer.getCustomerType();

    String bankName = "NAB";
    String prompt = """
    You are an AI assistant specialized in personalized marketing. 
    Generate a professional, ready-to-send marketing email for the following customer:

    Customer Details:
    - Full Name: %s
    - Gender: %s
    - Customer Type: %s
    - Location: %s, %s, %s, %s
    - Age Group: %s
    - Income Bracket: %s
    - Profession: %s
    - Spending Patterns: %s
    - Loan History: %s
    - Investment Preferences: %s
    - Digital Engagement Level: %s
    - Preferred Communication Channel: %s

    Marketing & Email Preferences (key-value format):
    %s  # contentRequirement from frontend

    Guidelines:
    - In the response only give the email in the format Subject : then body.
    - Do not include AI response in message like ok here is it and all anywhere in the response
    - Use the customer name in greeting according to 'Personalized Greeting'.
    - Tailor tone according to customer type (%s).
    - Keep tone professional, engaging, and concise.
    - Include subject line, header/banner, body text, CTA button, and signature according to the provided keys.
    - Mention the offer details naturally in the email.
    - Include instructions for visuals if specified.
    - Do not reveal PII like email/phone directly.
    - Generate a complete email ready to send.
    """.formatted(
            customer.getFullName(),
            customer.getGender(),
            effectiveCustomerType,
            customer.getCity(),
            customer.getState(),
            customer.getCountry(),
            customer.getPincode(),
            customer.getAgeGroup(),
            customer.getIncomeBracket(),
            customer.getProfession(),
            customer.getSpendingPatterns(),
            customer.getLoanHistory(),
            customer.getInvestmentPreferences(),
            customer.getDigitalEngagementLevel(),
            customer.getPreferredChannel(),
            requirement,
            effectiveCustomerType
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

        Map<String, Object> candidate = ((List<Map<String, Object>>) response.get("candidates")).get(0);
        Map<String, Object> content = (Map<String, Object>) candidate.get("content");
        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");

        String rawText = (String) parts.get(0).get("text");

        // Optional: clean up the text for HTML display
        // 1. Replace Markdown headers with HTML
        String formattedText = rawText;

        return formattedText;
    }
        return "No response from Gemini.";
    }
}
