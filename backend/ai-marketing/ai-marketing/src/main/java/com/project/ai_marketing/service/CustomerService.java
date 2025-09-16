package com.project.ai_marketing.service;

import com.project.ai_marketing.dto.CustomerDTO;
import com.project.ai_marketing.entity.Customer;
import com.project.ai_marketing.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

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
}
