import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//gives access to common directives, ngFor, ngIf

import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        DropdownDirective
    ],
    exports: [ //making the DropdownDirective available to the outside
        CommonModule,
        DropdownDirective
    ]
})
export class SharedModule {}