package com.example.Taskmanager.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

//    @Autowired
//    private UserService userService;
//
//    @PostMapping()
////    public ResponseEntity<UsersEntity> createUser(@RequestBody UserDTO createUserRequest) {
////        String username = createUserRequest.getUsername();
////        String password = createUserRequest.getPassword();
////        String email = createUserRequest.getEmail();
////        String roles = createUserRequest.getRoles();
////
////        // Call the createUser method in the UserService to create the user
//////        UsersEntity userEntity =userService.createUser(username, password, email, roles);
////        return new ResponseEntity<>(new UsersEntity()Entity,HttpStatus.OK);
////    }
//
//    @DeleteMapping("/{username}")
////    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
////        if (userService.DeleteUser(username)) {
////            return new ResponseEntity<>(HttpStatus.OK);
////        } else {
////            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
////        }
////    }
}
