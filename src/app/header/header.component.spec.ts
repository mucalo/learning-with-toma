import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { LanguageService } from '../i18n/language.service';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [HeaderComponent]
    }).compileComponents();

    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('should link each menu item to its home page section', () => {
    const links = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('.menu-link'));
    expect(links.map(link => link.textContent?.trim())).toEqual(['Activities', 'About']);
    expect(links[0].getAttribute('href')).toBe('/#activities');
    expect(links[1].getAttribute('href')).toBe('/#about');
  });
});
