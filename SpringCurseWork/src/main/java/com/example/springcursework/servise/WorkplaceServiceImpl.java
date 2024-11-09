package com.example.springcursework.servise;

import com.example.springcursework.model.Workplace;

import com.example.springcursework.repository.RoleRepository;
import com.example.springcursework.repository.WorkplaceRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class WorkplaceServiceImpl implements WorkplaceService{
    @Autowired
    private WorkplaceRepository workplaceRepository;
    @Autowired
    private RoleRepository roleRepository;
   /* @Autowired
    private RoleForWorkplaceRepository roleForWorkplaceRepository;
    @Autowired
    private WorkplaceRoleRepository workplaceRoleRepository;*/

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

}
