import { Component, OnInit} from '@angular/core';

import { NgForm } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Categorie } from '../categorie.model';

@Component({
    selector:'app-categorie-create',
    templateUrl: './categorie-create.component.html',
    styleUrls:['./categorie-create.component.css']

})

export class CategorieCreateComponent implements OnInit{
  entredTitle='';  
  entredContent='';
  private mode= 'create'
  private categorieId: string
  isLoading = false
  categorie: Categorie;


  constructor(public categoriesService:CategoriesService,public route: ActivatedRoute)
{

}  

ngOnInit(){
  this.route.paramMap.subscribe((paramMap : ParamMap)=>{
  if(paramMap.has('categorieId')){
    this.mode='edit'
     this.categorieId=paramMap.get('categorieId')
     this.isLoading=true
     this.categoriesService.getCategorie(this.categorieId).subscribe(categorieData=>{
      this.isLoading=false
      this.categorie={id:categorieData._id,title: categorieData.title,content: categorieData.content}
     })
    
  }
  else{
    this.mode='create'
    this.categorieId=null

  }
  })
}
    onSaveCategorie(form: NgForm){
      if(form.invalid){
        return;
      }
      this.isLoading=true
     if(this.mode === 'create' ){
      this.categoriesService.addCategorie(form.value.title,form.value.content)  
     }
    else{
      this.categoriesService.updateCategorie(this.categorieId,form.value.title,form.value.content)

    }

     
    form.resetForm()
  }
 
}