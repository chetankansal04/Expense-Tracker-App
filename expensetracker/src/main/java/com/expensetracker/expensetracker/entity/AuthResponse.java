package com.expensetracker.expensetracker.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class AuthResponse {
  private String username;
  private String token;

}
