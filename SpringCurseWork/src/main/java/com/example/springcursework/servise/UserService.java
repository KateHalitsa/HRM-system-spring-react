package com.example.springcursework.servise;

import com.example.springcursework.model.Role;
import com.example.springcursework.model.RoleForUser;
import com.example.springcursework.model.User;
import com.example.springcursework.payload.response.UserInfoResponse;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface UserService {
    public User insert(User userVO);

    public List<User> findAll();

    public void delete(int id);

    public User findById(int id);
    public User findByLogin(String username);

    public UserInfoResponse getUserInfoResponse(User user);

    public User updateUser(int id, User userVO);

    public List<Role> findRelatedRoles(int userId);

    public List<RoleForUser> RolesByUserId(int id);
    public List<RoleForUser> updateRolesByUserId(int userId, List<RoleForUser> roles);
}
