package com.example.springcursework.repository;

import com.example.springcursework.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    @Query(value = "select r.* from roles r, user_role ur where r.id = ur.role_id and ur.user_id = ?1", nativeQuery = true)
    List<Role> findByUserId(int userId);

}


