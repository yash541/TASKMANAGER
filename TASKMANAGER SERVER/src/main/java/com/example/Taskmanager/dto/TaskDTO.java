package com.example.Taskmanager.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Setter
@Getter
public class TaskDTO {

    private Long id;
    private Long userId;
    private String title;
    private String description;
    private Date startDate;
    private Date dueDate;
    private String category;
    private String status;
    private String priority;
    private LocalDate completedAt;
// Constructors, getters, setters
}
