import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlimentosModel } from '../../Modelos/AlimentosModel';
import { ApiService } from 'src/app/Servicios/api.service';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-uno',
  templateUrl: './alimentof.component.html',
  styleUrls: ['./alimentof.component.css']
})
export class AlimentofComponent {
  private fb = inject(FormBuilder);
  alimentosForm = this.fb.group({
    tipoalimento: ["",[Validators.required]],
    etapas: ["", Validators.required],
    tipoa: ["", Validators.required],
  });

  hasUnitNumber = false;

  infoAlimento: AlimentosModel={
    EtapadeCrecimiento:"",
    TipodeAlimento:"",
    TipodeAnimal:"",

  }


  constructor(public api: ApiService,private dialogRef: MatDialogRef<AlimentofComponent> ){}

  onSubmit(): void {
    if(this.alimentosForm.valid){
      this.infoAlimento.TipodeAlimento = this.alimentosForm.controls['tipoalimento'].value
      this.infoAlimento.TipodeAnimal = this.alimentosForm.controls['tipoa'].value
      this.infoAlimento.EtapadeCrecimiento = this.alimentosForm.controls['etapas'].value

      this.api.post("Alimentoes", this.infoAlimento).then(res=>{

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
    this.alimentosForm.reset();
  }
}
 