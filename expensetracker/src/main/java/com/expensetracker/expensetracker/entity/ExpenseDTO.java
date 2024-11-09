package com.expensetracker.expensetracker.entity;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data

public class ExpenseDTO {

    private Long id;
    private BigDecimal amount;
    private String description;
    private List<String> category;
    private Long userId;

}
