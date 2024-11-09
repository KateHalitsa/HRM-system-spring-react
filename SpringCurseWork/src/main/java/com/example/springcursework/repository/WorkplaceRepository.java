package com.example.springcursework.repository;

import com.example.springcursework.model.User;
import com.example.springcursework.model.Workplace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkplaceRepository extends JpaRepository<Workplace, Integer> {

}
