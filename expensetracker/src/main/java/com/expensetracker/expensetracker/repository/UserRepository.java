package com.expensetracker.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensetracker.expensetracker.entity.User;


public interface UserRepository extends JpaRepository<User, Long> {
  User findByUsername(String username);
}
