import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";
import { GlobalErrorHandler } from "./_services/error-handler.service";
import {JobsService} from "./auth/_services/jobs.service";
import { FormsModule } from '@angular/forms';
import {RequestService} from "./auth/_services/request.service";


@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent,
    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        AuthModule,
        FormsModule
    ],
    providers: [ScriptLoaderService, { provide: ErrorHandler, useClass: GlobalErrorHandler }, JobsService,RequestService],
    bootstrap: [AppComponent]
})
export class AppModule { }