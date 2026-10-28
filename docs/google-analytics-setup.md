# Google Analytics for Learning with Toma: the step-by-step guide

This guide shows you how to see:

1. **how many people visit** learningwithtoma.com,
2. **how many people click Generate**, and on which activity,
3. **how many people click Print**, and on which activity.

The work is split between **you** (clicking around in Google Analytics, about 15 minutes)
and **the code** (Claude adds a few lines to the site once you have your ID). Every step
says who does it.

---

## Before you start: the cookie question (read this, it matters)

Google Analytics stores cookies in visitors' browsers. The site is aimed at families in
Croatia and Serbia, and EU rules (GDPR and the ePrivacy rules) say that **you need the
visitor's permission before setting analytics cookies**. In practice that means a
**cookie banner** ("Accept / Decline"), and Google Analytics only runs after "Accept".

What that means for you:

- The site needs a small cookie banner in all three languages. Claude can build it to
  match the site.
- Your numbers will be **lower than reality**, because many people click "Decline" or
  ignore the banner. Treat the numbers as trends ("Maze is more popular than Trace"), not
  exact counts.
- You need a short **privacy note** on the site saying you use Google Analytics.

*(This is the common understanding of the rules, not legal advice.)*

**The alternative:** cookie-free analytics tools such as **GoatCounter** (free for small,
non-commercial sites), **Plausible** (paid) or **Cloudflare Web Analytics** (free) count
visits and button clicks **without cookies**, so you don't need a banner, and you see
almost every visit. They're simpler than Google Analytics, but they easily cover the three
things you want to know.

👉 **Decide this first.** If you still want Google Analytics, carry on below.

---

## Part 1: Create your Google Analytics account (you)

You need a Google account (a Gmail address works).

1. Go to **https://analytics.google.com** and sign in.
2. Click **Start measuring**.
3. **Account name:** type `Learning with Toma`. Leave the checkboxes as they are.
   Click **Next**.
4. **Property name:** type `learningwithtoma.com`.
   - **Reporting time zone:** Croatia (or wherever you are).
   - **Currency:** Euro. (It doesn't matter, nothing is being sold.)
   - Click **Next**.
5. **Business details:** pick any category (e.g. *Education*) and the size *Small*.
   Click **Next**.
6. **Business objectives:** tick **Understand web and/or app traffic**.
   Click **Create**.
7. Accept the **terms of service** (choose your country first, then tick the boxes).

## Part 2: Connect the website (you)

You'll now see **"Start collecting data"**.

1. Choose the platform **Web**.
2. **Website URL:** choose `https://` and type `learningwithtoma.com`.
3. **Stream name:** type `Website`.
4. Leave **Enhanced measurement** switched **on**. Click **Create and continue**
   (on some screens it's **Create stream**).
5. You'll see the **Measurement ID**. It looks like **`G-AB12CD34EF`**.

   ✏️ **Copy it and send it to Claude.** That's the only thing the code needs.

6. Google will show "installation instructions" with a code snippet. **Ignore them and
   close the window.** Claude does the installation.

> Lost the ID? Click the ⚙️ **Admin** gear (bottom left) → **Data collection and
> modification** → **Data streams** → click **Website**. The ID is at the top right.

## Part 3: The code (Claude)

Once you send the Measurement ID, Claude adds:

| What | Name in Google Analytics | Details |
|---|---|---|
| A visit to any page | `page_view` | Counted on every page, including each activity page. The site's addresses use `#` (e.g. `learningwithtoma.com/#/maze`), which Google doesn't count as separate pages by itself, so the code reports each page change. |
| Click on **Generate** | `generate_worksheet` | With `activity` = the activity's short name, e.g. `maze`, `counting`, `dot-to-dot`. |
| Click on **Print** | `print_worksheet` | Same `activity` value. Both Print buttons count (the one in the settings and the one below the preview on phones). |

Plus the cookie banner, if you chose Google Analytics.

**Note on Print:** this counts **clicks on the site's Print button**. Someone who prints
with **Ctrl+P** or the browser menu isn't counted, and Google can't tell whether paper
actually came out of the printer.

## Part 4: Teach Google the word "activity" (you, 2 minutes)

Google records the `activity` value with every click, but **won't show it in reports**
until you tell it about it. Do this **once, as soon as the code is live**. Google doesn't
go back and fill in clicks from before this step.

1. Click the ⚙️ **Admin** gear (bottom left).
2. Under **Property settings** → **Data display**, click **Custom definitions**.
3. Click the blue **Create custom dimension** button.
4. Fill in:
   - **Dimension name:** `Activity`
   - **Scope:** `Event`
   - **Description:** `Which worksheet was generated or printed`
   - **Event parameter:** `activity` (exactly like this, lowercase)
5. Click **Save**.

## Part 5: Check that it works (you, 5 minutes)

1. In Google Analytics, open **Reports** (📊 on the left) → **Realtime overview**.
2. In another tab, open **learningwithtoma.com**, accept the cookies, open **Maze**,
   click **Generate**, then **Print** (you can cancel the print dialog).
3. Within a minute, the Realtime page should show:
   - **1 user** in the last 30 minutes,
   - the events `page_view`, `generate_worksheet` and `print_worksheet` in the
     **Event count by Event name** card. Click `generate_worksheet` to see `activity`
     → `maze`.

Nothing shows up? Check you clicked "Accept" on the banner, and that an ad blocker isn't
blocking Google Analytics (many do; try a private window with extensions off).

## Part 6: Read your numbers (you, whenever you like)

⏳ **Normal reports lag by up to 24–48 hours.** Realtime is instant, the rest isn't.
Don't panic on day one.

### How many people came

**Reports** → **Reports snapshot**. The **Active users** number is "how many people".
Change the date range at the top right (e.g. *Last 28 days*).

### How many Generate and Print clicks in total

**Reports** → **Engagement** → **Events**. Find `generate_worksheet` and
`print_worksheet` in the table:

- **Event count** = number of clicks,
- **Total users** = number of different people who clicked.

### Which activities (the useful one)

Make this table once; Google keeps it for you.

1. Click **Explore** (🔍 on the left) → **Free form**.
2. On the left, in the **Variables** column:
   - next to **Dimensions** click **+**, search for and tick **Event name** and
     **Activity**, click **Import**;
   - next to **Metrics** click **+**, tick **Event count** and **Total users**, click
     **Import**.
3. Drag them into the **Settings** column:
   - **Activity** → **Rows**,
   - **Event name** → **Columns**,
   - **Event count** → **Values**.
4. Under **Filters**, add **Event name** → *matches regex* →
   `generate_worksheet|print_worksheet`, and click **Apply**.
5. Rename the exploration (top left) to `Generate and print by activity`.

You'll get a table like:

| Activity | generate_worksheet | print_worksheet |
|---|---|---|
| maze | 120 | 45 |
| counting | 80 | 30 |
| … | … | … |

Next time, find it under **Explore**.

### Optional: mark printing as the "goal"

A printed worksheet is the best sign that someone found the site useful. In **Admin** →
**Data display** → **Key events** → **New key event**, type `print_worksheet` and save.
Google will then show printing as a highlighted number on most reports.

---

## Cheat sheet

| I want to know… | Go to… |
|---|---|
| Is it working right now? | Reports → Realtime overview |
| How many people came? | Reports → Reports snapshot → Active users |
| How many clicked Generate / Print? | Reports → Engagement → Events |
| …on which activity? | Explore → *Generate and print by activity* |
| My Measurement ID | Admin → Data streams → Website |
