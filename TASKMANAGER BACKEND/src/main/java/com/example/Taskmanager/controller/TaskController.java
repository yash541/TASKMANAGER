package com.example.Taskmanager.controller;

import com.example.Taskmanager.dto.TaskDTO;
import com.example.Taskmanager.entity.TasksEntity;
import com.example.Taskmanager.entity.UsersEntity;
import com.example.Taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3001/")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/")
    public ResponseEntity<List<TasksEntity>> getAllTasks(@AuthenticationPrincipal UsersEntity user,
                                         @RequestParam(required = false) String priority,
                                         @RequestParam(required = false) String status,
                                         @RequestParam(required = false) String category,
                                         @RequestParam(required = false) Date fromdate,
                                         @RequestParam(required = false) Date todate,
                                         @RequestParam(required = false) String sort,
                                         @RequestParam(required = false) Long pagenum) {

        //        Long userId, Long categoryId, Date fromDate, Date toDate, String status, String priority
        List<TasksEntity> retrivedtasks=taskService.getAllTasks(user,priority,status,category,fromdate,todate,sort,pagenum);
        return ResponseEntity.ok(retrivedtasks);
    }
    @CrossOrigin(origins = "http://localhost:3001/")
    @PostMapping("/")
    public ResponseEntity<TasksEntity> createTask(@AuthenticationPrincipal UsersEntity user,
            @RequestBody TaskDTO taskDTO) {
        TasksEntity savedTask = taskService.createTask(taskDTO,user);
        return ResponseEntity.ok(savedTask);
    }
    @GetMapping("/{taskid}")
    public ResponseEntity<TaskDTO> getTaskDescription(@PathVariable Long taskid) {
        // Call the service to fetch the task description
        String description = taskService.getTaskDescription(taskid);

        // Create a TaskDto object to hold the taskId and description
        TaskDTO taskDto = new TaskDTO();
        taskDto.setDescription(description);

        // Return the TaskDto in the response
        return ResponseEntity.ok(taskDto);
    }
    @PutMapping("/{taskid}")
    public ResponseEntity<TasksEntity> completeTask(@PathVariable Long taskid) {
        TasksEntity completedTaskDto = taskService.completeTask(taskid);

        // Return the completed task DTO in the response
        return ResponseEntity.ok(completedTaskDto);
    }

    @PostMapping("/{taskid}")
    public ResponseEntity<TasksEntity> updateTask(@PathVariable Long taskid,@RequestBody TaskDTO taskFields) {
        TasksEntity updatedTask = taskService.updateTask(taskid, taskFields);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        if (taskService.deleteTask(taskId)) {
            return ResponseEntity.status(HttpStatus.OK).body("Delete Success!");
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}

