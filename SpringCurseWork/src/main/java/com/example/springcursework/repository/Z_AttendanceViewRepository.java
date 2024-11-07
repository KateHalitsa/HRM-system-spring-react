package com.example.springcursework.repository;

import com.example.springcursework.model.Z_AttendanceView;
import com.example.springcursework.model.Z_AttendanceViewKey;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface Z_AttendanceViewRepository extends CrudRepository<Z_AttendanceView, Z_AttendanceViewKey> {

    List<Z_AttendanceView> findByGroupScheduleId(int groupScheduleId);

    /*
    @Query(value = "select * from student where user_id = ?1", nativeQuery = true)
    List<Z_Student> findRelatedStudents(int userId);
    * */
}
