package com.expensetracker.expensetracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<?> createExpense(@RequestBody Expense expenseEntry) {
        try {
            expenseServices.createExpense(expenseEntry);
            return new ResponseEntity<>(expenseEntry, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllExpenseOfUser() {
        try {
            List<Expense> expense = expenseServices.getAllExpenseOfUser();
            if (expense.isEmpty()) {
                return new ResponseEntity<>("No expenses found for this user.", HttpStatus.OK); // Or return an empty
                                                                                                // list
            }
            return new ResponseEntity<>(expense, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        try {
            expenseServices.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) {
        try {
            Expense existingExpense = expenseServices.updateExpense(id, updatedExpense);
            return new ResponseEntity<>(existingExpense, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
