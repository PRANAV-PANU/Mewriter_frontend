import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { WebrequestService } from '../services/webrequest.service';
declare var jQuery: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  users:any;
  posts: any;
  categories: any;
  languages: any;
  languageName: string = 'Hindi';
  categoryName: string = 'Shayari';
  postTitle: string = '';
  isAdmin: boolean=false;
  isLoggedIn: boolean=false;
  languageVisible: boolean = false;
  categoryVisible: boolean = false;
  postVisible: boolean = false;
  isDisabled:boolean = false;

  constructor(private router: Router, private services: WebrequestService,
    private route: ActivatedRoute, private user: UserService) {

  }
  ngOnInit(): void {
    this.isAdmin = this.user.isAdmin;
    this.isLoggedIn =this.user.isLoggedIn;
    this.postTitle = this.route.snapshot.params['postTitle'];
    //console.log(this.postTitle);
    this.getAllLanguages();
    this.getPosts(this.postTitle);
    this.getAllCategories(this.languageName);
  }

  getToFooter() {
    document.getElementById("footer")?.scrollIntoView();
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

  getPosts(postTitle: string) {
    var datatosend = {
      postTitle: postTitle
    }
    this.services.getPost(datatosend).subscribe((data) => {
      let obj = JSON.stringify(data);
      this.posts = JSON.parse(obj);
      this.posts = Array.of(this.posts);
      //console.log(this.posts);
      this.postVisible = true;
    });
  }

  onChoose(category: string) {
    //console.log(category);
    this.router.navigate(['/home', this.languageName, category])
  }

  onSelection(postTitle: string) {
    //console.log(postTitle);
    this.router.navigate(['/home', this.languageName, this.categoryName, postTitle]);
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

  increaseDislikes() {
    console.log("DisLiked");
  }

  pressShare() {
    console.log("Shared");
  }

  addPost() {
    this.router.navigate(['/home/addPost']);
  }
  editPost(postTitle: string) {
    this.router.navigate(['/home/edit', postTitle]);
  }

  //delete post Modal
  openDialog() {
    jQuery('#deletePostModal').modal('show');
  }
  deletePost() {
    jQuery('#deletePostModal').modal('hide');
    console.log("Pressed");
    var datatosend = {
      postTitle: this.postTitle
    }
    console.log("121");
    console.log(datatosend);
    this.services.deletePost(datatosend).subscribe((data) => {
      console.log('post deleted');
      console.log(data);
      this.router.navigate(['/home']);
    });
  }

  close() {
    jQuery('#deletePostModal').modal('hide');
  }
  //Login Modal
  openLoginDialog() {
    jQuery('#loginModal').modal('show');
  }

  closeLoginModal() {
    jQuery('#loginModal').modal('hide');
  }

  loginUserValues(form: NgForm) {
    // this.services.getUser(datatosend).subscribe((data)=>{
    //   console.log(data);
    // })
    console.log(form.value);
    this.services.getUser(form.value).subscribe(data => {
      let obj = JSON.stringify(data);
      this.users = JSON.parse(obj);
      this.users = Array.of(this.users);
    })
    jQuery('#loginModal').modal('hide');
  }
}
