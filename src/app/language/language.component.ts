import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebrequestService } from '../services/webrequest.service';
declare var jQuery:any;

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  posts: any;
  categories: any;
  languages: any;
  languageName: string = 'Hindi';
  categoryName: string = 'Shayari';
  isDisabled:boolean = false;
  languageVisible: boolean = false;
  categoryVisible: boolean = false;
  postVisible: boolean = false;
  constructor(private router: Router, private services: WebrequestService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.languageName = this.route.snapshot.params['languageName'];
    this.getAllLanguages();
    this.getAllPosts(this.languageName,this.categoryName);
    this.getAllCategories(this.languageName);
  }

  onSelect(language: string) {
    this.languageName = language;
    this.router.navigate(['/home', language]);
    //console.log(language);
    this.getAllPosts(language,this.categoryName);
    this.getAllCategories(language);
  }

  onClick() {
    this.router.navigate(['/home', this.languageName, this.categoryName]);
  }

  getToFooter() {
    document.getElementById("footer")?.scrollIntoView();
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
    console.log("hello");
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
      console.log(this.postVisible);
    });
  }

  onChoose(category:string){
    //console.log(category);
    this.categoryName = category;
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
    console.log(form.value);
    jQuery('#loginModal').modal('hide');
  }
}
