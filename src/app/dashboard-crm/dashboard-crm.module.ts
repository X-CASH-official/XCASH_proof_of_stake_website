import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCrmComponent } from './dashboard-crm.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';



export const appRoutes: Routes = [
    { path: '', component: DashboardCrmComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FlexLayoutModule,
    MatCardModule,
    DashboardWidgetModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [DashboardCrmComponent],
  exports: [ ]
})
export class DashboardCrmModule { }
