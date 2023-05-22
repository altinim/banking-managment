package com.bimi.bankingsystem.controller;


import com.bimi.bankingsystem.model.User;
import com.bimi.bankingsystem.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    private final EmployeeController employeeController;

    public EmployeeController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = null;
        user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
        boolean deleted = false;
        deleted = userService.deleteUser(id);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id,
                                           @RequestBody User user) {
        user = userService.updateUser(id,user);
        return ResponseEntity.ok(user);
    }

}