import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { HomeComponent } from './home/home.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';

//PrimeNg
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
//Routing
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [
        //Components
        HomeComponent,
        VehicleDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        //PrimeNg
        CardModule,
        TableModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        TooltipModule,
        DividerModule,
        LeafletModule,
        //Routing
        HomeRoutingModule
    ]
})
export class HomeModule { }
