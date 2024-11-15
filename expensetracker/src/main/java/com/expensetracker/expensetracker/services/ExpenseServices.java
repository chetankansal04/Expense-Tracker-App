package com.expensetracker.expensetracker.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.expensetracker.expensetracker.entity.Expense;
import com.expensetracker.expensetracker.entity.User;
import com.expensetracker.expensetracker.repository.ExpenseRepository;

import jakarta.transaction.Transactional;

@Component
public class ExpenseServices {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserServices userServices;

    @Transactional
    public void createExpense(Expense expenseEntry) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userServices.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User Id is invalid");
        }
        expenseEntry.setUserId(user.getId());
        expenseRepository.save(expenseEntry);

    }

    public List<Expense> getAllExpenseOfUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userServices.findByUsername(username);
        return expenseRepository.findByUserId(user.getId());

    }

    public Optional<Expense> findById(Long id) {
        return expenseRepository.findById(id);
    }

    @Transactional
    public void deleteById(Long id) {
        try {
            expenseRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Id is invalid");
        }
    }

    @Transactional
    public Expense updateExpense(Long id, Expense updatedexpense) {
        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense with ID " + id + " not found."));

        // Update the fields with new values
        existingExpense.setAmount(updatedexpense.getAmount());
        existingExpense.setDescription(updatedexpense.getDescription());
        existingExpense.setDate(LocalDateTime.now());

        return expenseRepository.save(existingExpense);
    }
}