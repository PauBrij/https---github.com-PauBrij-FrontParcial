import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/Servicios/api.service';
import { ClientefComponent } from '../../Formularios/clientef/clientef.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements  OnInit {
  title="Dueños"
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>
  constructor(public api: ApiService, public dialog: MatDialog){
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void{
    this.api.Get("Cliente2").then((res)=>{
      for (let index = 0; index < res.length; index++) {
        this.loadtable([res[index]])
        
      }
     this.dataSource.data=res
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
    })
   }

  loadtable(data:any){
    this.displayedColumns=[];
    for (let column in data[0]) {
      this.displayedColumns.push(column)
      
    }
    this.displayedColumns.push('Acciones');
  }


  openDialog(){
    this.dialog.open(ClientefComponent,{
      
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
