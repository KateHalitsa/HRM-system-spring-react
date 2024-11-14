package com.example.springcursework.repository;

import com.example.springcursework.model.FeatureForWorkplace;
import com.example.springcursework.model.RoleForUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeatureForWorkplaceRepository extends JpaRepository<FeatureForWorkplace, Integer> {
    @Query(value = """
            select f.id feature_id, f.name feature_name, not ISNULL(wf.workplace_id) is_selected, wf.id workplace_feature_id, wf.weight weight
            from employee_position_feature f LEFT OUTER join workplace_feature wf on (f.id = wf.feature_id and wf.workplace_id = ?1)
            """,
            nativeQuery = true)
    List<FeatureForWorkplace> findFeatureForWorkplaceId(int workplaceId);

}
