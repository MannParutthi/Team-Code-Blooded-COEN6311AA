package com.codeblooded.travelbookingsystem.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfile {
    private String email;
    private String password;
}