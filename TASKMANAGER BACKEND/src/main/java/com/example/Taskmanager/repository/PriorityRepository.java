package com.example.Taskmanager.repository;

import com.example.Taskmanager.entity.PriorityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  PriorityRepository extends JpaRepository<PriorityEntity, Long>{

    PriorityEntity findByName(String priority);
}
