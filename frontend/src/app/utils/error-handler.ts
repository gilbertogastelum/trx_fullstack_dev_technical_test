import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { SpinnerService } from "../services/common/spinner.service";

@Injectable({
    providedIn: 'root',
})
export class ErrorHandler {
    constructor(
        private spinnerService: SpinnerService
    ){}

    public httpHandleError(error: HttpErrorResponse): Observable<never> {
        this.spinnerService.cargando = false;
        this.spinnerService.ocultar();
        if ( error instanceof HttpErrorResponse && ( error.status === 400 || error.status === 404 ) ) {
            console.log(error.error);
            return EMPTY;
        } else {
            console.log('Hubo un problema con el servidor.');
            return EMPTY;
        }
    }
}

