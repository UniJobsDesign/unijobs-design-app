import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DefaultComponent} from "../default/default.component";
import {ReviewComponent} from "./review.component";
import {LayoutModule} from "../../layouts/layout.module";
import {FormsModule} from "@angular/forms";
import {WidgetsSummernoteModule} from "../default/components/forms/widgets/widgets-summernote/widgets-summernote.module";


const routes: Routes = [
  {
    "path": "",
    "component": DefaultComponent,
    "children": [
      {
        "path": "",
        "component": ReviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,  RouterModule.forChild(routes), LayoutModule, FormsModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [ReviewComponent]
})
export class ReviewModule { }
