// src/main/java/com/yourapp/repository/ApprovalRequestRepository.java
package com.yourapp.repository;

import com.yourapp.model.ApprovalRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalRequestRepository extends JpaRepository<ApprovalRequest, Long> {
}
