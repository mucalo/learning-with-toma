import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpellingComponent } from './spelling/spelling.component';
import { CountingComponent } from './counting/counting.component';
import { BiggestSmallestComponent } from './biggest-smallest/biggest-smallest.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'spelling', component: SpellingComponent },
  { path: 'counting', component: CountingComponent },
  { path: 'biggest-smallest', component: BiggestSmallestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
