package com.example.Taskmanager.controller;

import com.example.Taskmanager.dto.AuthResponseDTO;
import com.example.Taskmanager.dto.LoginDTO;
import com.example.Taskmanager.dto.RegisterDto;
import com.example.Taskmanager.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO request) {
        return ResponseEntity.ok(userService.authenticate(request));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterDto request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/logout")
    public String logout(HttpServletResponse response, @CookieValue(name = "refreshtoken", required = false) Cookie refreshToken) {
        try {
            if (refreshToken != null) {
                refreshToken.setMaxAge(0); // Remove the cookie by setting its max age to 0
                response.addCookie(refreshToken);
            }
            return "Logged out.";
        } catch (Exception e) {
            // Handle any exceptions, perhaps logging the error
            return "An error occurred during logout.";
        }
    }

//    @PostMapping("/forgot-password")
//    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> requestBody) {
//        try {
//            String email = requestBody.get("email");
//            // Validate input
//            if (email == null || email.isEmpty()) {
//                return ResponseEntity.badRequest().body("Please fill in the email field.");
//            }
//            // Validate email (you can use your own logic to validate email)
//            UsersEntity user = userRepository.findByUsername(email);
//            if (user == null) {
//                return ResponseEntity.badRequest().body("No user found with this email.");
//            }
//            // Create token
//            String token = generateResetPasswordToken.PasswordToken(email);
//            // Generate reset password URL
////            String resetPasswordUrl = "{base_url}/reset-password/" + token;
//            // Send email (you can use your own logic to send email)
////            emailService.sendResetPasswordEmail(email, resetPasswordUrl);
//            return ResponseEntity.ok().body("Please check your email for the reset link.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
//        }
//    }

    @GetMapping("/success")
    public ResponseEntity<String> loginSuccess() {
        // Assuming you have obtained the refresh token from somewhere
        String refreshToken = "";

        // Set the refresh token as a cookie
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, "refreshtoken=" + refreshToken + "; HttpOnly; Secure; SameSite=Lax; Max-Age=" + (30 * 24 * 60 * 60)); // 30 days

        // Return success response with the cookie set
        return ResponseEntity.ok().headers(headers).body("Login success!");
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        userService.refreshToken(request, response);
    }
}
