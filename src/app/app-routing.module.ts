import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorieListComponent } from './categories/categorie-list/categorie-list.component';
import { CategorieCreateComponent } from './categories/categorie-create/categorie-create.component'
import {AnnotationCreateComponent} from './annotation/annotation-create.component'


const routes: Routes = [
 { path: '', component: CategorieListComponent},
  { path: 'create', component: CategorieCreateComponent},
  { path: 'edit/:categorieId', component: CategorieCreateComponent},
  {path : 'annotation' , component: AnnotationCreateComponent}
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
