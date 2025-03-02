package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "project")
@NamedNativeQuery(
        name = "Project.findProjectEfficiency",
        query = """
             SELECT p.name AS project_name,
             SUM(ef.value * wf.weight) AS total_effectiveness
              FROM employee_feature ef 
              JOIN employee e ON ef.employee_id = e.id
             JOIN employee_workplace ew ON e.id = ew.employee_id
             JOIN workplace w ON ew.workplace_id = w.id
             JOIN workplace_feature wf ON w.id = wf.workplace_id
             JOIN project p ON w.project_id = p.id 
             GROUP BY p.name
          ORDER BY total_effectiveness DESC
         """,
        resultSetMapping = "ProjectEfficiencyMapping",
        resultClass = Project.class  //optional, use if the SQL result maps to the Project entity
)
@SqlResultSetMapping(
        name = "ProjectEfficiencyMapping",
        classes = @ConstructorResult(
                targetClass = ProjectEfficiency.class,
                columns = {
                        @ColumnResult(name = "project_name", type = String.class),
                        @ColumnResult(name = "total_effectiveness", type = Double.class)
                }
        )
)
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key
    @Column(name = "name")
    private String name;


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() { return name; }
    public void setName(String firstName) { this.name = firstName; }



    //public String getFullName(){return name;}

    @Override
    public String toString() {
        return "Project [id=" + id + ", name=" + name +"]";
    }

}
