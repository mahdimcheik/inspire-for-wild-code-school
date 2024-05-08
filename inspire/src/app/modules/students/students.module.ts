import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ListMentorsComponent } from './pages/list-mentors/list-mentors.component';
import { CardMentorComponent } from './components/features/card-mentor/card-mentor.component';
import { ChipComponent } from '../shared-components/chip/chip.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    ListMentorsComponent,
    CardMentorComponent,
    StudentLayoutComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedComponentsModule,
    HttpClientModule
  ]
})
export class StudentsModule { }
