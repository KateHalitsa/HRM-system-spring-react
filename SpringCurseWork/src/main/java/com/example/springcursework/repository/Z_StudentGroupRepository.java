package com.example.springcursework.repository;

import com.example.springcursework.model.Z_StudentGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Z_StudentGroupRepository extends JpaRepository<Z_StudentGroup, Integer> {

    List<Z_StudentGroup> findByStudentId(int studentId);

    /*
    @Query(value = "select * from student where user_id = ?1", nativeQuery = true)
    List<Z_Student> findRelatedStudents(int userId);
    * */
}
