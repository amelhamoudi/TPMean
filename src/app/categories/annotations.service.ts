import {Annotation} from './annotation.model'
import { Injectable } from '@angular/core'
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import {map } from 'rxjs/operators'
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})

export class CategoriesService{
   private annotations: Annotation[]= []
   private annotationsUpdate =new Subject<Annotation[]>()

   constructor(private http: HttpClient, private router: Router){

   }


   getAnnotations(){
     this.http.get<{message: string, annotations:any }>('http://localhost:3000/api/annotations')
     .pipe(map(annotationData=>{
      return annotationData.annotations.map(annotation =>{
         return {
            type:annotation.type,
            width:annotation.width,
            height:annotation.height,
            left:annotation.left,
            top:annotation.top,
            angle:annotation.angle,
            fill:annotation.fill,
            id:annotation._id
         }
      })
     }))
     
     .subscribe((transformedAnnotations)=>{
        this.annotations=transformedAnnotations
        this.annotationsUpdate.next([...this.annotations])
     })
   }

   getAnnotationUpdateListener(){
      return this.annotationsUpdate.asObservable()
   }


   addAnnotation( type:string,width: number,height:number,left:number,top:number,angle:number,fill:string){
      const annotation:Annotation = {id:null,type:type,width:width,height:height,left:left, top:top, angle:angle, fill:fill }
      this.http.post<{message: string,annotationId:string}>('http://localhost:3000/api/annotations',annotation)
      .subscribe((responseData)=>{
        const id=responseData.annotationId
         annotation.id=id
         this.annotations.push(annotation)
         this.annotationsUpdate.next([...this.annotations]);
         this.router.navigate(["/"])
      })
      
   }

  
  getAnnotation(id: string){
     return this.http.get<{_id:string,type:string,width: number,height:number,left:number,top:number,angle:number,fill:string}>("http://localhost:3000/api/annotations/" + id)
    
  }
   

  
  
   
}

// rLNdMvxOHbniebO9 mongodb password
//current @ip : 102.105.199.34