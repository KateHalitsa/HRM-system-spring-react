package com.example.springcursework.repository;

import com.example.springcursework.model.Z_Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Z_TeacherRepository extends JpaRepository<Z_Teacher, Integer> {
    Optional<Z_Teacher> findByUserId(int userId);

    /*
    @Query(value = "select * from teacher where user_id = ?1", nativeQuery = true)
    List<Z_Teacher> findRelatedTeachers(int userId);     */
}
