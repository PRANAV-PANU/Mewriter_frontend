import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { WebrequestService } from '../services/webrequest.service';
declare var jQuery:any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  postTitle: any;
  showVisible: boolean = false;
  posts: any;
  isHidden:boolean = false;
  categoryList=['Shayari','Story',
    'Current Affair\'s',
    'Dhram Puraan',
    'News',
    'Politics',
    'Sports',
    'Bollywood',
    'Medicine',
    'Food',
    'Astrology',
    'Panchang',
    'Tips',
    'Desh  duniya'
  ];
  deleteVisible: boolean = false;
  isAdmin: any;
  isLoggedIn: any;

  constructor(private services:WebrequestService,private router:Router) { }

    
  ngOnInit(): void {
    this.check();
  }

  getToFooter() {
    document.getElementById("footer")?.scrollIntoView();
  }

  addPost(form:NgForm){
    var datatosend = form.value
    console.log(datatosend);
    this.services.addPost(datatosend).subscribe((data)=>{
      console.log("post added");
      this.router.navigate(['/home']);
    })
  }

  openDialog() {
    jQuery('#searchTitleModal').modal('show');
  }

  close() {
    jQuery('#searchTitleModal').modal('hide');
    this.isHidden = false;
    this.showVisible = false;
  }

  searchPost(form:NgForm){
    console.log(form.value);
    this.services.getPost(form.value).subscribe(data=>{
      let obj = JSON.stringify(data);
      this.posts = JSON.parse(obj);
      this.posts = Array.of(this.posts);
      console.log(this.posts);
      if(this.posts[0].post.length == 0){
        this.isHidden = true;
      }else{
        this.isHidden = false;
        this.showVisible = true;
        this.postTitle = this.posts[0].post[0].postTitle;
        console.log(this.postTitle);
      }
    })
  }

  deletePost() {
    var datatosend = {
      postTitle: this.postTitle
    }
    console.log(datatosend);
    this.services.deletePost(datatosend).subscribe((data) => {
      console.log('post deleted');
      console.log(data);
        this.isHidden = false;
        this.showVisible = false;
        this.deleteVisible = true;
      setTimeout(()=>{
        this.postTitle = '';
        jQuery('#searchTitleModal').modal('hide');
      },5000);
    });
  }

  logout(){
    jQuery('#logoutModal').modal('show');

    }

  logoutClose(){
    jQuery('#logoutModal').modal('hide');

  }

  logoff(){
    jQuery('#logoutModal').modal('hide');
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  check(){
    this.isLoggedIn = localStorage.getItem("loggedIn") == null ? false:true;
    if(this.isLoggedIn){
      this.isAdmin = localStorage.getItem("admin") == "true" ?true:false;
    }
  }

  home(){
    this.logoff();
  }
}
