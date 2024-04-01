package com.example.Taskmanager.service;

import com.example.Taskmanager.Utils.TasksQuery;
import com.example.Taskmanager.dto.TaskDTO;
import com.example.Taskmanager.dto.TaskStatisticsDTO;
import com.example.Taskmanager.entity.*;
import com.example.Taskmanager.repository.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.naming.directory.SearchResult;
import java.util.*;
import java.util.regex.Pattern;

@Service
public class TaskService {

    private final TasksRepository taskRepository;

    private final UsersRepository userRepository;

    private final CategoryNamesRepository categoryNamesRepository;

    private final StatusRepository statusRepository;

    private final PriorityRepository priorityRepository;


    @Autowired
    public TaskService(TasksRepository taskRepository, UsersRepository userRepository, CategoryNamesRepository categoryNamesRepository, StatusRepository statusRepository, PriorityRepository priorityRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.categoryNamesRepository=categoryNamesRepository;
        this.statusRepository = statusRepository;
        this.priorityRepository = priorityRepository;
    }

    public TaskStatisticsDTO getTaskStatistics(UsersEntity user) {
        List<TasksEntity> tasks = taskRepository.findByUser(user);
        TaskStatisticsDTO taskStats = new TaskStatisticsDTO();
        taskStats.setTotalTasks(tasks.size());

        int completedTasks = 0;
        int completedPostDeadline = 0;
        int incompletedTasks = 0;
        int currentTasks = 0;
        int overdueTasks = 0;
        int upcomingTasks = 0;

        for (TasksEntity task : tasks) {
            if (task.getStatus().getName().equals("COMPLETED")) {
                completedTasks++;
                if (task.getCompletedAt().after(task.getDueDate())) {
                    completedPostDeadline++;
                }
            } else {
                incompletedTasks++;
                if (task.getStatus().getName().equals("IN_PROGRESS")) {
                    currentTasks++;
                }
                if (task.getStatus().getName().equals("PENDING") || task.getStatus().getName().equals("IN_PROGRESS")) {
                    if (task.getDueDate().before(new Date())) {
                        overdueTasks++;
                    }
                }
                if (task.getStartDate().after(new Date())) {
                    upcomingTasks++;
                }
            }
        }

        taskStats.setCompleted(completedTasks);
        taskStats.setCompletedPostDeadline(completedPostDeadline);
        taskStats.setIncompleted(incompletedTasks);
        taskStats.setCurrent(currentTasks);
        taskStats.setOverdue(overdueTasks);
        taskStats.setUpcoming(upcomingTasks);

        return taskStats;
    }

    public List<TasksEntity> getAllTasks(UsersEntity user,
                                         String priority,
                                         String status,
                                         String category,
                                         Date fromdate,
                                         Date todate,
                                         String sort,
                                         Long pageNum) {
//        Long userId, Long categoryId, Date fromDate, Date toDate, String status, String priority
        PriorityEntity Specificpriority=priorityRepository.findByName(priority);
        StatusEntity specificstatus=statusRepository.findByName(status);
        if(category.equals("ALL")){
            Specification<TasksEntity> filterSpecification= TasksQuery.buildSpecification(user,
                    Specificpriority,
                    specificstatus,
                    null,
                    fromdate,
                    todate,
                    sort,
                    pageNum);
            List<TasksEntity> tasks = taskRepository.findAll(filterSpecification);
            tasks=TasksQuery.sortTasks(tasks, String.valueOf(sort));
            tasks=TasksQuery.paginateTasks(tasks,pageNum,9);
            return tasks;
        }
       CategoryNamesEntity specificcategory = categoryNamesRepository.findByNameAndUser(category,user);
        Specification<TasksEntity> filterSpecification= TasksQuery.buildSpecification(user,
                                                                                        Specificpriority,
                                                                                        specificstatus,
                                                                                        specificcategory,
                                                                                        fromdate,
                                                                                        todate,
                                                                                        sort,
                                                                                        pageNum);
        List<TasksEntity> tasks = taskRepository.findAll(filterSpecification);
        tasks=TasksQuery.sortTasks(tasks, String.valueOf(sort));
        tasks=TasksQuery.paginateTasks(tasks,pageNum,9);
        return tasks;
    }

//    public List<TasksEntity> getAllTasks(UsersEntity user) {
//        return taskRepository.findByUser(user);
//    }

