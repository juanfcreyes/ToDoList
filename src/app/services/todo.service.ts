import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ToDoService {

    urlUsuario:string = 'http://localhost:8100/ToDoList/webresources/users';
    urlTarea:string = 'http://localhost:8100/ToDoList/webresources/tasks';
    
    constructor(public http:HttpClient ) { }

    private getHeaders() {
        return new HttpHeaders({
          'Content-type': 'aplication/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
        });
      }
    
    registrarUsuario(usuario:any) {
        let url = `${this.urlUsuario}/registrar/${usuario.uEmail}/${usuario.uPassword}`
        return this.http.get( url,  { headers: this.getHeaders() });
    }

    logearUsuario(usuario:any) {
        let url = `${this.urlUsuario}/login/${usuario.uEmail}/${usuario.uPassword}`
        return this.http.get( url, { headers: this.getHeaders() })
            .map( res => {
             return res;
            });
    }

    registrarTarea(tarea:any) {
        let url = `${this.urlTarea}/registrar/${tarea.tname}/${tarea.idUser}`
        return this.http.post( url, { headers: this.getHeaders() });
    }

    obtenerTareas(id_user:any) {
        let url = `${this.urlTarea}/usuario/${id_user}`
        return this.http.get( url, { headers: this.getHeaders() });
    }

    eliminarTarea(id_tarea){
        let url = `${this.urlTarea}/${id_tarea}`
        return this.http.delete( url, { headers: this.getHeaders() });

    }

}