import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    public visible: BehaviorSubject<boolean>

    private _cargando: BehaviorSubject<boolean>;

    constructor() {
        this.visible = new BehaviorSubject<boolean>(false);
        this._cargando = new BehaviorSubject<boolean>(false);
    }

    mostrar() {
        this.visible.next(true);
    }

    ocultar() {
        this.visible.next(false);
    }

    public set cargando(value: boolean) {
        this._cargando.next(value);
    }

    public get cargando(): boolean {
        return this._cargando.getValue();
    }

    public get cargando$(): Observable<boolean> {
        return this._cargando.asObservable();
    }

}