package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeeWorkplace;
import com.example.springcursework.repository.EmployeeWorkplaceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class EmployeeWorkplaceServiceImpl implements EmployeeWorkplaceService
{
   @Autowired
   private EmployeeWorkplaceRepository employeePositionRepository;

    @Override

    public EmployeeWorkplace insert(EmployeeWorkplace employeeVO) {
        return this.employeePositionRepository.save(employeeVO);
    }

    @Override
    public List<EmployeeWorkplace> findAll() {
        return this.employeePositionRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.employeePositionRepository.deleteById(id);
    }

    @Override
    public EmployeeWorkplace findById(int id) {
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

    /*@Override
    public List<EmployeeWorkplace> findByNamePart(String namePart)
    {
        List<EmployeeWorkplace> filteredList;
        List<EmployeeWorkplace> originalList = this.employeePositionRepository.findAll();

        String[] keys = namePart.trim().toLowerCase().split(" ");
        if (keys.length == 0) {
            filteredList = originalList;
        } else {
            filteredList = originalList.stream()
                    .filter(employeePosition ->
                            findByKeys(employeePosition., keys)
                    ).collect(Collectors.toList());
        }

        filteredList.sort(Comparator.comparing(EmployeeWorkplace::getName));

        return filteredList;
    }*/

    @Override
    public EmployeeWorkplace updateEmployeeWorkplace(int id, EmployeeWorkplace employeeVO) {
        employeeVO.setId(id);
        return this.employeePositionRepository.save(employeeVO);
    }
}
