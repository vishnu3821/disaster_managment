package com.example.fsd.models;

import com.example.fsd.enums.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resources")
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private ResourceType category;

    private Integer quantity;

    private String location;

    @Enumerated(EnumType.STRING)
    private ResourceStatus status = ResourceStatus.AVAILABLE;

    @ManyToOne
    @JoinColumn(name = "added_by_id")
    private User addedBy;

    private LocalDateTime lastUpdated = LocalDateTime.now();

    // Getters and Setters
}