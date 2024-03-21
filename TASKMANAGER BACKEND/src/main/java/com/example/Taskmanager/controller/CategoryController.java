package com.example.Taskmanager.controller;

import com.example.Taskmanager.dto.CategoryNamesDTO;
import com.example.Taskmanager.entity.CategoryNamesEntity;
import com.example.Taskmanager.entity.UsersEntity;
import com.example.Taskmanager.repository.CategoryNamesRepository;
import com.example.Taskmanager.repository.CategoryUsersRepository;
import com.example.Taskmanager.repository.TasksRepository;
import com.example.Taskmanager.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {


    private CategoryNamesRepository categoryNamesRepository;

    private CategoryUsersRepository categoryUsersRepository;

    private TasksRepository tasksRepository;

    private UsersRepository usersRepository;

    @Autowired
    public CategoryController(CategoryNamesRepository categoryNamesRepository, CategoryUsersRepository categoryUsersRepository, TasksRepository tasksRepository, UsersRepository usersRepository){
        this.categoryUsersRepository=categoryUsersRepository;
        this.categoryNamesRepository=categoryNamesRepository;
        this.tasksRepository=tasksRepository;
        this.usersRepository = usersRepository;
    }

    @PostMapping("/")
    public ResponseEntity<CategoryNamesEntity> createCategory(@RequestBody CategoryNamesDTO category,@AuthenticationPrincipal UsersEntity user) {

        try {
            // Validate input
            String title = category.getName();
            if (title == null || title.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            // Validate title
            if ("ALL".equalsIgnoreCase(title)) {
                return ResponseEntity.badRequest().build();
            }
            Optional<CategoryNamesEntity> existingCategory = categoryNamesRepository.findByName(title);
            CategoryNamesEntity Category;
            if (existingCategory.isPresent()) {
                UsersEntity associateduser=existingCategory.get().getUser();
                if(associateduser.equals(user)){
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                }
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            } else {
                // Create a new category if it doesn't exist
                Category = new CategoryNamesEntity();
                Category.setName(title);
                Category.setUser(user);
                // Save the new category
                Category = categoryNamesRepository.save(Category);
            }



            return ResponseEntity.status(HttpStatus.CREATED).body(Category);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryAndTasks(@PathVariable Long id) {
        categoryNamesRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete Success!");
    }
    @GetMapping("/")
    public List<CategoryNamesEntity> getUserCategories(@AuthenticationPrincipal UsersEntity user) {
        List<CategoryNamesEntity> Categories = categoryNamesRepository.findByUser(user);
        return Categories;
    }

    @PutMapping("/{categoryName}")
    public ResponseEntity<String> editCategoryName(@PathVariable String categoryName,
            @RequestParam String newTitle) {

        Optional<CategoryNamesEntity> category=categoryNamesRepository.findByName(categoryName);
        CategoryNamesEntity retrievedCategory=category.get();
        retrievedCategory.setName(newTitle);
        categoryNamesRepository.save(retrievedCategory);
        return ResponseEntity.ok("Category name updated successfully");
    }

}
