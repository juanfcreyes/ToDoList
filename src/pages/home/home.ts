import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ToDoService } from '../../app/services/todo.service';


import { RegistroComponent } from '../registro/registro.component'
import { TareasComponent } from '../tareas/tareas.component'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  usuario:any = {};
  constructor(public navCtrl: NavController,
      private _toDoService: ToDoService,
      public toastCtrl: ToastController) {
  }

  irARegistro() : void {
    this.navCtrl.push(RegistroComponent);
  }

  login() {
   
    this._toDoService.logearUsuario(this.usuario).subscribe(
        (data:any) => {
          console.log(data);
          if (!data) {
            let toast = this.toastCtrl.create({
              message: 'Credenciales no pertenecen a ningun usuario',
              duration: 3000
            });
            toast.present();
          } else {
            this.usuario.uEmail = '';
            this.usuario.uPassword = '';
            this.navCtrl.push(TareasComponent, {
              user_id: data.idUsers
            });
          }
          
         
        }  
    );
}

}
