import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LanguageService } from './i18n/language.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [AppComponent, HeaderComponent, FooterComponent]
    }).compileComponents();

    TestBed.inject(LanguageService).language = 'english';
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the site title in the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header h1')?.textContent).toContain('Learning with Toma');
  });

  it('should translate the header when the language changes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.inject(LanguageService).language = 'croatian';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header label')?.textContent).toContain('Jezik');
    expect(compiled.querySelector('header h1')?.textContent).toContain('Učimo s Tomom');
  });
});
