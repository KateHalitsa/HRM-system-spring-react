package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeeEfficiencyCell;
import com.example.springcursework.repository.EmployeeEfficiencyCellRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class EmployeeEfficiencyServiceImpl implements EmployeeEfficiencyService
{
   @Autowired
   private EmployeeEfficiencyCellRepository employeeEfficiencyRepository;

    @Override
    public List<EmployeeEfficiencyCell> loadEmployeeEfficiency(int projectId, LocalDateTime calcOnDate){
        List<EmployeeEfficiencyCell> res = employeeEfficiencyRepository.loadEmployeeEfficiency(projectId, calcOnDate);
        return res;
    }
    @Override
    public List<EmployeeEfficiencyCell> loadExistEmployeeEfficiency(int projectId, LocalDateTime calcOnDate){
        List<EmployeeEfficiencyCell> res = employeeEfficiencyRepository.loadExistEmployeeEfficiency(projectId, calcOnDate);
        return res;
    }

}
