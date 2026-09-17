# Public source audit: five design websites

Reviewed September 15–16, 2026. Read this source audit alongside the browser observations in the [main review](review.md). All findings come from public HTML, CSS, JavaScript, and sitemaps. No source repository access was available. A shipped definition alone is not proof that a feature is active: below, **configured** means an actual component invocation or page markup is present; **implemented** means a matching handler/component was inspected; **hook only** means markup suggests behavior but the custom handler was not available.

## Evidence and boundaries

Temporary source snapshots and extraction manifests from the research session are not included in this repository. The public origin URLs and module references are cited below; versioned assets may change or become unavailable. Source bundles are minified, so quoted selectors/function names are more useful retrieval anchors than line numbers. No media or font binary downloads were necessary.

- Ace HTML: <https://acedesign.io/>; page bundle <https://framerusercontent.com/sites/3ZCVgDgJmNFmhxsu3U6NDN/ZtjpnfryboeNkIbiqgmIC58OsEq7Uq5TjX8rLjG-wag.BV0EGYq6.mjs>.
- Arkon HTML: <https://arkon.digital/>; application <https://arkon.digital/index.9bd9d15c.js>; CSS <https://arkon.digital/index.eaed5af2.css>.
- Neue HTML: <https://neuemontreal.com/>; application <https://framerusercontent.com/sites/45hQNNcMArzuoHlzx9jZaS/7OrBmzrr11EPkzHu6vKirIbGo0YLgybo7shxc4A6qus.mA0RSvhl.mjs>.
- MONOLOG HTML: <https://bymonolog.com/>; CSS <https://cdn.prod.website-files.com/68b652bbd6c64a44c8fe3e5e/css/bym0n0l0g.webflow.shared.1ee2b3b31.min.css>.
- Lama HTML: <https://lamalama.com/>; CSS <https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/main-xY9fs9fO.css?ver=7.1>; app <https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/app-B43p2XC9.js>.

## Themes / styles across the collection

| Site | Source-supported style system | Role of motion |
|---|---|---|
| Ace | Dark product-design studio; GT America sans plus its mono family, lime signal, raster/ASCII textures | Makes a technological studio identity tangible through a responsive ASCII image, pixelation and orbiting seal |
| Arkon | Dark developer portfolio; technical monospace plus flamboyant script and compressed display lettering | Persistent 3D scene is the portfolio's central demonstration and changes with routes |
| Neue Montréal | Typeface specimen/exhibition; the product font provides the whole typographic system, multicolored specimen chapters | Demonstrates variable weight, optical variants, alternate shapes, spatial composition and in-use typography |
| MONOLOG | Warm black-and-beige studio/editorial system; KHTeka, Animo and Suisse Mono | Markup supports a choreography of media, testimonials, accordions, canvas experiments and modal biography |
| Lama Lama | Swiss agency typography, uppercase tight display and micro mono labels, dark/light/pink themes | Brand-specific pixel/logo shaders, label swaps, cinematic modals, presentation mode and scroll-triggered utilities |

These are critical interpretations of verified design/code choices, not labels used by the sites themselves.

## Ace / acedesign.io

### Typography and visual tokens

The homepage's rendered text styles explicitly use **GT America Trial Lt**, **GT America Trial Rg**, **GT America Mono Trial Lt/Rg/Md**, **Anton**, and **Spline Sans Mono**. Font-face definitions confirm light 300, regular 400 and mono medium 500. The HTML also declares GT America Trial Cm Bd 700, TASA Orbiter, Jomolhari, Geist, Chivo Mono, Geist Mono and Inter; declaration does not establish that every font is visible on this page. In particular, some may serve embedded components or other shared Framer elements. The actual ASCII component invocation uses **Chivo Mono 12px**, and the actual globe uses **Geist Mono 500**.

Important tokens include near-black `#060606`, `#0e0e0e`, `#111`, `#171717`, `#191919`, white, white at 85/70/50/6% opacity, and acidic lime `#e1f435`. There are additional cyan, teal and orange tokens for project/content contexts; do not describe every token as a dominant homepage color. The mix of proportional and mono GT America is a coherent editorial/technical pairing rather than a random typography collage.

Framer's page breakpoints are desktop ≥1440px, intermediate 810–1439.98px, and mobile ≤809.98px. Responsive variants exist, but source breakpoints do not establish that all mobile layouts were visually tested.

