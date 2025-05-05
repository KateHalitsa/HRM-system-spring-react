package com.example.springcursework.servise;

import com.example.springcursework.model.Employee;
import com.example.springcursework.model.FeatureForEmployee;
import com.example.springcursework.model.EmployeeFeature;
import com.example.springcursework.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService
{
   @Autowired
   private EmployeeRepository employeeRepository;
    @Autowired
    private FeatureForEmployeeRepository featureForEmployeeRepository;
    @Autowired
    private EmployeeFeatureRepository employeeFeatureRepository;
    @Override

    public Employee insert(Employee employeeVO) {
        return this.employeeRepository.save(employeeVO);
    }

    @Override
    public List<Employee> findAll() {
        return this.employeeRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.employeeRepository.deleteById(id);
    }

    @Override
    public Employee findById(int id) {
        return this.employeeRepository.findById(id).get();
    }

    @Override
    public Employee updateEmployee(int id, Employee employeeVO) {
        employeeVO.setId(id);
        return this.employeeRepository.save(employeeVO);
    }

    @Override
    public List<FeatureForEmployee> FeaturesByEmployeeId(int id) {
        return  featureForEmployeeRepository.findFeatureForEmployeeId(id);
    }

    @Override
    public List<FeatureForEmployee> updateFeaturesByEmployeeId(int employeeId, List<FeatureForEmployee> features) {
        for (int i = 0; i < features.size(); i++) {
            FeatureForEmployee feature = features.get(i);
            boolean isEmptyEmployeeFeatureId = (feature.getEmployeeFeatureId() == null) || (feature.getEmployeeFeatureId() <= 0);
            boolean isEmptyWeight=(feature.getValue()==null)||feature.getValue()==0;
            if ( !isEmptyWeight){
                EmployeeFeature newEmployeeFeature = new EmployeeFeature();
                newEmployeeFeature.setEmployeeId(employeeId);
                newEmployeeFeature.setFeatureId(feature.getFeatureId());
                newEmployeeFeature.setValue(feature.getValue());
                if (!isEmptyEmployeeFeatureId){
                    int id = feature.getEmployeeFeatureId();
                    newEmployeeFeature.setId(id);
                }
                employeeFeatureRepository.save(newEmployeeFeature);
            }
            else {
                if (!isEmptyEmployeeFeatureId && feature.getValue()==0){
                    employeeFeatureRepository.deleteById(feature.getEmployeeFeatureId());
                }
            }
        }
        return FeaturesByEmployeeId(employeeId);
    }

    @Override
    public List<Employee> freeEmployeesOnDate(LocalDateTime calcOnDate){
        return employeeRepository.freeEmployeesOnDate(calcOnDate);
    }
    @Override
    public List<Employee> notFreeEmployeesOnDate(LocalDateTime calcOnDate){
        return employeeRepository.notFreeEmployeesOnDate(calcOnDate);
    }
}
