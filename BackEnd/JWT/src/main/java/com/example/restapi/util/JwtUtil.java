package com.example.restapi.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static final String SECRET_KEY="raita";
    public String getUserNameFromToken(String token){
        return getClaimFromToken(token,Claims::getSubject);
    }
    private <T> T getClaimFromToken(String token, Function<Claims,T>claimResolver){
       final Claims claims =getAllClaimsFromToken(token);
        return claimResolver.apply(claims);
    }
    private Claims getAllClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public boolean validateToken(String token, UserDetails userDetails){
        String userName =  getUserNameFromToken(token);
        return ( userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    private boolean isTokenExpired(String token){
       final Date expirationDate = getExiprationDateFromToken(token);
       return expirationDate.before(new Date());
    }
    private Date getExiprationDateFromToken(String token){
        return getClaimFromToken(token,Claims::getExpiration);
    }
}
