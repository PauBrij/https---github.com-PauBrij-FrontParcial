import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MascotaModel } from '../../Modelos/MascotaModel';
import { ApiService } from 'src/app/Servicios/api.service';
import { MatDialogRef } from '@angular/material/dialog';

//palceholder cliente
interface cliente {
  value: number ;
  viewValue: string;
}
//placeholder dieta
interface alimento {
  value: number ;
  viewValue: string;
}

@Component({
  selector: 'app-uno',
  templateUrl: './mascotaf.component.html',
  styleUrls: ['./mascotaf.component.css']
})
export class MascotafComponent {
  private fb = inject(FormBuilder);
  MascotaForm = this.fb.group({
    Raza: ["",[Validators.required]],
    Edad: ["", Validators.required],
    Cedula: [0, Validators.required],
    Tipo: ["", Validators.required],
    Peso: ["", Validators.required],
    Genero: ["", Validators.required],
    Idalimento: [0, Validators.required],
    Cliente:["",Validators.required],
    Alimentos:["",Validators.required],

  });
 
  hasUnitNumber = false;

  infoPaciente: MascotaModel={
    Genero:"",
    Peso: "",
    Cedula: 0,
    Edad: "",
    Idalimento: 0,
    Raza: "",
    Tipo:"",
  
  }


  //placeholder for cliente 
  clientes: cliente[] = [
    {value: 1, viewValue: 'Pedro'},
    {value: 2, viewValue: 'Pablito'},
    {value: 3, viewValue: 'Alfonso'},
    {value: 4, viewValue: 'Saul'},
  ];

  //placeholder for dieta  
  Alimentos: alimento[] = [
    {value: 1, viewValue: 'Purina'},
    {value: 2, viewValue: 'Humedo'},
  ];



  constructor(public api: ApiService,private dialogRef: MatDialogRef<MascotafComponent> ){}

  onSubmit(): void {
    if(this.MascotaForm.valid){
      this.infoPaciente.Raza = this.MascotaForm.controls['Raza'].value
      this.infoPaciente.Edad = this.MascotaForm.controls['Edad'].value
      this.infoPaciente.Cedula = this.MascotaForm.controls['Cedula'].value
      this.infoPaciente.Tipo = this.MascotaForm.controls['Tipo'].value
      this.infoPaciente.Peso = this.MascotaForm.controls['Peso'].value
      this.infoPaciente.Genero = this.MascotaForm.controls['Genero'].value
      this.infoPaciente.Idalimento = this.MascotaForm.controls['Idalimento'].value
      

      this.api.post("Mascota2", this.infoPaciente).then(res=>{

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
    this.MascotaForm.reset();
  }
}
 