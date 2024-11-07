package com.example.springcursework.repository;

import com.example.springcursework.model.Z_Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Z_StudentRepository extends JpaRepository<Z_Student, Integer> {
    Optional<Z_Student> findByUserId(int userId);

    /*
    @Query(value = "select * from student where user_id = ?1", nativeQuery = true)
    List<Z_Student> findRelatedStudents(int userId);
    * */
}
