package com.example.Taskmanager.controller;

import com.example.Taskmanager.dto.TaskStatisticsDTO;
import com.example.Taskmanager.entity.UsersEntity;
import com.example.Taskmanager.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    private final TaskService taskService;

    public HomeController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Endpoint to retrieve task statistics
    @GetMapping("/statistics")
    public ResponseEntity<TaskStatisticsDTO> getTaskStatistics(@AuthenticationPrincipal UsersEntity user) {
        TaskStatisticsDTO taskStatistics = taskService.getTaskStatistics(user);
        return ResponseEntity.ok(taskStatistics);
    }

    // Endpoint to retrieve a list of tasks
//    @GetMapping("/tasks")
//    public ResponseEntity<List<TasksEntity>> getTasks() {
//        List<TasksEntity> tasks = taskService.getAllTasks();
//        return ResponseEntity.ok(tasks);
//    }

}

