package com.example.fsd.models;

import com.example.fsd.enums.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "incidents")
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private IncidentType type;

    private Double latitude;
    private Double longitude;

    private String mediaUrl;

    @Enumerated(EnumType.STRING)
    private IncidentStatus status = IncidentStatus.REPORTED;

    @ManyToOne
    @JoinColumn(name = "reported_by_id")
    private User reportedBy;

    private LocalDateTime reportedAt = LocalDateTime.now();

    // Getters and Setters
}