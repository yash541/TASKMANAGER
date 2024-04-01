package com.example.Taskmanager.service;

import com.example.Taskmanager.dto.AuthResponseDTO;
import com.example.Taskmanager.dto.LoginDTO;
import com.example.Taskmanager.dto.RegisterDto;
import com.example.Taskmanager.entity.RoleEntity;
import com.example.Taskmanager.entity.TokenEntity;
import com.example.Taskmanager.entity.TokenType;
import com.example.Taskmanager.entity.UsersEntity;
import com.example.Taskmanager.repository.TokenRepository;
import com.example.Taskmanager.repository.UsersRepository;
import com.example.Taskmanager.security.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsersRepository usersRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponseDTO register(RegisterDto request) {
        var user = UsersEntity.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(RoleEntity.USER)
                .build();
        var savedUser = usersRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
//        saveUserToken(savedUser, jwtToken);
        return AuthResponseDTO.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthResponseDTO authenticate(LoginDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
//        revokeAllUserTokens(user);
//        saveUserToken(user, jwtToken);
        return AuthResponseDTO.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void saveUserToken(UsersEntity user, String jwtToken) {
        var token = TokenEntity.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
//        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(UsersEntity user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.usersRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthResponseDTO.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

//    public UsersEntity loadUserByUsername(String username) {
//        UsersEntity user = userRepository.findByUsername(username);
//        return user;
//    }
//
//    public UsersEntity createUser(String username, String password, String email, String roles) {
//        // Encrypt the password before saving
//        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
//
//        // Create a new User object
//        UsersEntity userEntity = new UsersEntity();
//        userEntity.setUsername(username);
//        userEntity.setPassword(hashedPassword);
//        userEntity.setEmail(email);
//
//        // Save the user to the database
//        userRepository.save(userEntity);
//        return userEntity;
//
//    }
//
//
//    public UsersEntity getUserByUsername(String username) {
//        UsersEntity userEntity =userRepository.findByUsername(username);
//        return userEntity;
//    }
//
//    public Boolean DeleteUser(String username){
//
//        UsersEntity userEntity =userRepository.findByUsername(username);
//        if (userEntity !=null){
//            userRepository.delete(userEntity);
//            return Boolean.TRUE;
//        }
//
//        return Boolean.FALSE;
//    }
}
