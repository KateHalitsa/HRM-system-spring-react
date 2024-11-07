package com.example.springcursework.repository;

import com.example.springcursework.model.Z_GroupSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Z_GroupScheduleRepository extends JpaRepository<Z_GroupSchedule, Integer> {

    List<Z_GroupSchedule> findByGroupId(int groupId);

    /*
    @Query(value = "select * from student where user_id = ?1", nativeQuery = true)
    List<Z_Student> findRelatedStudents(int userId);
    * */
}
