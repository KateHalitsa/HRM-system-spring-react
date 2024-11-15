package com.example.springcursework.servise;

import com.example.springcursework.model.*;

import com.example.springcursework.repository.*;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class WorkplaceServiceImpl implements WorkplaceService{
    @Autowired
    private WorkplaceRepository workplaceRepository;
    @Autowired
    private EmployeePositionFeatureRepository featureRepository;
    @Autowired
    private FeatureForWorkplaceRepository featureForWorkplaceRepository;
    @Autowired
    private WorkplaceFeatureRepository workplaceFeatureRepository;

    @Override
    public Workplace insert(Workplace workplaceVO) {
        return this.workplaceRepository.save(workplaceVO);
    }

    @Override
    public List<Workplace> findAll() {
        return this.workplaceRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.workplaceRepository.deleteById(id);
    }

    @Override
    public Workplace findById(int id) {
        return this.workplaceRepository.findById(id).get();
    }

    @Override
    public Workplace updateWorkplace(int id, Workplace workplaceVO) {
        workplaceVO.setId(id);
        return this.workplaceRepository.save(workplaceVO);
    }

    @Override
    public List<EmployeePositionFeature> findRelatedFeatures(int workplaceId) {
        return  featureRepository.findByWorkplaceId(workplaceId);
    }

    @Override
    public List<FeatureForWorkplace> FeaturesByWorkplaceId(int id) {
        return  featureForWorkplaceRepository.findFeatureForWorkplaceId(id);
    }

    @Override
    public List<FeatureForWorkplace> updateFeaturesByWorkplaceId(int workplaceId, List<FeatureForWorkplace> features) {
        for (int i = 0; i < features.size(); i++) {
            FeatureForWorkplace feature = features.get(i);
            boolean isEmptyUserRoleId = (feature.getWorkplaceFeatureId() == null) || (feature.getWorkplaceFeatureId() <= 0);
            boolean isEmptyWeight=(feature.getWeight()==null)||feature.getWeight()==0;
            if ( !isEmptyWeight){
                WorkplaceFeature newWorkplaceFeature = new WorkplaceFeature();
                newWorkplaceFeature.setWorkplaceId(workplaceId);
                newWorkplaceFeature.setFeatureId(feature.getFeatureId());
                newWorkplaceFeature.setWeight(feature.getWeight());
                if (!isEmptyUserRoleId){
                    int feature_id=feature.getWorkplaceFeatureId();
                    WorkplaceFeature anotherFeature=workplaceFeatureRepository.findByWorkplaceAndFeatureId(workplaceId,feature_id);
                    int id=anotherFeature.getId();
                   newWorkplaceFeature.setId(id);
                }
                workplaceFeatureRepository.save(newWorkplaceFeature);
            }
            else {
                if (!isEmptyUserRoleId && feature.getWeight()==0){
                    workplaceFeatureRepository.deleteById(feature.getWorkplaceFeatureId());
                }
            }
        }
        return FeaturesByWorkplaceId(workplaceId);
    }

}