    public TasksEntity createTask(TaskDTO taskDTO,UsersEntity user) {
        // Create a TaskEntity object from the TaskDTO
        String categoryname=taskDTO.getCategory();
        CategoryNamesEntity category=categoryNamesRepository.findByNameAndUser(categoryname,user);
        TasksEntity taskEntity = new TasksEntity();
        taskEntity.setUser(user);
        taskEntity.setCategory(category);

        // Set other properties from taskDTO
        taskEntity.setTitle(taskDTO.getTitle());
        taskEntity.setDescription(taskDTO.getDescription());
        taskEntity.setStartDate(taskDTO.getStartDate());
        taskEntity.setDueDate(taskDTO.getDueDate());
        StatusEntity status=statusRepository.findByName(taskDTO.getStatus());
        taskEntity.setStatus(status);
        PriorityEntity priority=priorityRepository.findByName(taskDTO.getPriority());
        taskEntity.setPriority(priority);
        // Save the taskEntity in the repository
        TasksEntity savedTaskEntity = taskRepository.save(taskEntity);

        // Convert the saved taskEntity back to TaskDTO and return
        return savedTaskEntity;
    }

//    public TaskDTO convertToTaskDTO(TasksEntity taskEntity) {
//        TaskDTO taskDTO = new TaskDTO();
//        taskDTO.setId(taskEntity.getId());
////        taskDTO.setUserId(taskEntity.getUser());
//        taskDTO.setTitle(taskEntity.getTitle());
//        taskDTO.setDescription(taskEntity.getDescription());
//        taskDTO.setStartDate(taskEntity.getStartDate());
//        taskDTO.setDueDate(taskEntity.getDueDate());
//        taskDTO.setCategory(taskEntity.getCategory().getId());
//        taskDTO.setStatusId(taskEntity.getStatus().getId());
//        taskDTO.setPriorityId(taskEntity.getPriority().getId());
//        return taskDTO;
//    }
    public TasksEntity updateTask(Long taskId, TaskDTO task) {
        Optional<TasksEntity> existingTaskOptional = taskRepository.findById(taskId);
        if (existingTaskOptional.isPresent()) {
            TasksEntity existingTask = existingTaskOptional.get();

            // Update only the fields that are present in the request body
            BeanUtils.copyProperties(task, existingTask, "id");
            existingTask.setUpdatedat(new Date());
            TasksEntity savedTask = taskRepository.save(existingTask);
            // Set other fields as needed
            return taskRepository.save(existingTask);
        } else {
            // Handle task not found error
            throw new RuntimeException("Task not found with id: " + taskId);
        }
    }

    public Boolean deleteTask(Long taskId) {
        Optional<TasksEntity> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isPresent()) {
            taskRepository.delete(taskOptional.get());
            return Boolean.TRUE;
        } else {
            return Boolean.FALSE;
        }
    }

    public String getTaskDescription(Long taskId) {
        Optional<TasksEntity> task=taskRepository.findById(taskId);
        String description=task.get().getDescription();
        return description;
    }

    public TasksEntity completeTask(Long taskId) {
        Optional<TasksEntity> task = taskRepository.findById(taskId);
        TasksEntity retrivedTask=new TasksEntity();
        if(task.isPresent()){
            retrivedTask=task.get();
        }
        StatusEntity completeStatus=statusRepository.findByName("COMPLETED");
        retrivedTask.setStatus(completeStatus);
        retrivedTask.setCompletedAt(new Date());
        retrivedTask.setUpdatedat(new Date());
        TasksEntity updatedTask = taskRepository.save(retrivedTask);
        return updatedTask;
    }

    public List<TasksEntity> search(UsersEntity user, String query) {
        List<TasksEntity> tasks = taskRepository.findByUser(user);
        // Use regex pattern to match titles and categories
        List<TasksEntity> results = new ArrayList<>();
        Pattern pattern = Pattern.compile(query, Pattern.CASE_INSENSITIVE);

        for (TasksEntity task : tasks) {
            if (pattern.matcher(task.getTitle()).find() || pattern.matcher(task.getCategory().getName()).find()) {
                results.add(task);
            }
        }
        return results;
    }
}

