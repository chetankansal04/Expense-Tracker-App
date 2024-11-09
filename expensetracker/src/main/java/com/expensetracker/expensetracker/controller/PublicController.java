package com.expensetracker.expensetracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.expensetracker.entity.AuthResponse;
import com.expensetracker.expensetracker.entity.Expense;
import com.expensetracker.expensetracker.entity.LoginRequest;
import com.expensetracker.expensetracker.entity.User;
import com.expensetracker.expensetracker.services.UserServices;
import com.expensetracker.expensetracker.utils.JwtUtil;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/public")
public class PublicController {

  @Autowired
  private UserServices userServices;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private UserDetailsService userDetailsService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody User user) {
    User createUser = userServices.createUser(user);
    return new ResponseEntity<>(createUser, HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    try {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
      User user = userServices.findByUsername(loginRequest.getUsername());
      if (authentication.isAuthenticated()) {
        String token = this.jwtUtil.generateToken(userDetailsService.loadUserByUsername(loginRequest.getUsername()));
        AuthResponse response = new AuthResponse();
        response.setUserName(loginRequest.getUsername());
        response.setToken(token);
        Expense expense = new Expense();
        expense.setId(user.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
      } else {
        throw new UsernameNotFoundException("Invalid Credentials");
      }
    } catch (Exception e) {
      return new ResponseEntity<>("Login Failed: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
    }
  }

}
