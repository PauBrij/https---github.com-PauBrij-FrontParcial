import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/Servicios/api.service';
import { AlimentofComponent } from '../../Formularios/alimentof/alimentof.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-alimentos',
  templateUrl: './alimento.component.html',
  styleUrls: ['./alimento.component.css']
})

export class AlimentoComponent implements OnInit {
  title="Alimentos"
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any>
  constructor(public api: ApiService, public dialog: MatDialog){
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void{
    this.api.Get("Alimentoes").then((res)=>{
      for (let index = 0; index < res.length; index++) {
        this.loadtable([res[index]])
        
      }
     this.dataSource.data=res
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
    })
   }

  loadtable(data: any[]){
    this.displayedColumns= [];
    for (let column in data[0]) {
      this.displayedColumns.push(column);
      }
    this.displayedColumns.push('Acciones');
  }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(){
    this.dialog.open(AlimentofComponent,{
      
    });
  }

  
}
