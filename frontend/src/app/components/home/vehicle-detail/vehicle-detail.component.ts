import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { IVehicle } from 'src/app/interfaces/vehicle/vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

@Component({
    selector: 'app-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {




    constructor(
        private config: DynamicDialogConfig,
        private vehicleService: VehicleService,
        private ref: DynamicDialogRef
    ) {}


    ngOnInit(): void {
        if ( this.config.data.vehicle.vim ) {
            this.getVehicleDetail(this.config.data.vehicle.vim);
        }
    }

    /**
     * @description:
     * @param {string} vim
     */
    private getVehicleDetail(vim: string): void {
        this.vehicleService.getVehicleDetail(vim).pipe(
            finalize(() => console.log("object"))
        ).subscribe({
            next: (response: IVehicle) => {
                console.log(response);
            }
        });
    }
}
