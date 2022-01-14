import {Router} from "@angular/router";
import {DataServiceService} from "../data-service.service";
import {Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {Repair, RepairPart} from "../client-my-repairs/client-my-repairs.component";

@Component({
  selector: 'app-repair-shop-my-repairs',
  templateUrl: './repair-shop-my-repairs.component.html',
  styleUrls: ['./repair-shop-my-repairs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RepairShopMyRepairsComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort = new MatSort();
  @ViewChildren('innerSort') innerSort: QueryList<MatSort> = new QueryList<MatSort>();
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<RepairPart>> = new QueryList<MatTable<RepairPart>>();

  email:string | null = 'Your Email';
  currentRepairShop : any;

  dataSource: any;
  columnsToDisplay = ['name', 'date', 'description', 'delete', 'edit'];
  innerDisplayedColumns = ['name', 'description', 'price', 'delete', 'edit'];
  expandedElement: any;

  constructor(public router:Router, private service:DataServiceService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void
  {
    if(!this.service.isLoggedIn())
    {
      this.router.navigate(["/login"]);
      return;
    }
    else
    {

      if (sessionStorage.getItem('username') != null) {
        this.email = sessionStorage.getItem('username');
      } else {
        this.email = "Developer";
      }


    }
    let resp = this.service.getCurrentRepairShop();
    resp.subscribe(data => {this.currentRepairShop = data,
    this.email = this.currentRepairShop.name;
      let resp1 = this.service.getCurrentRepairs(this.currentRepairShop.idRepairShop);
    resp1.subscribe(data => {this.dataSource = data});
    })
  }

  logout(){
    this.service.logout();
  }
  toggleRow(element: Repair) {
    element.repairParts && Object.keys(element.repairParts as MatTableDataSource<RepairPart>).length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;

    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<RepairPart>).sort = this.innerSort.toArray()[index]);
  }

  deleteRepairPart(id:number){
    window.location.reload();
    this.service.deleteRepairPart(id);

  }
  deleteRepair(id:number){
    window.location.reload();
    this.service.deleteRepair(id);
  }
  editRepair(id:number){}
  editRepairPart(id:number){}

}