### Verified hidden interaction implementations

1. **Interactive ASCII image.** The page invokes a custom component named `Interactive ASCII`. Actual settings: contrast 5, Floyd dithering, custom character set `@%#*+=-:.`, circular inverted cursor with smoothing 12 and width 48, Chivo Mono 12px, glow blur 2. This makes pointer movement part of the image rather than a separate decorative cursor. Browser should confirm its visual behavior, as rendering depends on canvas and image readiness.
2. **Kierkegaard image pixelation.** `PixelateImageHover` is actually placed on the page with pixel size 80, non-reversed effect and spring transition stiffness 800 / damping 60 / mass 1. The implementation renders a pixelated canvas above an ordinary image; mouse enter/leave switches canvas opacity. Touch start/end also works, with a 500ms delay when clearing the touch state. It uses ResizeObserver with 200ms debouncing and guards loading/render timing. This is not simply a CSS blur. [Public component](https://framerusercontent.com/sites/3ZCVgDgJmNFmhxsu3U6NDN/PixelateImageHover.Cjhy06M6.mjs).
3. **Spinning circular globe seal.** Actual label is `PRODUCT EXPERIENCE FOR AI-NATIVE TEAMS`. The SVG globe is configured with 4 meridians / 6 parallels, stroke 1.5, globe speed 20, text speed 30, counter-directed text rotation. `hoverBoost:100` doubles the globe's baseline speed while hovered. The text ring uses an independent linear infinite CSS spin; the globe updates using requestAnimationFrame. This is a small, discoverable secondary interaction. [Public component](https://framerusercontent.com/sites/3ZCVgDgJmNFmhxsu3U6NDN/Arc_Globe.3SG7-88r.mjs).
4. **Animated numeric counter.** A real page invocation starts/end values from props, uses GT America Mono regular at 20px and speed 5, loop false. Exact final displayed statistics need browser/content verification.
5. **Framer appearance effects.** HTML ships a `framer/appear` animation record and script marked `data-framer-appear-animation="no-preference"`. That indicates reduced-motion preference is considered for this entrance system, but it does not prove the custom ASCII/globe respect that preference.

### Navigation / coverage inventory

[Sitemap](https://acedesign.io/sitemap.xml): homepage, `/laboratorium`, `/works`, `/notes`, and case studies `/work/alpaca`, `/work/aster`, `/work/twin`, `/work/langdock`, `/work/marketer`, `/work/scout`. `/laboratorium` is a particularly useful secondary route to inspect because it is listed in the sitemap beyond the obvious homepage links. Booking points to `https://cal.com/team/ace-studio/discovery-call`.

### Director's interpretation

The most distinctive assets are not giant type or a dark palette in isolation; they are the consistency between technical type, image degradation, ASCII treatment and a quiet rotating studio stamp. The source supports concentrated detail rather than a fully animated interface everywhere. The very broad font-face inventory should not be copied as a design recipe: the visible hierarchy is considerably tighter than the declarations suggest.

## Arkon / arkon.digital

### Typography, layout and color

The page imports **JetBrains Mono** variable 100–800 with italics, **Bebas Neue**, and **Bonheur Royale** from Google Fonts. Body font is JetBrains Mono; `.bonheur` assigns the script to “Creative”, `.bebas` assigns the compressed display to “Developer.” and branding. Body foreground is `#b9b9b9` over black; emphasis is white. Text uses difference/exclusion blend modes against the 3D scene.

The main overlay uses 24px 48px padding, dropping to 16px 24px below 768px, with max width 1820px. Home metadata grid is `1fr 2fr 1fr 1fr` with 20px gaps. Columns use 12px/140% text, weight 300. Below 600px it becomes two columns, hides the second/third columns, increases small text to 16px, hides the Hong Kong clock, and reveals socials in the brand column. The “Creative” line has `clamp(120px,106.1538px + 3.8462vw,180px)`; “Developer” has `clamp(80px,70.7692px + 2.5641vw,120px)`.

The hero shifts composition below 1024px: display toward the top, biography toward the bottom. It is not merely a shrunk desktop canvas. However, the HTML viewport explicitly sets `user-scalable=no`, `minimum-scale=1`, `maximum-scale=1`; that is an accessibility concern for pinch zoom. Body overflow is hidden and a custom scroller is installed.

### Actual interaction architecture

1. **Persistent React Three Fiber scene.** Main renderer sets a camera with fov 60, near .1, far 100, position `[0,1.2,4.5]`. A black fog scene contains a shader sphere, particles, spot and point lights, and a reflective ground. Actual scene logic reads pointer x each frame to lerp a spotlight target; it is genuine subtle pointer reactivity, not just a video backdrop.
2. **Route-driven morph.** `/` restores the sphere and ground. `/projects` shifts the canvas to `left:100%`; `/services` shifts it to `left:0`. It fades the sphere's shader opacity and enables a point-cloud sphere, animating position/rotation over 1.5s with `power2.inOut`. Further transitions use a short in/out push. That shared scene ties the routes together.
3. **Loader.** A circular progress ring is drawn with a conic gradient and animated `--degree`; completion adds outer/inset glow, then fades the loader for 1.5s after scene loading. It is a branded transition, with potential waiting cost that should be assessed in-browser rather than inferred as actual slow loading.
4. **Link hover.** Navigation/social arrows begin 10px offset and invisible; hover brings them in, makes text white/600, using .3s ease. The main CTA scales to 1.05 on hover and uses a white fill plus pink/purple gradient border.
5. **Page changes.** Framer Motion route wrapper fades in/out at .5s; Lenis settings include lerp .1 and duration 1.5, smoothTouch false. OverlayScrollbars appears in actual initialization, not only a bundle definition.
6. **Projects.** Actual Swiper instance uses previous/next buttons and clickable pagination dots; buttons disable at endpoints. Inside a project, clicking a thumbnail changes the active large image. “Live Demo” opens external URLs. Separate Recent Projects and Past Projects galleries appear.
7. **Clock.** Homepage HKT and copyright year update every 60 seconds. This adds operational/personality detail without requiring user interaction.

### Routes / scope

Actual route declarations: `/`, `/projects`, `/services`, wildcard 404. `/sitemap.xml` returned the SPA shell rather than an XML sitemap. External project demos include modern interior, fish schooling, infinite world, wavy cubes, room shadows, stylized sun, water caustics, winter lake, miniroom, photography portfolio, diamond configurator, museum, earth and more. Their descriptions mention rich interactions, but **those are separate project demos and were not verified by this source audit**. Do not report their advertised behavior as something performed on Arkon's main homepage.

## Neue Montréal / neuemontreal.com

### Typeface system and palette

The product is the typeface. Actual rendered styles use **PP Neue Montreal**, **PP Neue Montreal Text**, and variable fonts of each. The face declarations cover Hairline 100, Extralight 150, Thin 250, Light 300, Book 350, Regular 400, Medium 500, Semibold 600, Bold 700, Extrabold 800 and Black 900, with matching italic variants. Text optical family includes Thin through Bold. Inter declarations are incidental framework/shared styles, not evidence that the specimen identity is based on Inter.

Core neutral tokens: dark `#1a1a1a`, paper `#f0e7d4`, gray `#ebebeb`/`#b5b5b5`. Exhibition accents include red `#d82f2f`, pink `#dc3c84`, green `#18bc42`, yellow `#efc21e`, blue `#4365ff`, acid yellow-green `#bdd116`, orange-red `#ff4000`, violet `#6157bd`, lilac `#a26ed6`, pink `#f66bc8`, brown `#b76745`, and fluorescent green `#00ff40`. The actual city accordion has closely related per-panel colors; do not assume its RGB values exactly equal all global tokens.

Page breakpoints include 810, 1440 and 2000px, while component breakpoints also use 1200 and the accordion uses 1024. Multiple responsive regimes are deliberate component behavior, not one uniform CSS breakpoint.

### Verified custom motion and interaction

1. **Variable-weight scroll specimen.** `withScrollWeightContainer` maps scroll progress to main/display weight 900→100 and reverse/text weight 200→700. It writes actual `font-variation-settings: "wght" ...` and changes labels through Black→Hairline and Text Thin→Text Bold. The change completes at .7 of the configured scroll progress. This demonstrates the typeface's design space, not generic decoration.
2. **City accordion.** `HorizontalAccordion` is actually populated with eleven Montréal stories. Click selects/opens a panel. On narrow views it becomes stacked vertical panels; configured mobile breakpoint 1024, closed height 56, label left inset 20 and number rotation -90. Desktop openSize is 4.8 relative to closed panels. This hides substantial editorial content inside a colorful visual specimen.
3. **Hovering postcard/images.** `Hover3D` instances are explicitly configured `effect:gravitate`, perspective 500, scale 1.1 and tilt limit 20 for desktop-size cards. Mobile card variants use scale 1 and tilt limit 1. Pointer leave returns transform to zero with a .2s ease-out transition.
4. **Circular image carousel.** Actual invocation uses 40 seconds per full spin, 1200ms intro, orbit radius .32 of the container's shortest side. Images are pre-rendered to canvases, fan outward and rotate around the center. IntersectionObserver threshold .2 pauses requestAnimationFrame when offscreen. There are no drag/click handlers in this custom component; do not label it a draggable carousel without separate browser evidence.
5. **Morphing semicolon.** Actual `MorphSemicolon` swaps square and round dot/comma outlines, fluorescent green fill, .8s morph, 1s pause, 1.8s initial delay. It dispatches `morphTick` as the alternation changes. This is a literal demonstration of alternate punctuation construction.
6. **Text variant cycling.** `withVariantSwitch` toggles paired variants every 1800ms, with a delayed start. It preserves separate desktop/mobile variant IDs.
7. **Split character comparison.** An actual `ScrollSplitCharacter` instance labels its halves “Display Extrabold” and “Text Medium”, uses the cream background and dark text, and responds to scroll/viewport measurements. This is an optical-size/weight comparison mechanism, not a standard text box.
8. **Wave headline.** Actual `WaveText` sets “Already in Use, Worldwide!” in PP Neue Montreal Extrabold Italic 800, orange `#ff4000`, tracking -.04em, line height .9, wave height 12, 1.4s duration and .07s character stagger. Characters translate up/down individually in a continuous wave.
9. **Smooth scroll and entrance.** Actual SmoothScroll intensity is 10 (Lenis-backed component). PPNMPreloader contains Lottie animation data authored from Cavalry; separate VimeoFill is configured autoplay. Lottie is therefore used, although not every bundled Lottie capability is meaningful to the page.

### Navigation / coverage

[Sitemap](https://neuemontreal.com/sitemap.xml) contains only the homepage. Anchors found: `/#enveloppe`, `/#caroussel-circulaire`, `/#graisses-scroll`, `/#letter-weights`, `/#ligatures-circles`, `/#languages`, `/#accents-bandeaux`, `/#alternatives-versions`. Product links go to Pangram Pangram Neue Montreal, Neue Montreal Mono and Off Type Neue Montreal. Purchasing/license transactions were not tested. Many specimen glyphs/logos are SVG paths; visible letters are not always editable HTML text.

## MONOLOG / bymonolog.com

### Verified design system

Webflow-generated stylesheet defines primary **KHTeka** (CSS family `Khteka`, 500/700), secondary **Animo Normal Regular** 400, tertiary **Suisse Intl Mono Regular** (CSS family `Suisse Mono`, 400). Actual typography variables assign these roles. Main body token scales 1–1.125rem, text small .875–1rem, display 5–9.25rem, h1 5–6rem, h2 3–4.75rem, h3 2–3.5rem. Tight tracking tokens include -.03, -.015, -.01em; display line-height includes .9.

Palette: near black `#080807`, card black `#181715`, dark warm gray `#393632`, middle grays `#524d47`, `#6b645c`, `#938f8a`; beige steps `#e8e8e3`, `#ddddd5`, `#d1d1c7`, `#bfbfb1`. The system is warm and tonal, not mathematically pure black/white. Styles contain fine/coarse pointer and hover/no-hover branches, plus breakpoints 479, 767, 991, 1440 and 1920.

### Interaction inventory, explicitly marked hook-only

The page loads GSAP 3.15 with ScrollTrigger, SplitText, CustomEase and Flip; Three.js 0.160.1; Lenis; Howler 2.2.4; Barba. GSAP plugins are registered and Barba wrapper/container namespaces are in the page. These imports do not independently prove every feature is active.

The actual custom script URL is assembled as `https://cdn.odyn.dev/p/3pc9/bundle.js`. Public HTTP access returned `Access denied - Invalid referrer`. This audit stopped there and did not bypass it. Consequently these are verified **markup hooks and intended affordances**, to confirm with live browser:

- `data-open-modal`, `data-close-modal`, and `data-about-status`: about/biography modal.
- `data-menu-btn`, `data-navigation-status`: menu state.
- `data-hero-canvas`, overlay-scroll and hero-translate attributes: animated canvas hero and scroll overlays.
- `data-slider-prev/next/item`, headshot/message, progress start/end and dynamic counter: testimonial slider.
- `data-stacking-cards-item`: stacked work cards.
- `data-content-trigger` paired with `data-content-image`: services/content hover switching.
- `data-accordion-close-siblings="true"`, active/not-active state, toggle and hover-highlight: one-at-a-time values accordion.
- `data-video="playpause"` and `data-sound-hover`: video hover/play and possible audio cues. No claim that sound is actually audible/default-on.
- Process cards have cursor labels “See step 01/02/03 in action” and link to time-stamped YouTube segments.
- `data-theme-section` light/dark and nav theme hooks: section-dependent chrome.
- Footer parallax, live time/date/year and top-arrow hooks.
- Footer canvas has the actual cursor instruction **“Hold to disrupt”**, with left/right canvas-content regions. This is the best target for a long pointer press test.
- Footer has real links to Claude, Gemini search, ChatGPT, Grok and Perplexity prefilled with a prompt asking the AI to evaluate MONOLOG as a potential partner. This is a distinctive trust/conversion affordance, not an on-site AI chatbot. Do not activate/send the prompt without authorization.

### Routes

[Sitemap](https://bymonolog.com/sitemap.xml): home, `/work`, and seven `/projects/` pages: backhouse, hiss-university-of-sydney, mammoth-murals, oh-architecture, slik, squiggle-university-of-sydney, supersolid. Main home anchors work/process/services. Booking goes to `cal.com/byhuy/project-intro-call` (another CTA has duration=45); mail is `hello@bymonolog.com`. Site routes are distinct from linked client sites/live work.

## Lama Lama / lamalama.com

### Typography, grid and color

Custom WordPress theme `lamalama2025`, compiled with Vite-style modules. Typography is **SuisseBPIntl** 300/400/500/700 plus **Sometype Mono** declared as 400–700. Main app embeds its design configuration:

- Display: uppercase bold 700, tracking -.02em, line height .8; lg 72→128px, md 56→96px, regular 52→80px, small 48→72px.
- Heading 1 40→60px, bold uppercase/.8; heading 2 32→48px/.9; smaller headings 28→40, 24→32, 20→24, 18→20px.
- Body regular 14→16px/1.4; medium 16→20px/1.2; large 20→24px/1.2; XL 24→32px/1.25.
- Micro labels/buttons: mono 10px, uppercase, weight 500, line height 1.8, tracking -.02em. Navigation 16px/1.4; nav children 14px.
- Fluid sizes interpolate between 800 and a design width, then have a larger-screen regime. CSS uses `clamp`; minimum/maximum numbers are token ranges, not measurements of a specific screenshot.
- Breakpoint map: 350, 376, 600, 800, 1000, 1200, 1440, 1600px. Menu has a max width of 438px and is centered near the top, rather than a conventional full-width navigation bar.

CSS palette: black `0 0 0`, white `255 255 255`, dark `26 28 28` (#1a1c1c), red `231 93 96`, green `208 255 126`, pink `255 198 218`, blue `220 242 244`, off-white `249 244 235` (#f9f4eb). Theme map has dark, light and pink; it maps backdrop, content and cursor RGB independently. [Theme module](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/colorTheme-CDrS6ZCH.js).

### Actual interactions and hidden surfaces

1. **Brand-specific WebGL.** Shader contains `drawLLLogo`, an 8px grid, texture cover/pixelation, cursor vector-field distortion, reveal progress and parallax uniforms. Actual app creates canvas, backdrop, cursor and page component instances. The pointer field adds velocity with radial falloff and decays over time; the cursor shader stops updating after about 1.5s inactivity. Touch devices and unavailable WebGL/float-buffer support disable this richer cursor path. This is a substantive branded rendering system.
2. **Hovering buttons.** Actual button module registers mouseenter/leave only for non-touch. Hover scales backdrop to .98, swaps opacity, shrinks original arrow and grows replacement arrow, hides original text and runs a new mono text reveal. Most easing is power4.out, durations .25–.45s. This creates a tactile change rather than only changing a fill color. [Button module](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/button-DcI45i1k.js).
3. **Menu overlay.** Homepage contains `.js-menu`, toggle, scroll container and blurred backdrop, plus `.js-open-pitchdeck`. This compact expandable hub contains deeper presentation/navigation options.
4. **Pitch deck.** Real homepage contains `.js-pitchdeck-container`, slide list and thumbnail UI; main app creates a PitchDeck class. It opens through menu/sticky triggers and hash, pauses the background canvas, initially shows thumbnails then closes them after 2.5s. Arrow keys navigate. Desktop wheel/up-down scroll switches vertically; below 1000px it becomes horizontal, supports swipe and left/right tap zones. End slide reopens thumbnails. Transitions use expo.out with .4/.5s movement and .85s open/.65s close. This is a second presentation mode, not a normal PDF link.
5. **Video/showreel modal.** `.js-video-modal-container` and actual modal handler support `#showreel`, close, click video to play/pause, mute, seek bar, duration display. Mouse movement reveals controls; desktop controls hide after 2s (touch after 4s). Opens pause the background canvas; closing mutes/pauses/destroys the current video instance and resumes canvas. Implemented eases power4/power3 with .65–1.15s reveal timing. It is a custom player, not native browser controls.
6. **Inquiry flow.** Multi-step contact form has next/back/cancel, field focus/blur/change validation, progress, animated success/error overlays. Enter advances; textarea Ctrl/Cmd+Enter advances; arrow up goes back, arrow down advances. Source contains real submission code but no submission was made during research. Relevant for UX: errors/success shrink the overlay, rather than navigating away.
7. **Scheduling.** `#cal` maps to Cal.com `lamalama/introduction`, month-view layout. Booking trigger closes an open pitch deck first. [Cal module](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/cal-DwaGwfnO.js).
8. **Work filters.** Actual filter class updates counts, animates filter tray from yPercent ±100/scale .96 to position/scale 1, and stores chosen filter in `?type=` using replaceState. It reads that parameter on load; `all` removes it. That supports shareable/filter-preserving navigation. These modules are linked for work page components, not asserted as visible on the home hero. [Filter module](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/case_filters-CkPeHUMO.js).
9. **Footer-triggered utility.** Footer ScrollTrigger begins `bottom 110%`, shows a sticky bar and updates header messages on entering, hides them on leaving. This means the header/footer has contextual states that a static first-screen audit would miss. [Footer module](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/footer-BrJCed58.js).

### Sitemap / section inventory

[Sitemap index](https://lamalama.com/sitemap.xml), [pages](https://lamalama.com/page-sitemap.xml), [services](https://lamalama.com/service-sitemap.xml), [cases](https://lamalama.com/case-sitemap.xml).

English pages: home, `/work/`, `/about-us/`, `/contact/`, `/ai/`; Dutch routes also exist. Services: branding, websites, ecommerce, marketing, with Dutch versions. Case sitemap contains many project pages. Homepage links include Moov, Gardeners, Neurons Lab, Voor Rookvrij, Prazeres United, Home Agency and Ajax. Careers link externally to Homerun; social links go to Instagram/LinkedIn. Source also includes language-switch component.

### Director's interpretation and test priorities

The rendering system is unusually integrated: pixel/logo treatment, mono letter swaps, contextual chrome and layered content all reinforce one identity. The risk is discoverability and interaction cost: the compact menu, pitch deck, showreel, inquiry flow and calendar are different layers with different controls. Verify focus/escape/back behavior and readable small labels in-browser; the presence of an `a11y` module cannot certify accessibility. Dark/light/pink themes are designed mappings, not necessarily a user-selectable theme switch.

## What this source audit does not certify

- Every interaction being present/usable in every browser or viewport.
- Every linked project/case page being visually reviewed, or every external demo being tested.
- Performance benchmarks, color-contrast compliance, screen-reader usability, keyboard coverage or reduced-motion compliance.
- That a font declaration equals actual rendered usage, or a library import equals a visible feature.
- Any form submission, booking, external AI prompt, purchase or other outbound action.

Use the source findings as a precise investigation map and explanatory evidence alongside the live observations. Where a feature was only identified in markup, retain that distinction in the final review.
