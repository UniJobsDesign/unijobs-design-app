import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from "./jobs.component";
import {DefaultComponent} from "../default/default.component";
import {LayoutModule} from "../../layouts/layout.module";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": JobsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        JobsComponent
    ]
})
export class JobsModule {
}