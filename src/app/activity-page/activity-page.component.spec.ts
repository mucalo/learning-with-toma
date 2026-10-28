import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivityIconComponent } from '../activity-icon/activity-icon.component';
import { ActivityNavComponent } from '../activity-nav/activity-nav.component';
import { ACTIVITIES } from '../activities';
import { LanguageService } from '../i18n/language.service';
import { ActivityPageComponent } from './activity-page.component';

@Component({
  template: `
    <app-activity-page activity="maze" [hasWorksheet]="generated" (generate)="generated = true" (print)="printed = true">
      <div settings><div class="field"><label for="size">Size</label><input id="size" type="number" /></div></div>
      <p *ngIf="generated" class="fake-worksheet">Worksheet</p>
    </app-activity-page>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
class MazeHostComponent {
  generated = false;
  printed = false;
}

describe('ActivityPageComponent', () => {
  let fixture: ComponentFixture<MazeHostComponent>;
  let element: HTMLElement;
  let i18n: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [ActivityPageComponent, ActivityNavComponent, ActivityIconComponent, MazeHostComponent]
    }).compileComponents();

    i18n = TestBed.inject(LanguageService);
    i18n.language = 'english';
    fixture = TestBed.createComponent(MazeHostComponent);
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    i18n.language = 'english';
  });

  function buttons(): HTMLButtonElement[] {
    return Array.from(element.querySelectorAll<HTMLButtonElement>('.panel-actions button'));
  }

  it('should show the activity title, its description and why it helps', () => {
    expect(element.querySelector('h1')?.textContent).toBe('Maze');
    expect(element.querySelector('.activity-head p')?.textContent).toContain('Find the way through the maze.');
    expect(element.querySelector('.activity-head p')?.textContent).toContain(i18n.t.activityInfo.maze.benefit);
  });

  it('should put the activity\'s own fields in the settings panel, after the language', () => {
    const labels = Array.from(element.querySelectorAll('.settings-panel label')).map(label => label.textContent?.trim());
    expect(labels).toEqual(['Language', 'Size']);
  });

  it('should switch the site language from the settings panel', async () => {
    // Choosing opens the same page in that language (see LanguageService); here it just switches.
    spyOn(i18n, 'choose').and.callFake(value => (i18n.language = value));
    const select = element.querySelector('#worksheetLanguage') as HTMLSelectElement;
    await fixture.whenStable();
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(i18n.choose).toHaveBeenCalledWith('croatian');
    expect(element.querySelector('h1')?.textContent).toBe('Labirint');
  });

  it('should generate, and allow printing only once there is a worksheet', () => {
    const [generate, print] = buttons();
    expect(element.querySelector('.preview-empty')).not.toBeNull();
    expect(element.querySelector('.support-note')).toBeNull();
    expect(print.disabled).toBeTrue();

    generate.click();
    fixture.detectChanges();

    expect(element.querySelector('.fake-worksheet')).not.toBeNull();
    expect(element.querySelector('.preview-empty')).toBeNull();
    expect(element.querySelector('.support-note a')?.getAttribute('href')).toBe('/#help');
    expect(print.disabled).toBeFalse();
    print.click();
    expect(fixture.componentInstance.printed).toBeTrue();
  });

  it('should offer a second Print button below the preview once there is a worksheet', () => {
    expect(element.querySelector('.preview-actions')).toBeNull();

    buttons()[0].click();
    fixture.detectChanges();

    const second = element.querySelector<HTMLButtonElement>('.preview-actions button');
    expect(second?.textContent?.trim()).toBe('Print worksheet');
    second?.click();
    expect(fixture.componentInstance.printed).toBeTrue();
  });

  it('should bring the top of the preview into view after generating', fakeAsync(() => {
    const preview = element.querySelector('.preview') as HTMLElement;
    const scrollIntoView = spyOn(preview, 'scrollIntoView');

    buttons()[0].click();
    fixture.detectChanges();
    tick();

    expect(scrollIntoView).toHaveBeenCalledWith(jasmine.objectContaining({ block: 'start' }));
  }));

  it('should title the page with the site and activity name, in the current language', () => {
    expect(document.title).toBe('Learning with Toma - Maze');

    i18n.language = 'croatian';
    fixture.detectChanges();
    expect(document.title).toBe('Učimo s Tomom - Labirint');
  });

  it('should leave characters that are not allowed in file names out of the title while printing', () => {
    const page = fixture.debugElement.query(By.directive(ActivityPageComponent)).componentInstance as ActivityPageComponent;
    page.activity = 'where';
    fixture.detectChanges();
    expect(document.title).toBe('Learning with Toma - Where Is It?');

    window.dispatchEvent(new Event('beforeprint'));
    fixture.detectChanges();
    expect(document.title).toBe('Learning with Toma - Where Is It');

    window.dispatchEvent(new Event('afterprint'));
    fixture.detectChanges();
    expect(document.title).toBe('Learning with Toma - Where Is It?');
  });

  it('should give the page back the site title when leaving it', () => {
    fixture.destroy();
    expect(document.title).toBe('Learning with Toma');
  });

  function description(): string | null {
    return document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null;
  }

  it('should describe the page with the activity\'s description and why it helps, in the current language', () => {
    expect(description()).toBe('Find the way through the maze. Builds planning, focus and pencil control.');

    i18n.language = 'croatian';
    fixture.detectChanges();
    expect(description()).toBe(`${i18n.t.activities.maze.description} ${i18n.t.activityInfo.maze.benefit}`);
  });

  it('should give the page back the site description when leaving it', () => {
    fixture.destroy();
    expect(description()).toBe(i18n.t.footer.description);
  });

  function structuredData(): any {
    const script = document.head.querySelector('script#page-data');
    return script ? JSON.parse(script.textContent ?? '') : null;
  }

  it('should tell search engines the page is a free worksheet, one step below the home page, in the current language', () => {
    const [resource, breadcrumbs] = structuredData()['@graph'];
    expect(resource).toEqual(jasmine.objectContaining({
      '@type': 'LearningResource',
      name: 'Maze',
      url: 'https://learningwithtoma.com/maze',
      isAccessibleForFree: true,
      inLanguage: ['en', 'hr', 'sr-Latn']
    }));
    expect(breadcrumbs.itemListElement.map((item: { name: string }) => item.name)).toEqual(['Learning with Toma', 'Maze']);

    i18n.language = 'croatian';
    fixture.detectChanges();
    expect(structuredData()['@graph'][0].name).toBe('Labirint');
  });

  it('should remove the page\'s structured data when leaving it', () => {
    fixture.destroy();
    expect(structuredData()).toBeNull();
  });

  it('should show three tips and one activity from each other category to try next', () => {
    expect(element.querySelectorAll('.tips li').length).toBe(3);
    const tryNext = Array.from(element.querySelectorAll<HTMLAnchorElement>('.try-card')).map(card => card.getAttribute('href'));
    expect(tryNext).toEqual(['/spelling', '/counting', '/line', '/sequence']);
    expect(tryNext).not.toContain('/maze');
  });

  it('should have tips and a benefit for every activity in every language', () => {
    for (const option of i18n.languages) {
      i18n.language = option.value;
      for (const activity of ACTIVITIES) {
        const info = i18n.t.activityInfo[activity.key];
        expect(info.benefit).withContext(`${option.value} ${activity.key}`).toBeTruthy();
        expect(info.tips.length).withContext(`${option.value} ${activity.key}`).toBe(3);
      }
    }
  });
});
