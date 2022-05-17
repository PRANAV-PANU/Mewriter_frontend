import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { PostComponent } from './post/post.component';
import { CategoryComponent } from './category/category.component';
import { LanguageComponent } from './language/language.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CategoryComponent,
    LanguageComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    FontAwesomeModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
