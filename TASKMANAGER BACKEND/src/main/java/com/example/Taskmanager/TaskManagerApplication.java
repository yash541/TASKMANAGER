package com.example.Taskmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.Taskmanager.repository", "com.example.Taskmanager.service", "com.example.Taskmanager.controller", "com.example.Taskmanager.entity","com.example.Taskmanager.security"})
public class TaskManagerApplication {

	public static void main(String[] args) {

		SpringApplication.run(TaskManagerApplication.class, args);
	}
//	@GetMapping("/login")
//	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
//		return String.format("Hello %s!", name);
//
//	}
}
