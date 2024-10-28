package com.expensetracker.expensetracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.expensetracker.entity.Expense;
import com.expensetracker.expensetracker.services.ExpenseServices;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseServices expenseServices;

    @PostMapping
    public ResponseEntity<?> createExpense(@RequestBody Expense expense) {
        Expense createExpense = expenseServices.createExpense(expense);
        return new ResponseEntity<>(createExpense, HttpStatus.CREATED);
    }

}
