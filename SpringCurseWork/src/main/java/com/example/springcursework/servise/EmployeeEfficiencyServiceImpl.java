package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeeEfficiencyCell;
import com.example.springcursework.repository.EmployeeEfficiencyCellRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class EmployeeEfficiencyServiceImpl implements EmployeeEfficiencyService
{
   @Autowired
   private EmployeeEfficiencyCellRepository employeeEfficiencyRepository;

    @Override
    public List<EmployeeEfficiencyCell> loadEmployeeEfficiency(){
        List<EmployeeEfficiencyCell> res = employeeEfficiencyRepository.loadEmployeeEfficiency();
        return res;
    }

}
