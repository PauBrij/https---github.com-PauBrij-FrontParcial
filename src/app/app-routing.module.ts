import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaComponent } from './Componets/mascota/mascota.component';
import { ClienteComponent } from './Componets/cliente/cliente.component';
import { AlimentoComponent } from './Componets/alimento/alimento.component';

const routes: Routes = [
  {path:"Mascotas", component:MascotaComponent},
  {path:"Cliente", component:ClienteComponent},
  {path:"Alimento", component:AlimentoComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
