import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpellingComponent } from './spelling/spelling.component';
import { CountingComponent } from './counting/counting.component';
import { BiggestSmallestComponent } from './biggest-smallest/biggest-smallest.component';
import { SequenceComponent } from './sequence/sequence.component';
import { IntruderComponent } from './intruder/intruder.component';
import { LineComponent } from './line/line.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'spelling', component: SpellingComponent },
  { path: 'counting', component: CountingComponent },
  { path: 'biggest-smallest', component: BiggestSmallestComponent },
  { path: 'sequence', component: SequenceComponent },
  { path: 'intruder', component: IntruderComponent },
  { path: 'line', component: LineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
