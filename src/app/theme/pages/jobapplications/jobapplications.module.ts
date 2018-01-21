import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobapplicationsComponent } from "./jobapplications.component";
import { FormsModule } from "@angular/forms";
import { LayoutModule } from "../../layouts/layout.module";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default/default.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": JobapplicationsComponent
            }
        ]
    }
];



@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule
    ], exports: [
        RouterModule
    ],
    declarations: [
        JobapplicationsComponent
    ]
})
export class JobapplicationsModule { }
