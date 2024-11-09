package com.example.springcursework.servise;

import com.example.springcursework.model.Employee;
import com.example.springcursework.model.EmployeePosition;
import com.example.springcursework.repository.EmployeePositionRepository;
import com.example.springcursework.repository.EmployeeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class EmployeePositionServiceImpl implements EmployeePositionService
{
   @Autowired
   private EmployeePositionRepository employeePositionRepository;

    @Override

    public EmployeePosition insert(EmployeePosition employeeVO) {
        return this.employeePositionRepository.save(employeeVO);
    }

    @Override
    public List<EmployeePosition> findAll() {
        return this.employeePositionRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.employeePositionRepository.deleteById(id);
    }

    @Override
    public EmployeePosition findById(int id) {
        return this.employeePositionRepository.findById(id).get();
    }

    private boolean findByKeys(String str, String[] keys){
        String s = str.toLowerCase();
        for (String key: keys){
            if (s.indexOf(key) >= 0)
                return true;
        }
        return false;
    }

    @Override
    public List<EmployeePosition> findByNamePart(String namePart)
    {
        List<EmployeePosition> filteredList;
        List<EmployeePosition> originalList = this.employeePositionRepository.findAll();

        String[] keys = namePart.trim().toLowerCase().split(" ");
        if (keys.length == 0) {
            filteredList = originalList;
        } else {
            filteredList = originalList.stream()
                    .filter(employeePosition ->
                            findByKeys(employeePosition.getFullName(), keys)
                    ).collect(Collectors.toList());
        }

        filteredList.sort(Comparator.comparing(EmployeePosition::getName));

        return filteredList;
    }

    @Override
    public EmployeePosition updateEmployeePosition(int id, EmployeePosition employeeVO) {
        employeeVO.setId(id);
        return this.employeePositionRepository.save(employeeVO);
    }
}
