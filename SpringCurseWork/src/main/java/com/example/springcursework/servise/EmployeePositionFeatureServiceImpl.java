package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeePositionFeature;
import com.example.springcursework.repository.EmployeePositionFeatureRepository;
import com.example.springcursework.repository.RoleRepository;
import com.example.springcursework.repository.EmployeePositionFeatureRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class EmployeePositionFeatureServiceImpl implements EmployeePositionFeatureService{
    @Autowired
    private EmployeePositionFeatureRepository workplaceRepository;
    @Autowired
    private RoleRepository roleRepository;
   /* @Autowired
    private RoleForEmployeePositionFeatureRepository roleForEmployeePositionFeatureRepository;
    @Autowired
    private EmployeePositionFeatureRoleRepository workplaceRoleRepository;*/

    @Override
    public EmployeePositionFeature insert(EmployeePositionFeature workplaceVO) {
        return this.workplaceRepository.save(workplaceVO);
    }

    @Override
    public List<EmployeePositionFeature> findAll() {
        return this.workplaceRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.workplaceRepository.deleteById(id);
    }

    @Override
    public EmployeePositionFeature findById(int id) {
        return this.workplaceRepository.findById(id).get();
    }

    @Override
    public EmployeePositionFeature updateEmployeePositionFeature(int id, EmployeePositionFeature featureVO) {
        featureVO.setId(id);
        return this.workplaceRepository.save(featureVO);
    }

}
