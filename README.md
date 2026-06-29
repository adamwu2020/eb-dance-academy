# EB Dance Academy — Website

A fast, responsive single-page website for a kids' dance studio (ages 5–18).

## Sections
- **Hero** — headline, calls to action, quick stats
- **Why us** — age-tiered classes, confidence-first approach
- **Dance Styles** — Ballet, Hip-Hop, Jazz, Contemporary, Tap, Ballroom & Latin, Breakdance — each with a click-to-play **"basics" intro video** (modal)
- **Student Stories** — success testimonials
- **Remote & Onsite** — two teaching-format options side by side
- **Contact / Sign Up** — validated inquiry form

## Run it
It's plain HTML/CSS/JS — no build step. Either open `index.html` directly, or serve it:

```bash
cd eb-dance-academy
python3 -m http.server 8000
# visit http://localhost:8000
```

## Customizing

### Intro videos
Each style links to a real, public "basics" tutorial on YouTube (verified
embeddable). They're wired up in the `DANCE_STYLES` array near the top of
`script.js` — the inline comment on each entry names the video:

| Style | Video |
|-------|-------|
| Ballet | Ballet for Kids — Episode 1 (CJ and Friends) |
| Hip-Hop | How To Hip-Hop Dance For Kids (CBC Kids) |
| Jazz | 6 Basic Jazz Steps for Beginners |
| Contemporary | Contemporary Dance Basic Steps |
| Tap | Tap Steps for Kids & Beginners (New Victory) |
| Ballroom & Latin | Basic Latin Ballroom Steps (MihranTV) |
| Breakdance | How To Breakdance For Beginners |

To use *your own* footage instead, replace each `videoId` with the
11-character YouTube ID of your video (the part after `watch?v=`). Set
`videoId: ""` to show "video coming soon" instead.

> These are third-party videos embedded for demonstration. Confirm they suit
> your students (or swap in the studio's own licensed videos) before going live.

### Text, contact details, stories
Edit `index.html` directly (phone, email, address are in the Contact section;
testimonials are in the Student Stories section).

### Contact form
The form is front-end only (validates and shows a thank-you message). To receive
real submissions, point it at a backend or a form service (e.g. Formspree,
Netlify Forms) by adding an `action`/`method` to `<form id="signup-form">` and
removing the demo `preventDefault` handler in `script.js`.

## Colors / branding
Brand colors live as CSS variables at the top of `styles.css` (`--brand`,
`--violet`, `--teal`, …).
