import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { blocksfoundComponent } from './blocksfound/blocksfound.component';
import { voterslistComponent } from './voterslist/voterslist.component';
import { voterstatisticsComponent } from './voterstatistics/voterstatistics.component';

const materialWidgetRoutes: Routes = [
        { path: 'blocksfound', component: blocksfoundComponent , data: { animation: 'fixed' }},
        { path: 'voterslist', component: voterslistComponent , data: { animation: 'fixed' }},
        { path: 'voterstatistics', component: voterstatisticsComponent , data: { animation: 'fixed' }},
];

@NgModule({
  imports: [
    RouterModule.forChild(materialWidgetRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class TablesRouterModule {}