import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpellingComponent } from './spelling/spelling.component';
import { HomeComponent } from './home/home.component';
import { CountingComponent } from './counting/counting.component';
import { BiggestSmallestComponent } from './biggest-smallest/biggest-smallest.component';
import { WorksheetComponent } from './worksheet/worksheet.component';
import { SequenceComponent } from './sequence/sequence.component';
import { IntruderComponent } from './intruder/intruder.component';
import { LineComponent } from './line/line.component';
import { ShadowComponent } from './shadow/shadow.component';
import { MazeComponent } from './maze/maze.component';
import { WhereComponent } from './where/where.component';
import { CopyPatternComponent } from './copy-pattern/copy-pattern.component';
import { EmphasisPipe } from './i18n/emphasis.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SpellingComponent,
    HomeComponent,
    CountingComponent,
    BiggestSmallestComponent,
    WorksheetComponent,
    SequenceComponent,
    IntruderComponent,
    LineComponent,
    ShadowComponent,
    MazeComponent,
    WhereComponent,
    CopyPatternComponent,
    EmphasisPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
