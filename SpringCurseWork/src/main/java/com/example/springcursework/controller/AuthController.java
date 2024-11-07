package com.example.springcursework.controller;

import com.example.springcursework.model.RoleForUser;
import com.example.springcursework.model.User;
import com.example.springcursework.payload.request.LoginRequest;
import com.example.springcursework.payload.response.UserInfoResponse;
import com.example.springcursework.servise.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signin")
    @ResponseStatus(value = HttpStatus.OK)
    public UserInfoResponse authenticateUser(@RequestBody LoginRequest loginRequest) {
        User user = this.userService.findByLogin(loginRequest.getUsername());
        if((user != null) && (user.getPassword().equals(loginRequest.getPassword()))) {
            return this.userService.getUserInfoResponse(user);
        }
        else {
            return null;
        }
    }
}
