package com.expensetracker.expensetracker.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequest {
    private String username;
    private String password;  // Only include relevant fields

    // Constructors, Getters, and Setters
}