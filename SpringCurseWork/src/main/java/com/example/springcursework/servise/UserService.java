package com.example.springcursework.servise;

import com.example.springcursework.model.Role;
import com.example.springcursework.model.RoleForUser;
import com.example.springcursework.model.User;
import com.example.springcursework.payload.response.UserInfoResponse;

import java.util.List;

public interface UserService {
    User insert(User userVO);

    List<User> findAll();

    void delete(int id);

    User findById(int id);
    User findByLogin(String username);

    UserInfoResponse getUserInfoResponse(User user);

    User updateUser(int id, User userVO);

    List<Role> findRelatedRoles(int userId);

    List<RoleForUser> RolesByUserId(int id);
    List<RoleForUser> updateRolesByUserId(int userId, List<RoleForUser> roles);
}
