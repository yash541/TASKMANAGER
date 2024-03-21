package com.example.Taskmanager.repository;

import com.example.Taskmanager.entity.TasksEntity;
import com.example.Taskmanager.entity.UsersEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasksRepository extends JpaRepository<TasksEntity, Long> {

    List<TasksEntity> findAllByUserId(Long userId);

    void deleteByUserIdAndCategoryId(Long userId, Long categoryId);


    List<TasksEntity> findByUserIdAndCategoryId(Long userId, Long categoryId);

    List<TasksEntity> findAll(Specification<TasksEntity> filterSpecification);

   TasksEntity findByIdAndUserId(Long taskId, Long userId);

    List<TasksEntity> findByUser(UsersEntity user);
}