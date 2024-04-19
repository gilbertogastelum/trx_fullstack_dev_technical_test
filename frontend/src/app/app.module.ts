import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


// Prime Ng
import { ToastModule } from "primeng/toast";
import { DockModule } from "primeng/dock";
import { DividerModule } from "primeng/divider";
import { AvatarModule } from "primeng/avatar";
import { MenuModule } from "primeng/menu";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogService } from 'primeng/dynamicdialog';

//Providers
import { ConfirmationService, MessageService } from "primeng/api";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        //PrimeNg
        
    ],
    providers: [
        MessageService,
        ConfirmationService,
        DialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
