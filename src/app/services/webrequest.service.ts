import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebrequestService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  //for user Login
  getUser(data: { email: string; password: string; }) {
    const response = this.http.post(`${this.ROOT_URL}/login`, data);
    return response;
  }

  //to get All Post
  getAllPost(datatosend: { languageName: string }) {
    const response = this.http.post(`${this.ROOT_URL}/posts`, datatosend);
    return response;
  }

  //to get All categories
  getAllCategories(datatosend: { languageName: string; }) {
    const response = this.http.post(`${this.ROOT_URL}/categories`, datatosend);
    return response;
  }

  //to get All Languages
  getAllLanguages() {
    const response = this.http.get(`${this.ROOT_URL}/languages`);
    return response;
  }

  //get a post by its title
  getPost(datatosend: { postTitle: string; }) {
    const response = this.http.post(`${this.ROOT_URL}/findPost`, datatosend);
    return response;
  }

  //add a new post
  addPost(datatosend: any) {
    const response = this.http.post(`${this.ROOT_URL}/post`, datatosend);
    //console.log(response);
    return response;
  }

  //to delete a post
  deletePost(datatosend:any){
    console.log(datatosend);
    const response = this.http.delete(`${this.ROOT_URL}/post/${datatosend.postTitle}`);
    return response;
  }

  increaseLikes(datatosend:any){
    const response = this.http.put(`${this.ROOT_URL}/likes`,datatosend);
    return response;
  }
}
