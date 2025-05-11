package com.example.fsd.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "incident_logs")
public class IncidentHistoryLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Incident incident;

    @ManyToOne
    private User updatedBy;

    private String updateNote;

    private LocalDateTime timestamp = LocalDateTime.now();

    // Getters and Setters
}