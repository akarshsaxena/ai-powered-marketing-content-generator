package com.project.ai_marketing.service;

import com.project.ai_marketing.dto.AllEmailResponse;
import com.project.ai_marketing.dto.CustomerDTO;
import com.project.ai_marketing.entity.Customer;
import com.project.ai_marketing.entity.MarketingRequests;
import com.project.ai_marketing.repository.CustomerRepository;
import com.project.ai_marketing.repository.MarketingRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final MarketingRequestRepository marketingRequestRepository;

    public Optional<CustomerDTO> getCustomerByCgid(String cgid) {
        return customerRepository.findByCgid(cgid)
                .map(this::toDTO);
    }

    private CustomerDTO toDTO(Customer customer) {
        // Mask email
        String email = customer.getEmail();
        int atIndex = email.indexOf("@");
        String maskedEmail = (atIndex > 1) ?
                email.charAt(0) + "*****" + email.substring(atIndex) : email;

        // Mask phone
        String phone = customer.getPhone();
        String maskedPhone = (phone.length() > 2) ?
                "******" + phone.substring(phone.length() - 2) : phone;

        return CustomerDTO.builder()
                .cgid(customer.getCgid())
                .fullName(customer.getFullName())
                .email(maskedEmail)
                .gender(customer.getGender())
                .phone(maskedPhone)
                .customerType(customer.getCustomerType())
                .city(customer.getCity())
                .state(customer.getState())
                .country(customer.getCountry())
                .pincode(customer.getPincode())
                .build();
    }

    public MarketingRequests saveStatus(Long id,String customerId,String customerType, String email, String status) {
        MarketingRequests entry = MarketingRequests.builder()
                .customerId(customerId)
                .customerType(customerType)
                .email(email)
                .status(status)
                .build();

        if (id != null) {
            entry.setId(id);
        }

        return marketingRequestRepository.save(entry);

    }

    public List<AllEmailResponse> getAllEmails() {
        return marketingRequestRepository.findAll()
                .stream()
                .map(req -> new AllEmailResponse(
                        req.getId(),
                        req.getCustomerId(),
                        req.getCustomerType(),
                        req.getEmail(),
                        req.getStatus()
                ))
                .collect(Collectors.toList());

    }


}
