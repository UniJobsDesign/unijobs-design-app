import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default/default.component";
import { LayoutModule } from "../../layouts/layout.module";
import { FormsModule } from "@angular/forms";
import { CandidatesComponent } from "./candidates.component";



const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CandidatesComponent
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
        CandidatesComponent
    ]
})
export class CandidatesModule { }
