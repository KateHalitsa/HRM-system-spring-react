package com.example.springcursework.repository;

import com.example.springcursework.model.Z_GroupScheduleStudentView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Z_GroupScheduleStudentViewRepository extends JpaRepository<Z_GroupScheduleStudentView, Integer> {

    List<Z_GroupScheduleStudentView> findByStudentId(int studentId);

    /*
    @Query(value = "select * from student where user_id = ?1", nativeQuery = true)
    List<Z_Student> findRelatedStudents(int userId);
    * */
}
