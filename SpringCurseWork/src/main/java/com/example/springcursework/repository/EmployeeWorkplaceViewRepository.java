package com.example.springcursework.repository;

import com.example.springcursework.model.EmployeeWorkplaceView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeWorkplaceViewRepository extends JpaRepository<EmployeeWorkplaceView, Integer> {

    List<EmployeeWorkplaceView> findAllByEmployeeIdOrderByFromDateDesc(int employeeId);

    //List<Z_AttendanceView> findByGroupScheduleId(int groupScheduleId);

    /*
    @Query(value = "select * from student where user_id = ?1", nativeQuery = true)
    List<Z_Student> findRelatedStudents(int userId);
    * */
}
