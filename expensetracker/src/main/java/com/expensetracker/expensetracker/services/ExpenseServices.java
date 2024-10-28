package com.expensetracker.expensetracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.expensetracker.expensetracker.entity.Expense;
import com.expensetracker.expensetracker.repository.ExpenseRepository;


@Component
public class ExpenseServices {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

}
