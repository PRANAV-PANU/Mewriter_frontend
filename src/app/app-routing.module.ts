import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { LanguageComponent } from './language/language.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'home/admin',component:AdminComponent},
  {path:'home/:languageName/:categoryName',component:CategoryComponent,runGuardsAndResolvers:'always'},
  {path:'home/:languageName',component:LanguageComponent,runGuardsAndResolvers:'always'},
  {path:'home/:languageName/:categoryName/:postTitle',component:PostComponent,runGuardsAndResolvers:'always'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
