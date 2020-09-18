import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/components/home/home.component';
import { LogFormComponent } from 'src/app/components/log-form/log-form.component';
import { LogsComponent } from 'src/app/components/logs/logs.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "logs", component: LogFormComponent, },
  { path: "logs", component: LogsComponent , outlet: "logslist" },
  { path: "**", component: HomeComponent }
]; 

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
