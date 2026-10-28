# Cloudflare Web Analytics for Learning with Toma

The site counts its visitors with **Cloudflare Web Analytics**. It uses **no cookies** and
doesn't identify anyone, so the site needs no cookie banner.

## What it shows, and what it doesn't

| You can see | You can't see |
|---|---|
| **Visits**: how often someone arrives at the site from elsewhere (Google, a shared link, typing the address) | How many *different* people came: someone who comes back tomorrow counts as a second visit |
| **Page views**: every page shown, including moving between pages inside the site | Clicks on **Generate** or **Print**: Cloudflare doesn't support counting clicks (yet) |
| **Which pages**: each activity in each language, e.g. `/maze`, `/hr/labirint`, `/sr/lavirint` | Anything about who the visitor is |
| **Where from**: country, the site that linked to you, device, browser, operating system | |

The numbers are **lower than reality**: ad blockers and some privacy settings block the counter.
Treat them as trends ("Maze is opened more than Trace"), not exact counts.

## Where to find the numbers

1. Log in to Cloudflare and open **Web Analytics**:
   **https://dash.cloudflare.com/?to=/:account/web-analytics**
   (the link works wherever the menu puts it).
2. Click **learningwithtoma.com** in the list.
3. Pick the period at the top (e.g. *Last 7 days*).

You'll see Visits and Page views at the top, and lists below them: **Path** (which pages),
**Country**, **Referer** (which sites sent people), **Device type**, **Browser** and
**Operating system**.

### Useful questions and how to answer them

| I want to know… | Look at… |
|---|---|
| How many visits this month? | **Visits**, with the period set to the last 30 days |
| Which activities are opened most? | The **Path** list |
| How popular is one activity in all languages? | Filter **Path** for each address, e.g. `/maze`, `/hr/labirint` and `/sr/lavirint` (the full list of addresses is in `src/app/activities.ts`) |
| How many Croatian or Serbian visitors? | **Path** starting with `/hr` or `/sr`, or the **Country** list |
| Where do visitors come from? | The **Referer** list (e.g. google.com, facebook.com, a parenting forum) |

Clicking an entry in a list filters the whole page by it; remove the filter at the top.

## How it's set up in the code

- A small script at the end of `src/index.html` loads Cloudflare's counter, **only on
  learningwithtoma.com**, so testing on your own computer isn't counted.
- The site token in it (`84d8d357…`) isn't secret: it is in every page's public HTML anyway.
- To stop counting, delete that script and deploy.

## If you later want to count Generate and Print clicks

Cloudflare can't do it. Cookie-free tools that can, each with a script tag plus a few lines in
the Generate and Print buttons:

- **GoatCounter**: free for small non-commercial sites, very simple.
- **Umami**: free cloud plan, nicer reports for clicks and their details (activity, language).
- **Plausible**: the most polished, paid.
