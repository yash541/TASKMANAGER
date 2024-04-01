package com.example.Taskmanager.controller;

import com.example.Taskmanager.dto.TaskStatisticsDTO;
import com.example.Taskmanager.entity.TasksEntity;
import com.example.Taskmanager.entity.UsersEntity;
import com.example.Taskmanager.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.naming.directory.SearchResult;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://localhost:3001/")
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
    @GetMapping("/search")
    public List<TasksEntity> search(@AuthenticationPrincipal UsersEntity user,@RequestParam String query) {

        List<TasksEntity> results = taskService.search(user,query);

        return results;
    }

}

