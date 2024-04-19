import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
     * @param {IVehicle} vehicle 
     * @returns {Observable<string>}
     */
    public createVehicle(vehicle: IVehicle): Observable<string> {
        return <Observable<string>>this.http.post(`${environment.apiEndpoint}/vehicle/`,
            { vehicle }, { headers: this.hedaers }
        ).pipe(
            catchError(error => this.errorHandler.httpHandleError(error))
        );
    }

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

    /**
     * @description:
     * @param {string} vim 
     * @returns {Observable<IVehicle>}
     */
    public getVehicleDetail(vim: string): Observable<IVehicle> {
        let params: HttpParams = new HttpParams();
        params = params.append('vim', vim);

        return <Observable<IVehicle>>this.http.get(`${environment.apiEndpoint}/vehicle/detail/`, {
            params: params,
            headers: this.hedaers
        }).pipe(
            catchError(error => this.errorHandler.httpHandleError(error))
        );
    }

    /**
     * @description:
     * @param {IVehicle} vehicle 
     * @returns {Observable<string>}
     */
    public updateVehicle(vehicle: IVehicle): Observable<string> {
        return <Observable<string>>this.http.put(`${environment.apiEndpoint}/vehicle/`,
            { vehicle }, { headers: this.hedaers }
        ).pipe(
            catchError(error => this.errorHandler.httpHandleError(error))
        );
    }

    /**
     * @description:
     * @param {string} vim
     * @returns {Observable<string>}
     */
    public updateVehicleStatus(vim: string): Observable<string> {
        return <Observable<string>>this.http.put(`${environment.apiEndpoint}/vehicle/status/`, 
            { vim }, { headers: this.hedaers }
        ).pipe(
            catchError(error => this.errorHandler.httpHandleError(error))
        );
    }

    /**
     * @description:
     * @param {string} vim 
     * @returns {Observable<string>}
     */
    public deleteVehicle(vim: string): Observable<string> {
        let params: HttpParams = new HttpParams();
        params = params.append('vim', vim);

        return <Observable<string>>this.http.delete(`${environment.apiEndpoint}/vehicle/`, {
            params: params,
            headers: this.hedaers
        }).pipe(
            catchError(error => this.errorHandler.httpHandleError(error))
        );
    }
}
