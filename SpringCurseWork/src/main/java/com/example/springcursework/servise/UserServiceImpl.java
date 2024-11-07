package com.example.springcursework.servise;

import com.example.springcursework.model.Role;
import com.example.springcursework.model.RoleForUser;
import com.example.springcursework.model.User;
import com.example.springcursework.model.UserRole;
import com.example.springcursework.payload.response.UserInfoResponse;
import com.example.springcursework.repository.RoleRepository;
import com.example.springcursework.repository.RoleForUserRepository;
import com.example.springcursework.repository.UserRepository;
import com.example.springcursework.repository.UserRoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleForUserRepository roleForUserRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public User insert(User userVO) {
        return this.userRepository.save(userVO);
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.userRepository.deleteById(id);
    }

    @Override
    public User findById(int id) {
        return this.userRepository.findById(id).get();
    }
    @Override
    public User findByLogin(String username) {
        Optional<User> optionalUser = this.userRepository.findByLogin(username);
        if (optionalUser.isEmpty()) {
            return null;
        }else
        {
            return optionalUser.get();
        }
    }

    @Override
    public List<Role> findRelatedRoles(int userId){
       return  roleRepository.findByUserId(userId);
    }

    @Override
    public UserInfoResponse getUserInfoResponse(User user){
        List<Role> roles = findRelatedRoles(user.getId());
        return new UserInfoResponse(
                user.getId(),
                user.getLogin(),
                user.getEmail(),
                BuildRolesForUser(roles));
    }

    private List<String> BuildRolesForUser(List<Role> roles){
        List<String> result = new ArrayList<>();
        for (Role role: roles) {
            result.add(role.getName());
        }
        return result;
    }

    @Override
    public User updateUser(int id, User userVO) {
        userVO.setId(id);
        return this.userRepository.save(userVO);
    }

    @Override
    public List<RoleForUser> RolesByUserId(int id){
        return  roleForUserRepository.findRoleForUserId(id);
    }
    @Override
    public List<RoleForUser> updateRolesByUserId(int userId, List<RoleForUser> roles) {
        for (int i = 0; i < roles.size(); i++) {
            RoleForUser role = roles.get(i);
            boolean isEmptyUserRoleId = (role.getUserRoleId() == null) || (role.getUserRoleId() <= 0);
            if (role.getIsSelected()){
                if (isEmptyUserRoleId){
                    UserRole newUserRole = new UserRole();
                    newUserRole.setUserId(userId);
                    newUserRole.setRoleId(role.getRoleId());
                    userRoleRepository.save(newUserRole);
                }
            } else {
              if (!isEmptyUserRoleId){
                  userRoleRepository.deleteById(role.getUserRoleId());
              }
            }
        }
        return RolesByUserId(userId);
    }
}
