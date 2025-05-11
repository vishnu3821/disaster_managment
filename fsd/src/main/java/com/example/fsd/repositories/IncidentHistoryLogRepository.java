package com.example.fsd.repositories;

import com.example.fsd.models.IncidentHistoryLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentHistoryLogRepository extends JpaRepository<IncidentHistoryLog, Long> {
}