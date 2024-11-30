package com.example.springcursework.repository;

import com.example.springcursework.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query(value = "SELECT e.* FROM  employee e WHERE" +
            " NOT EXISTS (SELECT * FROM employee_workplace ew WHERE ew.employee_id = e.id AND ?1 BETWEEN ew.from_date AND ew.to_date)", nativeQuery = true)
    List<Employee> freeEmployeesOnDate(LocalDateTime calcOnDate);

}
