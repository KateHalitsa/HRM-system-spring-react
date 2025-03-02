package com.example.springcursework.repository;

import com.example.springcursework.model.Project;
import com.example.springcursework.model.ProjectEfficiency;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.SqlResultSetMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
/*@SqlResultSetMapping(
        name = "ProjectEfficiencyMapping",
        classes = @ConstructorResult(
                targetClass = ProjectEfficiency.class,
                columns = {
                        @ColumnResult(name = "project_name", type = String.class),
                        @ColumnResult(name = "total_effectiveness", type = Double.class)
                }
        )
)*/
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    @Query(name = "Project.findProjectEfficiency", nativeQuery = true)
    List<ProjectEfficiency> findProjectEfficiency();  //Return type ProjectEfficiency
}
