import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientServiceService} from "../client-service.service";

@Component({
  selector: 'app-edit-car-dialog',
  templateUrl: './edit-car-dialog.component.html',
  styleUrls: ['./edit-car-dialog.component.css']
})
export class EditCarDialogComponent{

  constructor(public dialogRef: MatDialogRef<EditCarDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public service:ClientServiceService)
  { }

  saveChanges(){
      this.service.putCar(this.data.idCar,this.data.manufacturer, this.data.model, this.data.version, this.data.power, this.data.mileage, this.data.yearOfManufacture, this.data.displacement, this.data.idClient);
      this.dialogRef.close();
  }
}
