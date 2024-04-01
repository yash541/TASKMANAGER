package com.example.Taskmanager.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "tasks")
public class TasksEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userid")
    private UsersEntity user;

    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "startdate")
    private Date startDate;
    @Column(name = "duedate")
    private Date dueDate;
    @Column(name = "completedat")
    private Date completedAt;
    @Column(name = "updatedat")
    private Date updatedat;
    @ManyToOne
    @JoinColumn(name = "categoryid")
    private CategoryNamesEntity category;

    @ManyToOne
    @JoinColumn(name = "statusid")
    private StatusEntity status;

    @ManyToOne
    @JoinColumn(name = "priorityid")
    private PriorityEntity priority;

    // Getters and setters
}
