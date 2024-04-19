import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IVehicle } from 'src/app/interfaces/vehicle/vehicle.interface';
import { ErrorHandler } from 'src/app/utils/error-handler';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private hedaers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json', //tipo de contenido JSON
        Accept: 'application/json', //acepta el cuerpo de la peticion JSON       
    });

    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandler
    ) { }

    /**
     * @description:
     * @returns {Observable<IVehicle[]>}
     */
    public getVehicles(): Observable<IVehicle[]> {
        return <Observable<IVehicle[]>>this.http.get(`${environment.apiEndpoint}/vehicle/`, {
            headers: this.hedaers
        }).pipe(
            catchError(error => this.errorHandler.httpHandleError(error))
        );
    }
}
