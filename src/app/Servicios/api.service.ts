import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public api: HttpClient) { }
  Url="https://localhost:7254/api/";
    //get
  public async Get(controller:string){
    var result:any
    
   await this.api.get(this.Url+controller).toPromise().then((res=>{
    console.log(res)
    result=res
  }))
   
  return result;
  }

  //post
  public async post(controller: string, body:any){
    return await this.api.post(this.Url+controller, body).subscribe((res)=>{});
  }

  //delete
  public async delete(controller:string, Id:string){
    return this.api.delete(this.Url+controller+"/"+Id);
  }

  //create
  public async create(controller:string, body:any){
    return this.api.post(this.Url+controller, body);
  }

  //update
  public async update(controller:string, id:string, body:any){
    return this.api.put(this.Url+controller+"/"+id, body);  
  }

  

}
