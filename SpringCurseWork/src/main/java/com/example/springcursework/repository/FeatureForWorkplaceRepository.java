package com.example.springcursework.repository;

import com.example.springcursework.model.FeatureForWorkplace;
import com.example.springcursework.model.RoleForUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeatureForWorkplaceRepository extends JpaRepository<FeatureForWorkplace, Integer> {
    @Query(value = """
                select 
                  f.id feature_id, 
                  f.name feature_name, 
                  wf.id workplace_feature_id, 
                  wf.weight weight,
                  (select ep.name from employee_position ep where ep.id = f.employee_position_id) employee_position_name
                from 
                  employee_position_feature f LEFT OUTER join workplace_feature wf on (f.id = wf.feature_id and wf.workplace_id = ?1)
                where 
                  (f.employee_position_id is null) or
                  (f.employee_position_id = (select w.employee_position_id from workplace w where w.id = ?1))
                order by employee_position_name, feature_name
            """,
            nativeQuery = true)
    List<FeatureForWorkplace> findFeatureForWorkplaceId(int workplaceId);

}
