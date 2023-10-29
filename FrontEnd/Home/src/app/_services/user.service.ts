import { NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API = "http://localhost:8081";
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  )
  constructor(private httpclient : HttpClient) { }

  public login(loginData : Data){
    return this.httpclient.post(this.PATH_OF_API +"/authenticate", loginData, {headers: this.requestHeader})
  }

}
