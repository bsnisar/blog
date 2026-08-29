/**
 * One source of truth for where I am elsewhere. The footer lists all of it;
 * the follow prompts name only the two accounts worth following for the
 * writing itself.
 */

export type SocialLink = {
  href: string;
  label: string;
  handle: string;
  /** Shown in the follow prompts. GitHub is footer-only. */
  follow: boolean;
};

export const SOCIAL: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/bsnisar/",
    label: "LinkedIn",
    handle: "in/bsnisar",
    follow: true,
  },
  {
    href: "https://x.com/BSnisar",
    label: "X",
    handle: "@BSnisar",
    follow: true,
  },
  {
    href: "https://github.com/bsnisar",
    label: "GitHub",
    handle: "bsnisar",
    follow: false,
  },
];

export const FOLLOW_LINKS = SOCIAL.filter((link) => link.follow);
