import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscriber, finalize } from 'rxjs';
import { IVehicle } from 'src/app/interfaces/vehicle/vehicle.interface';
import { SpinnerService } from 'src/app/services/common/spinner.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import * as L from 'leaflet';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VehicleDetailComponent } from '../vehicle-detail/vehicle-detail.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public loading: boolean;
    public frmVehicle: FormGroup;
    private vehicleDetailModal: DynamicDialogRef;

    public vehicles: IVehicle[] = [];
    public selectedVehicle: IVehicle

    map: L.Map | any;

    public options: any = {
        layers: [
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    maxZoom: 18,
                    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
                })
        ],
        zoom: 4.5,
        center: L.latLng(23.900951, -100.257249)
    };


    constructor(
        private vehicleService: VehicleService,
        private spinnerService: SpinnerService,
        private dialogService: DialogService
    ) {

    }

    // controles extra para el mapa: Botón para saltar a ubicación actual
    public customControl = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd(): any {

            let container = L.DomUtil.create('input', 'leaflet-bar leaflet-control leaflet-control-custom');
            container.type = 'button';
            container.style.backgroundColor = 'white';
            container.style.width = '30px';
            container.style.height = '30px';

            container.onclick = function () {
                // TODO: saltar a ubicación actual
            }
            return container;
        }
    });

    // cuando el mapa ya está cargado en la página
    public onMapReady(map: L.Map) {
        console.log(map);
        this.map = map;
        L.control.scale().addTo(this.map);
        this.map.addControl(new this.customControl());
    }

    ngOnInit(): void {
        this.getVehicles();
    }

    public createVehicle(): void {
        let vehicle: IVehicle;


        this.spinnerService.mostrar();

        this.vehicleService.createVehicle(vehicle).pipe(
            finalize(() => this.spinnerService.ocultar())
        ).subscribe({
            next: (response: string) => {
                console.log(response);
            }
        });
    }

    private getVehicles(): void {
        this.spinnerService.mostrar();
        this.vehicleService.getVehicles().pipe(
            finalize(() => this.spinnerService.ocultar())
        ).subscribe({
            next: (response: IVehicle[]) => {
                this.vehicles = response;
            }
        });
    }

    public updateVehicleStatus(vim: string): void {
        this.spinnerService.mostrar();
        this.vehicleService.updateVehicleStatus(vim).pipe(
            finalize(() => this.spinnerService.ocultar())
        ).subscribe({
            next: (response: string) => {
                console.log(response);
            }
        });
    }

    public deleteVehicle(vim: string): void {
        this.spinnerService.mostrar();
        this.vehicleService.deleteVehicle(vim).pipe(
            finalize(() => this.spinnerService.ocultar())
        ).subscribe({
            next: (response: string) => {
                console.log(response);
            }
        });
    }

    /**
     * @description:
     * @param {IVehicle} vehicle 
     */
    public openVehicleDetail(vehicle?: IVehicle): void {
        this.vehicleDetailModal = this.dialogService.open(VehicleDetailComponent , {
            header:  '#$#$$$#$#$#$#$#$#$',
            width: '70%',
            contentStyle: {
                "overflow": "auto",
                "border-bottom-right-radius": "20px",
                "border-bottom-left-radius": "20px"
            },
            baseZIndex: 100000,
            data: {
                vehicle
            }
        });
        this.vehicleDetailModal.onClose.subscribe((res) => {
            if ( res ) {
                this.getVehicles();
            }
            this.vehicleDetailModal.destroy();
        })
    }

}
