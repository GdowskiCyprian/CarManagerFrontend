import {Router} from "@angular/router";
import {ClientServiceService} from "../client-service.service";
import {Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-client-my-repairs',
  templateUrl: './client-my-repairs.component.html',
  styleUrls: ['./client-my-repairs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientMyRepairsComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort = new MatSort();
  @ViewChildren('innerSort') innerSort: QueryList<MatSort> = new QueryList<MatSort>();
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<RepairPart>> = new QueryList<MatTable<RepairPart>>();

  allRepairs : any;
  currentClient:any;
  email:string | null = '';
  // displayedColumns: string[] = ['Name', 'Date', 'Description'];

  //fancy table
  dataSource: any;
  usersData: Repair[] = [];
  columnsToDisplay = ['name', 'date', 'description'];
  innerDisplayedColumns = ['name', 'description', 'price'];
  expandedElement: any;

  constructor(public router:Router, private service:ClientServiceService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.service.isLoggedIn()) {
      this.router.navigate(["/login"]);
      return;
    } else {

      if (sessionStorage.getItem('username') != null) {
        this.email = sessionStorage.getItem('username');
      } else {
        this.email = "Developer";
      }
    }
    let resp = this.service.getCurrentClient();
    resp.subscribe(data => {this.currentClient = data
      let resp1 = this.service.getCurrentRepairs(this.currentClient.idClient);
      resp1.subscribe(data => {this.dataSource = data
      });
    });

  }
  logout(){
    this.service.logout();
  }
  toggleRow(element: Repair) {
    element.repairParts && Object.keys(element.repairParts as MatTableDataSource<RepairPart>).length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;

    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<RepairPart>).sort = this.innerSort.toArray()[index]);
  }

}
export interface Repair {
  idRepair: number;
  name: string;
  date: string;
  description: string;
  repairParts?: RepairPart[] | MatTableDataSource<RepairPart>;
}

export interface RepairPart {
  idRepairPart: number;
  name: string;
  description: string;
  price: number;
}
