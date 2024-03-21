package com.example.Taskmanager.repository;
import com.example.Taskmanager.entity.CategoryNamesEntity;
import com.example.Taskmanager.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryNamesRepository extends JpaRepository<CategoryNamesEntity, Long> {
    boolean existsByNameAndId(String name, Long id);
    Optional<CategoryNamesEntity> findByName(String name);

    CategoryNamesEntity deleteByName(String categoryName);

    List<CategoryNamesEntity> findByUser(UsersEntity user);
    // You can define custom query methods here if needed
}