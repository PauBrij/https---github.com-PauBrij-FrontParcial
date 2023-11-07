import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteModel } from '../../Modelos/ClienteModel';
import { ApiService } from 'src/app/Servicios/api.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-uno',
  templateUrl: './clientef.component.html',
  styleUrls: ['./clientef.component.css']
})
export class ClientefComponent {
  private fb = inject(FormBuilder);
  usuarioForm = this.fb.group({
    cedula: ["",[Validators.required]],
    nombre : ["", Validators.required],
    apellido: ["", Validators.required],
    direccion: ["", Validators.required],
    telefono: ["", [Validators.required]],
  });

  hasUnitNumber = false;

  infoUsuario: ClienteModel={
    Nombre:"",
    Apellido:"",
    Direccion:"",
    Telefono:"",
    Cedula:""
  }

  constructor(public api: ApiService,private dialogRef: MatDialogRef<ClientefComponent> ){}

  onSubmit(): void {
    if(this.usuarioForm.valid){
      this.infoUsuario.Nombre = this.usuarioForm.controls['nombre'].value
      this.infoUsuario.Apellido = this.usuarioForm.controls['apellido'].value
      this.infoUsuario.Cedula = this.usuarioForm.controls['cedula'].value
      this.infoUsuario.Direccion = this.usuarioForm.controls['direccion'].value
      this.infoUsuario.Telefono = this.usuarioForm.controls['telefono'].value

      this.api.post("Cliente2", this.infoUsuario).then(res=>{

        if(res != null){
        Swal.fire( 
          'Guardado con exito',
          '',
          'success'
          )
          this.dialogRef.close();
        }else{
          Swal.fire( 
            'Ingrese los datos correctamente',
            '',
            'error'
            )
        }
      })

    }else{
      Swal.fire(
      'Ingrese los datos requeridos',
      'Intente nuevamente',
      'error'
    )
    }
    this.usuarioForm.reset();
  }
}
 