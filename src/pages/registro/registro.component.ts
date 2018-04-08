import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToDoService } from '../../app/services/todo.service';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'app-registro',
  templateUrl: 'registro.component.html'
})

export class RegistroComponent implements OnInit { 
  
    usuario:any = {};
    constructor(private navCtrl : NavController,
        private _toDoService: ToDoService,
        public toastCtrl: ToastController) {
    }
  
    ngOnInit() {}

    registrarse() {
        this.usuario.idUsers = null;
        this.usuario.ufechaCreacion = new Date();
        this._toDoService.registrarUsuario(this.usuario).subscribe(
            (data:any) => {

                if(data === 1){
                    this.mostrarModal('Ya existe un usuario registrado con el correo ingreasdo');
                } else {
                    this.mostrarModal('Usuario registrado con exito');
                    this.navCtrl.pop();
                }    
            }  
        );
    }

    mostrarModal(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

}