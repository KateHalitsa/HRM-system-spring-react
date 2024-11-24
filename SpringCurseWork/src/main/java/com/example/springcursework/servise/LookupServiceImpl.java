package com.example.springcursework.servise;

import com.example.springcursework.model.LookupItem;
import com.example.springcursework.repository.LookupItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class LookupServiceImpl implements LookupService
{
   @Autowired
   private LookupItemRepository lookupItemRepository;

   private String prepareLikeParam(String namePart){
      String likeParam = namePart.trim();
       likeParam = likeParam.replace("*", "%");
       if (likeParam.length() == 0){
           likeParam = "%";
       }
       else{
           likeParam = "%" + likeParam + "%";
       }
       return likeParam;
   }

    @Override
    public List<LookupItem> employeeList(String namePart){
      List<LookupItem>  res = this.lookupItemRepository.findEmployeeList(prepareLikeParam(namePart));
      return res;
    }
    @Override
    public LookupItem employeeItem(int id){
        return this.lookupItemRepository.loadEmployeeItem(id);
    }

    @Override
    public List<LookupItem> positionList(String namePart) {
        List<LookupItem>  res = this.lookupItemRepository.findPositionList(prepareLikeParam(namePart));
        return res;
    }

    @Override
    public LookupItem positionItem(int id) {
        return this.lookupItemRepository.loadPositionItem(id);
    }

    @Override
    public List<LookupItem> projectList(String namePart) {
        List<LookupItem>  res = this.lookupItemRepository.findProjectList(prepareLikeParam(namePart));
        return res;
    }

    @Override
    public LookupItem projectItem(int id) {
        return this.lookupItemRepository.loadProjectItem(id);
    }

}
