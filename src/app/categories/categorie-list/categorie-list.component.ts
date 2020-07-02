import { Component ,Input, OnInit, OnDestroy} from '@angular/core';
import {Categorie} from '../categorie.model'
import {CategoriesService} from '../categories.service'
import {Subscription} from 'rxjs'


import {fabric} from 'fabric';

@Component({
    selector:'app-categorie-list',
    templateUrl:'./categorie-list.component.html',
    styleUrls: ['./categorie-list.component.css']

})
export class CategorieListComponent implements OnInit, OnDestroy{

  //  posts=[
  //      {title:'first post', content:'this first post '},

  //      {title:'second post', content:'this second post '},
  //      {title:'third post', content:'this third post '},
  //      ]
  categories:Categorie[]=[]
  isLoading = false
  private categoriesSub: Subscription
  canvas: any;
  constructor(public categoriesService:CategoriesService){

  }

  ngOnInit(){
    this.isLoading=true
    this.categoriesService.getCategories();
     this.categoriesSub= this.categoriesService.getCategorieUpdateListener()
     .subscribe((categories:Categorie[])=>{
      this.isLoading=false
       this.categories=categories
     })
     
}



onDelete(categorieId: string){
  this.categoriesService.deleteCategorie(categorieId)
  }

ngOnDestroy(){
  this.categoriesSub.unsubscribe()
}




}