package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeePositionFeature;
import com.example.springcursework.repository.EmployeePositionFeatureRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class EmployeePositionFeatureServiceImpl implements EmployeePositionFeatureService{
    @Autowired
    private EmployeePositionFeatureRepository featureRepository;

    @Override
    public EmployeePositionFeature insert(EmployeePositionFeature featureVO) {
        return this.featureRepository.save(featureVO);
    }

    @Override
    public List<EmployeePositionFeature> findAll() {
        return this.featureRepository.findAllSortedByPositionName();
    }

    @Override
    public void delete(int id) {
        this.featureRepository.deleteById(id);
    }

    @Override
    public EmployeePositionFeature findById(int id) {
        return this.featureRepository.findById(id).get();
    }

    @Override
    public EmployeePositionFeature updateEmployeePositionFeature(int id, EmployeePositionFeature featureVO) {
        featureVO.setId(id);
        return this.featureRepository.save(featureVO);
    }

}
