import {Categorie} from './categorie.model'
import { Injectable } from '@angular/core'
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import {map } from 'rxjs/operators'
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})

export class CategoriesService{
   private categories: Categorie[]= []
   private categoriesUpdate =new Subject<Categorie[]>()

   constructor(private http: HttpClient, private router: Router){

   }

   getCategories(){
     this.http.get<{message: string, categories:any }>('http://localhost:3000/api/categories')
     .pipe(map(categorieData=>{
      return categorieData.categories.map(categorie =>{
         return {
            title:categorie.title,
            content:categorie.content,
            id:categorie._id
         }
      })
     }))
     
     .subscribe((transformedCategories)=>{
        this.categories=transformedCategories
        this.categoriesUpdate.next([...this.categories])
     })
   }

   getCategorieUpdateListener(){
      return this.categoriesUpdate.asObservable()
   }


   addCategorie(title:string, content:string){
      const categorie:Categorie = {id:null,title:title, content:content}
      this.http.post<{message: string,categorieId:string}>('http://localhost:3000/api/categories',categorie)
      .subscribe((responseData)=>{
        const id=responseData.categorieId
        categorie.id=id
         this.categories.push(categorie)
         this.categoriesUpdate.next([...this.categories]);
         this.router.navigate(["/"])
      })
      
   }

   deleteCategorie(categorieId : string){
      this.http.delete('http://localhost:3000/api/categories/' + categorieId).subscribe(()=>{
       const updatedPosts=this.categories.filter(categorie=>categorie.id !== categorieId) 
       this.categories=updatedPosts
       this.categoriesUpdate.next([...this.categories])
      
      })
      
   }

  getCategorie(id: string){
     return this.http.get<{_id:string,title: string , content: string}>("http://localhost:3000/api/categories/" + id)
    
  }
   

  updateCategorie(id: string , title : string , content : string){
     const categorie : Categorie =  { id : id, title : title , content : content}
     this.http.put("http://localhost:3000/api/categories/" + id, categorie)
     .subscribe(response=> {
        const updatedCategories=[...this.categories]
        const oldCategorieIndex=updatedCategories.findIndex(p=>p.id===categorie.id)
        updatedCategories[oldCategorieIndex]=categorie
        this.categories=updatedCategories
        this.router.navigate(["/"])
      })
     
   }
  
   
}

// rLNdMvxOHbniebO9 mongodb password
//current @ip : 102.105.199.34