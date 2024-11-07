package com.example.springcursework.repository;

import com.example.springcursework.model.Z_Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Z_GroupRepository extends JpaRepository<Z_Group, Integer> {

    //Optional<Z_Student> findByUserId(int userId);

    /*
    @Query(value = "select * from student where user_id = ?1", nativeQuery = true)
    List<Z_Student> findRelatedStudents(int userId);
    * */
}
