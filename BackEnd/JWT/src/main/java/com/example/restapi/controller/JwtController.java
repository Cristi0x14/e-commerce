package com.example.restapi.controller;

import com.example.restapi.entity.JwtRequest;
import com.example.restapi.entity.JwtRespone;
import com.example.restapi.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class JwtController {
    @Autowired
    private JwtService jwtService;

    @PostMapping({"/authenticate"})
    public JwtRespone createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception{
    return jwtService.createJwtToken(jwtRequest);
    }
}
