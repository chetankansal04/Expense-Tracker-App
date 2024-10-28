package com.expensetracker.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensetracker.expensetracker.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
