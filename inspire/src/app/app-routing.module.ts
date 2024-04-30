import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMentor } from './modules/mentor/pages/layout/layout-mentor-component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/modules/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'mentors',
    loadChildren: () =>
      import('./modules/students/students.module').then(
        (m) => m.StudentsModule
      ),
  },
  {
    path: 'mentor',
    loadChildren: () =>
      import('./modules/mentor/mentor.module').then((m) => m.MentorModule),
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./modules/auth/modules/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  { path: 'layout', component: LayoutMentor },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
