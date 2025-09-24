package com.project.ai_marketing.repository;

import com.project.ai_marketing.entity.MarketingRequests;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketingRequestRepository extends JpaRepository<MarketingRequests, Long> {
}
