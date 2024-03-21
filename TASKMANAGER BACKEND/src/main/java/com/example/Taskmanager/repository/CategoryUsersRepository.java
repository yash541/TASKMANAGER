package com.example.Taskmanager.repository;

import com.example.Taskmanager.entity.CategoryUsersEntity;
import com.example.Taskmanager.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryUsersRepository extends JpaRepository<CategoryUsersEntity, Long> {

    boolean existsByUserIdAndCategoryId(Long userId,Long categoryId);

    void deleteByUserIdAndCategoryId(Long userId, Long categoryId);

    List<CategoryUsersEntity> findByUserId(UsersEntity userId);
}
