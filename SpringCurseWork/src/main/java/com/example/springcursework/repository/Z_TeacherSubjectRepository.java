package com.example.springcursework.repository;

import com.example.springcursework.model.Z_TeacherSubject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Z_TeacherSubjectRepository extends JpaRepository<Z_TeacherSubject, Integer> {

    List<Z_TeacherSubject> findByTeacherId(int teacherId);

    /*
    @Query(value = "select * from student where user_id = ?1", nativeQuery = true)
    List<Z_Student> findRelatedStudents(int userId);
    * */
}
