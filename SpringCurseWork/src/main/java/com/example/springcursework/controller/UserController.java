package com.example.springcursework.controller;

import com.example.springcursework.model.RoleForUser;
import com.example.springcursework.model.Z_Student;
import com.example.springcursework.model.Z_Teacher;
import com.example.springcursework.model.User;
import com.example.springcursework.payload.response.UserInfoResponse;
import com.example.springcursework.servise.Z_StudentService;
import com.example.springcursework.servise.Z_TeacherService;
import com.example.springcursework.servise.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private Z_StudentService studentService;
    @Autowired
    private Z_TeacherService teacherService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public User registerUser(@RequestBody User userVO) {
        return this.userService.insert(userVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<User> findAllUsers() {
        return this.userService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public User findById(@PathVariable int id) {
        return this.userService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public User updateUser(@PathVariable int id, @RequestBody User userVO) {
        return this.userService.updateUser(id, userVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable int id) {
        this.userService.delete(id);
    }

    @GetMapping(value = "/roles/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<RoleForUser> RolesByUserId(@PathVariable int id) {
       return userService.RolesByUserId(id);
    }

    @PutMapping(value = "/roles/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<RoleForUser> UpdateRolesByUserId(@PathVariable int id, @RequestBody List<RoleForUser> rolesVO) {
        return userService.updateRolesByUserId(id, rolesVO);
    }
}
