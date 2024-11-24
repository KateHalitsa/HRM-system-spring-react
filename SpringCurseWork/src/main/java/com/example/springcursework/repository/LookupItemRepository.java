package com.example.springcursework.repository;

import com.example.springcursework.model.LookupItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LookupItemRepository extends JpaRepository<LookupItem, Integer> {

    @Query(value = """
            SELECT e.id, CONCAT( e.last_name, ' ',  e.first_name) name
            FROM employee e
            WHERE CONCAT( e.last_name, ' ',  e.first_name) LIKE ?1
            """,
            nativeQuery = true)
    List<LookupItem> findEmployeeList(String likeParam);

    @Query(value = """
            SELECT e.id, CONCAT( e.last_name, ' ',  e.first_name) name
            FROM employee e
            WHERE e.id = ?1
            """,
            nativeQuery = true)
    public LookupItem loadEmployeeItem(int id);
    @Query(value = """
            SELECT e.id,  e.name
            FROM employee_position e
            WHERE  e.name LIKE ?1
            """,
            nativeQuery = true)
    List<LookupItem> findPositionList(String likeParam);

    @Query(value = """
            SELECT e.id,  e.name
            FROM employee_position e
            WHERE e.id = ?1
            """,
            nativeQuery = true)
    public LookupItem loadPositionItem(int id);

    @Query(value = """
            SELECT p.id,  p.name
            FROM project p
            WHERE  p.name LIKE ?1
            """,
            nativeQuery = true)
    List<LookupItem> findProjectList(String likeParam);

    @Query(value = """
            SELECT p.id,  p.name
            FROM project p
            WHERE p.id = ?1
            """,
            nativeQuery = true)
    public LookupItem loadProjectItem(int id);
}
