package com.example.Taskmanager.repository;

import com.example.Taskmanager.entity.StatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<StatusEntity,Long> {

    StatusEntity findByName(String completed);
}
