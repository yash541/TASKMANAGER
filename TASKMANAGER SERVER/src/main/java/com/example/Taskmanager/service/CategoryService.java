package com.example.Taskmanager.service;

import com.example.Taskmanager.repository.CategoryNamesRepository;
import com.example.Taskmanager.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryNamesRepository categoryRepository;

    @Autowired
    private UsersRepository userRepository;

//    public void createCategory(Long userId, Category category) {
//        Optional<UsersEntity> userOptional = userRepository.findById(userId);
//        if (userOptional.isPresent()) {
//            UsersEntity user = userOptional.get();
//            category.setUser(user);
//            categoryRepository.save(category);
//        } else {
//            // Handle case where user with given ID is not found
//        }
//    }
}

