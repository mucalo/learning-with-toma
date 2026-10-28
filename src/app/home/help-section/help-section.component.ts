import { Component, OnDestroy } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';
import { BUY_ME_A_COFFEE_URL, CONTACT_EMAIL } from '../../links';
import { SHARE_ICONS } from '../share-icons';

interface ShareNetwork {
  /** Brand name, shown in "Share on …"; brand names are not translated. */
  name: string;
  icon: string;
  /** Our own icons are drawn with holes, so they need the even-odd fill rule. */
  evenOdd?: boolean;
  color: string;
  /** Builds the share link from the encoded page URL and encoded message. */
  href: (url: string, message: string) => string;
}

const SHARE_NETWORKS: ShareNetwork[] = [
  { name: 'Facebook', icon: SHARE_ICONS.facebook, color: '#0866ff', href: url => `https://www.facebook.com/sharer/sharer.php?u=${url}` },
  { name: 'WhatsApp', icon: SHARE_ICONS.whatsapp, color: '#25d366', href: (url, message) => `https://wa.me/?text=${message}%20${url}` },
  { name: 'Viber', icon: SHARE_ICONS.viber, color: '#7360f2', href: (url, message) => `viber://forward?text=${message}%20${url}` },
  { name: 'X', icon: SHARE_ICONS.x, color: '#000000', href: (url, message) => `https://x.com/intent/post?url=${url}&text=${message}` },
  { name: 'LinkedIn', icon: SHARE_ICONS.linkedin, evenOdd: true, color: '#0a66c2', href: url => `https://www.linkedin.com/sharing/share-offsite/?url=${url}` }
];

/** "Want to help?": donate, spread the word, send feedback, share photos. Shown on the home page. */
@Component({
    selector: 'app-help-section',
    templateUrl: './help-section.component.html',
    styleUrls: ['./help-section.component.css'],
    standalone: false
})
export class HelpSectionComponent implements OnDestroy {
  readonly donateUrl = BUY_ME_A_COFFEE_URL;
  readonly contactEmail = CONTACT_EMAIL;
  readonly networks = SHARE_NETWORKS;
  readonly icons = SHARE_ICONS;
  readonly heart = 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z';
  /** The device's own share sheet (phones, some browsers), which also reaches Slack, Messenger, etc. */
  readonly canUseNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  linkCopied = false;
  private copiedTimer?: ReturnType<typeof setTimeout>;

  constructor(readonly i18n: LanguageService) {}

  /** The site's address without the in-app route, so shares always open the home page. */
  get pageUrl(): string {
    return `${window.location.origin}${window.location.pathname}`;
  }

  /** The feedback intro, split around the e-mail address so it can be rendered as a link. */
  get feedbackIntro(): [string, string] {
    const [before, after = ''] = this.i18n.t.help.feedback.intro.split('{email}');
    return [before, after];
  }

  get feedbackMailto(): string {
    return `mailto:${this.contactEmail}?subject=${encodeURIComponent(this.i18n.t.help.feedback.emailSubject)}`;
  }

  get photosMailto(): string {
    return `mailto:${this.contactEmail}?subject=${encodeURIComponent(this.i18n.t.help.photos.emailSubject)}`;
  }

  get emailShareHref(): string {
    const { message } = this.i18n.t.help.share;
    return `mailto:?subject=${encodeURIComponent(message)}&body=${encodeURIComponent(`${message}\n${this.pageUrl}`)}`;
  }

  shareHref(network: ShareNetwork): string {
    return network.href(encodeURIComponent(this.pageUrl), encodeURIComponent(this.i18n.t.help.share.message));
  }

  shareLabel(network: ShareNetwork): string {
    return this.i18n.t.help.share.shareOn.replace('{network}', network.name);
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.pageUrl);
    } catch {
      // Clipboard access can be blocked (e.g. outside HTTPS); fall back to a temporary text field.
      const field = document.createElement('textarea');
      field.value = this.pageUrl;
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }

    this.linkCopied = true;
    clearTimeout(this.copiedTimer);
    this.copiedTimer = setTimeout(() => (this.linkCopied = false), 2500);
  }

  async shareNatively(): Promise<void> {
    try {
      await navigator.share({ title: this.i18n.t.header.appTitle, text: this.i18n.t.help.share.message, url: this.pageUrl });
    } catch {
      // The user closed the share sheet; nothing to do.
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.copiedTimer);
  }
}
