import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebrequestService } from '../services/webrequest.service';
declare var jQuery:any;
import { NgForm } from '@angular/forms';
import { data } from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any;
  categories: any;
  languages: any;
  languageName: string = 'Hindi';
  categoryName:string= 'Shayari';
  isDisabled:boolean = false;
  languageVisible: boolean = false;
  categoryVisible: boolean = false;
  postVisible: boolean = false;
  userVisible: boolean = false;
  users:any;
  isAdmin: any;
  isLoggedIn: any;

  constructor(private router: Router, private services: WebrequestService) {

  }

  ngOnInit(): void {
    this.getAllLanguages();
    this.getAllPosts(this.languageName,this.categoryName);
    this.getAllCategories(this.languageName);
  }

  onSelect(language: string) {
    this.router.navigate(['/home', language]);
    //console.log(language);
  }

  getAllCategories(languageName: string) {
    var datatosend = {
      languageName: languageName
    }
    this.services.getAllCategories(datatosend).subscribe((data) => {
      let obj = JSON.stringify(data);
      this.categories = JSON.parse(obj);
      this.categories = Array.of(this.categories);
      //console.log(this.categories);
      this.categoryVisible = true;
    });
  }

  getAllLanguages() {
    //console.log(this.languageVisible);
    this.services.getAllLanguages().subscribe((data) => {
      let obj = JSON.stringify(data);
      this.languages = JSON.parse(obj);
      this.languages = Array.of(this.languages);
      //console.log(this.languages);
      this.languageVisible = true;
    });
    
  }

  getAllPosts(languageName: string,categoryName:string) {
    var datatosend = {
      languageName: languageName,
      categoryName: categoryName
    }
    this.services.getAllPost(datatosend).subscribe((data) => {
      let obj = JSON.stringify(data);
      this.posts = JSON.parse(obj);
      this.posts = Array.of(this.posts);
      if(this.posts[0].allPosts.length > 0){
        this.postVisible = true;
      }else{
        this.postVisible = false;
      }
      
    });
  }
  getToFooter() {
    document.getElementById("footer")?.scrollIntoView();
  }

  onClick() {
  
    this.router.navigate(['/home', 'Hindi'])
  }

  onChoose(category:string){
    //console.log(category);
    this.router.navigate(['/home',this.languageName,category])
  }

  onSelection(postTitle:string){
    //console.log(postTitle);
    this.router.navigate(['/home',this.languageName,this.categoryName,postTitle]);
  }
  increaseLikes(title:string){
    this.isDisabled = true;
    console.log("Liked");
    var datatosend = {
      postTitle:title
    }
    this.services.increaseLikes(datatosend).subscribe(data=>{
      console.log("liked");
    })
  }

  increaseDislikes(){
    console.log("DisLiked");
  }

  pressShare(){
    console.log("Shared");
  }

  openLoginDialog(){
    jQuery('#loginModal').modal('show');
  }

  closeLoginModal(){
    jQuery('#loginModal').modal('hide');
  }

  loginUserValues(form:NgForm){
    var datatosend={
      username:form.value.username,
      password:form.value.password
    }
    // this.services.getUser(datatosend).subscribe((data)=>{
    //   console.log(data);
    // })
    //console.log(form.value,136);
    this.services.getUser(form.value).subscribe(data=>{
      let obj = JSON.stringify(data);
      this.users = JSON.parse(obj);
      this.users = Array.of(this.users);

      
      if(this.users[0].user.length == 0){
        this.userVisible = true;
      }else{
        jQuery('#loginModal').modal('hide');
        if(this.users[0].user[0].isAdmin){
          this.isAdmin = "true";
        }else{
          this.isAdmin = "false";
        }
         this.isLoggedIn = "true";
         localStorage.setItem("admin",this.isAdmin);
         localStorage.setItem("loggedIn",this.isLoggedIn);
         this.router.navigate(['/home/admin']);
      }
    });
    
  }
}
