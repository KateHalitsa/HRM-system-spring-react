package com.example.springcursework.repository;

import com.example.springcursework.model.Z_GroupScheduleView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Z_GroupScheduleViewRepository extends JpaRepository<Z_GroupScheduleView, Integer> {

    List<Z_GroupScheduleView> findByTeacherId(int teacherId);

    /*
    @Query(value = "select * from student where user_id = ?1", nativeQuery = true)
    List<Z_Student> findRelatedStudents(int userId);
    * */
}
