import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistroComponent } from '../registro/registro.component'
import { ToDoService } from '../../app/services/todo.service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'app-tareas',
  templateUrl: 'tareas.component.html'
})

export class TareasComponent implements OnInit {
  
  userId:any = 0;
  tareas:any = [];
  tarea:any = {};
  constructor(private _toDoService: ToDoService,
              private navCtrl : NavController,
              public navParams: NavParams,
              public toastCtrl:ToastController) { 
    this.userId = navParams.get('user_id');

    this._toDoService.obtenerTareas(this.userId).subscribe((tareas:any) => {
        if (tareas) {
          this.tareas = tareas;
        }
    });
  }
  
  ngOnInit() {}

  agregarTarea() {    
    
    if (this.tarea.tname && this.tarea.tname !== '' ) {
      this.tarea.idUser = this.userId;
      this._toDoService.registrarTarea(this.tarea).subscribe(
        (idTask:any) => {
          console.log(idTask);
          this.tarea.idTasks = idTask;
          this.tareas.push(JSON.parse(JSON.stringify(this.tarea)));
          this.tarea = {};
          this.tarea.tname = '';
        });
    } else {
      this.mostraModal();
    }
  }

  eliminarTarea(tarea, indice) {
    this._toDoService.eliminarTarea(tarea.idTasks).subscribe(
      () => {
        this.tareas.splice(indice,1);
      });
  }


  mostraModal(){
    let toast = this.toastCtrl.create({
      message: 'Debe llenar el campo nombre de la tarea',
      duration: 3000
  });
  toast.present();
  }
  
}