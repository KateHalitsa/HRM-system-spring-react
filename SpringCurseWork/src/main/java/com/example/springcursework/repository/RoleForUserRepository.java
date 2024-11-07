package com.example.springcursework.repository;

import com.example.springcursework.model.RoleForUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoleForUserRepository extends JpaRepository<RoleForUser, Integer> {
    @Query(value = """
            select r.id role_id, r.name role_name, not ISNULL(ur.user_id) is_selected, ur.id user_role_id 
            from roles r LEFT OUTER join user_role ur on (r.id = ur.role_id and ur.user_id = ?1)
            """,
            nativeQuery = true)
    List<RoleForUser> findRoleForUserId(int userId);

}
