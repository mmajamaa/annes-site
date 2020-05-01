import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [SnackBarComponent,
    ],
    imports: [MaterialModule, FlexLayoutModule],
    exports: [MaterialModule, FlexLayoutModule]
})
export class SharedModule { }