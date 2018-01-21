import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GuestJobsComponent } from "./guest_jobs_component";
import { FormsModule } from "@angular/forms";
import { LayoutModule } from "../../theme/layouts/layout.module";
import { DefaultComponent } from "../../theme/pages/default/default.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": GuestJobsComponent
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
        GuestJobsComponent
    ]
})
export class GuestJobsModule {
}