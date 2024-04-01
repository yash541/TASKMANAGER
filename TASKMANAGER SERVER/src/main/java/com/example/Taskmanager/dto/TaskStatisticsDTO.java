package com.example.Taskmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskStatisticsDTO {
    private int totalTasks;
    private int completed;
    private int completedPostDeadline;
    private int incompleted;
    private int current;
    private int overdue;
    private int upcoming;

    // Constructor, getters, and setters
}

