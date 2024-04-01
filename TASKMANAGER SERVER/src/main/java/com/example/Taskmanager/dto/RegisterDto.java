package com.example.Taskmanager.dto;

import com.example.Taskmanager.entity.RoleEntity;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private RoleEntity role;
}
