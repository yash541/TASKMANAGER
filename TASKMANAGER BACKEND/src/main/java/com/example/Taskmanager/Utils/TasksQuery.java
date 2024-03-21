package com.example.Taskmanager.Utils;

import com.example.Taskmanager.entity.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

public class TasksQuery {
    public static Specification<TasksEntity> withUser(UsersEntity user) {
        return (Root<TasksEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> builder.equal(root.get("user"), user);
    }

    public static Specification<TasksEntity> withCategory(CategoryNamesEntity category) {
        return (Root<TasksEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> builder.equal(root.get("category"), category);
    }

    public static Specification<TasksEntity> withFromDate(Date fromDate) {
        return (Root<TasksEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> builder.greaterThanOrEqualTo(root.get("startdate"), fromDate);
    }

    public static Specification<TasksEntity> withToDate(Date toDate) {
        return (Root<TasksEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> builder.lessThanOrEqualTo(root.get("startdate"), toDate);
    }

    public static Specification<TasksEntity> withStatus(StatusEntity status) {
        return (Root<TasksEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> builder.equal(root.get("status"), status);
    }

    public static Specification<TasksEntity> withPriority(PriorityEntity priority) {
        return (Root<TasksEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> builder.equal(root.get("priority"), priority);
    }
//    user,
//    priority,
//    status,
//    category,
//    fromdate,
//    todate,
//    sort,
//    pageNum
    public static Specification<TasksEntity> buildSpecification(UsersEntity user, PriorityEntity priority,StatusEntity status, CategoryNamesEntity category, Date fromdate, Date todate,String sort,Long pagenum) {
        List<Specification<TasksEntity>> specifications = new ArrayList<>();
        if (user != null) {
            specifications.add(withUser(user));
        }
        if (category != null) {
            specifications.add(withCategory(category));
        }
        if (fromdate != null) {
            specifications.add(withFromDate(fromdate));
        }
        if (todate != null) {
            specifications.add(withToDate(todate));
        }
        if (status != null) {
            specifications.add(withStatus(status));
        }
        if (priority != null) {
            specifications.add(withPriority(priority));
        }

        return specifications.stream().reduce(Specification.where(null), Specification::and);
    }

    public static List<TasksEntity> sortTasks(List<TasksEntity> tasks, String sortParam) {
        if (sortParam != null && !sortParam.isEmpty()) {
            switch (sortParam.toLowerCase()) {
                case "startdate:asc":
                    tasks.sort(Comparator.comparing(TasksEntity::getStartDate));
                    break;
                case "startdate:desc":
                    tasks.sort(Comparator.comparing(TasksEntity::getStartDate).reversed());
                    break;
                case "duedate:asc":
                    tasks.sort(Comparator.comparing(TasksEntity::getDueDate));
                    break;
                case "duedate:desc":
                    tasks.sort(Comparator.comparing(TasksEntity::getDueDate).reversed());
                    break;
                default:
                    // Invalid sortParam, do nothing
                    break;
            }
        }
        return tasks;
    }
    public static List<TasksEntity> paginateTasks(List<TasksEntity> tasks, Long pageNumber, int limit) {
        int startIndex = (int) ((pageNumber - 1) * limit);
        int endIndex = Math.min(startIndex + limit, tasks.size());

        if (startIndex < endIndex) {
            return tasks.subList(startIndex, endIndex);
        } else {
            return List.of();
        }
    }
}
