package com.project.ai_marketing.repository;

import com.project.ai_marketing.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByCgid(String cgid);
}
