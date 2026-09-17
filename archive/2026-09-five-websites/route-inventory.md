# Secondary route inventory — source inspection

65 public URL requests completed on 2026-09-16: 8 Ace, 8 MONOLOG, and 49 Lama Lama routes, including every English case URL in its sitemap (41 URLs, 40 unique destinations). Every request ended at HTTP 200; that does **not** mean every page is complete. One redirect and several empty/incomplete content templates were found. This inventory describes delivered markup and selectively inspected public component code, not live interaction tests. No images, videos, fonts or camera streams were downloaded/activated.

The tables below retain the request statuses, destinations, and template findings from the research session. Temporary HTML snapshots and extraction files are not included in this repository. Every linked route below is its own primary source, although live content may have changed since inspection. Source can contain desktop/mobile duplicates, hover copies and accessibility/fallback text; duplicates in extracted text do not imply duplicate visible content.

## Most consequential findings

- **Ace /works is an empty page component.** The public page bundle creates only a black 1200×1080 div and overlay, with no children. This is stronger than a missing server-rendered text observation. [Page](https://acedesign.io/works), [actual page module](https://framerusercontent.com/sites/3ZCVgDgJmNFmhxsu3U6NDN/_-O8gR8c1zsCDA1oDTiG4BjqGVGy94EE8kathG9Ceps.B_MKTn7O.mjs).
- **Ace /laboratorium is not an experiment gallery.** It is a personal-profile layout: headline, avatar, biography, social links, employment timeline and email CTA. Its content/style differ materially from the main studio site. It may be residual/template content; the source alone cannot establish intent or verify the claimed career history. [Page](https://acedesign.io/laboratorium).
- **MONOLOG's seven case URLs deliver the same generic old-looking shell.** Each has title “MONOLOG,” no case heading/body, a navigation/footer with 2025 copyright, different positioning/contact copy, and the same text. These are incomplete-looking responses despite HTTP 200, not confirmed 404s. Client hydration can alter source responses; the [main review](review.md) records a live confirmation for one case, not all seven.
- **Lama /contact has a camera playground.** It obtains a front-facing webcam stream on activation, textures it into the branded WebGL grid, offers grid-size and dark/light controls, and stops camera tracks when reverting. This was source inspected only. [Contact](https://lamalama.com/contact/).
- **Lama /ai is sparse.** Main page content is an AI heading followed by the standard contact/footer, with no substantive AI service content in the delivered markup. [Page](https://lamalama.com/ai/).
- **Lama Cubby case contains lorem ipsum.** Its case introduction is placeholder Latin. [Case](https://lamalama.com/cases/cubby/).
- **Lama has duplicate sitemap destinations.** `/cases/10-10/` redirects to `/cases/10-out-of-10/`; both appear in the source sitemap.

## Ace route families

All six case-study routes use a dark shared navigation, information sidebar, project media area and “highlights” container. Metadata uses NAME / OVERVIEW / SCOPE, with uppercase mono captions. The public `Case Caption Accordion` component is actually used: tapping its row cycles Open/Closed, with .18s transition, 11px mono caption tracking .2em, 14px light GT America body/1.5 line-height. Hover adds a subtle white 3% background; body fades/translates from y6. [Shared caption module](https://framerusercontent.com/sites/3ZCVgDgJmNFmhxsu3U6NDN/kTUXNxspu.BxCCTBy9.mjs).

The shared case chrome includes mobile drawer items Approach/Lab that differ from the desktop nav. This variation deserves a content/navigation consistency review. Media were inspected as references/markup, not opened as a functioning client product. No case-study iframe was present in these fetched pages.

| Exact URL | Template / content structure | Extra controls / notable differences | Status |
|---|---|---|---|
| [acedesign.io/laboratorium](https://acedesign.io/laboratorium) | Personal-profile/biography layout, employment timeline, avatar, social row, email | Fixed Back arrow; social links Instagram/Dribbble/LinkedIn/Read.cv; profile tone unlike main studio | 200, content mismatch risk; intent unknown |
| [acedesign.io/works](https://acedesign.io/works) | Empty black page component | No rendered controls/content in HTML or its actual page component | 200, incomplete page confirmed in source |
| [acedesign.io/work/alpaca](https://acedesign.io/work/alpaca) | Case template; model discovery/setup/deployment design | Additional `TabbedTextComponents`, graffiti block and Arc Globe invocation compared with other cases; caption accordions | 200, populated |
| [acedesign.io/work/aster](https://acedesign.io/work/aster) | Case template; flexible CRM records and workflows | Shared metadata accordions and media; no novel markup control beyond template | 200, populated |
| [acedesign.io/work/twin](https://acedesign.io/work/twin) | Case template; autonomous-agent planning and intervention | Shared metadata accordions and media; no novel markup control beyond template | 200, populated |
| [acedesign.io/work/langdock](https://acedesign.io/work/langdock) | Case template; AI chat, company knowledge, agents and workflows | Shared metadata accordions and media; no novel markup control beyond template | 200, populated |
| [acedesign.io/work/marketer](https://acedesign.io/work/marketer) | Case template; AI campaign research/creation/review | Shared metadata accordions and media; no novel markup control beyond template | 200, populated |
| [acedesign.io/work/scout](https://acedesign.io/work/scout) | Case template; private-market/company discovery | Shared metadata accordions and media; shorter delivered responsive text inventory | 200, populated |

## MONOLOG route families

The `/work` archive adds service filters to the home visual system: all projects, brand strategy, visual identity, website strategy, website design, website development. It has `data-filter-target-match="multi"` and `data-filter-name-match="multi"`, active/transition-out/not-active states, result-count hooks and a grid layout state. Project cards collect multiple category values, and some include `3d-development` even though no separate 3D filter is displayed in the extracted filter row. These are markup-confirmed controls; their JavaScript custom bundle remained unavailable to direct source access as explained in `source-audit.md`.

Archive cards include project year, brief, service tags and View project affordance. Footer retains the AI-evaluation links and “Hold to disrupt” canvas from the homepage. Case pages lack that richer contemporary footer and show an older generic navigation/footer instead. This is an unusually strong template consistency concern.

| Exact URL | Template / content structure | Extra controls / difference | Status |
|---|---|---|---|
| [bymonolog.com/work](https://bymonolog.com/work) | Filterable seven-project archive with service tags and short summaries | Service filters, result count, filter transition states, grid state, home footer experiment | 200, populated |
| [bymonolog.com/projects/backhouse](https://bymonolog.com/projects/backhouse) | Generic navigation/footer shell | No case-specific heading/content in response | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/hiss-university-of-sydney](https://bymonolog.com/projects/hiss-university-of-sydney) | Same generic shell | No case-specific heading/content in response | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/mammoth-murals](https://bymonolog.com/projects/mammoth-murals) | Same generic shell | No case-specific heading/content in response | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/oh-architecture](https://bymonolog.com/projects/oh-architecture) | Same generic shell | No case-specific heading/content in response | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/slik](https://bymonolog.com/projects/slik) | Same generic shell | No case-specific heading/content in response | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/squiggle-university-of-sydney](https://bymonolog.com/projects/squiggle-university-of-sydney) | Same generic shell | No case-specific heading/content in response | 200, incomplete-looking source; runtime unverified |
| [bymonolog.com/projects/supersolid](https://bymonolog.com/projects/supersolid) | Same generic shell | No case-specific heading/content in response | 200, incomplete-looking source; runtime unverified |

## Lama main pages and services

| Exact URL | Template / content structure | Novel interaction / detail | Status |
|---|---|---|---|
| [lamalama.com/work/](https://lamalama.com/work/) | Hero basic → extensive case overview → contact/footer | Per-card expand/preview hooks, case/client links, shareable ?type= filters described in source audit | 200, populated |
| [lamalama.com/about-us/](https://lamalama.com/about-us/) | Extended hero → agency intro → core-value stack → awards → team → culture gallery → footer | Awwwards talk/media; awards expansion; team portrait switching; horizontally scrolling media gallery on desktop, mobile gallery variant | 200, populated |
| [lamalama.com/contact/](https://lamalama.com/contact/) | Contact details, team/contact card, social/language links, project/calendar CTAs | Camera-to-WebGL-grid playground; adjustable grid, dark/light, revert; no camera activation tested | 200, populated |
| [lamalama.com/ai/](https://lamalama.com/ai/) | Basic AI title → standard contact/footer | No additional AI controls/content identified | 200, sparse/incomplete-looking |
| [lamalama.com/services/branding/](https://lamalama.com/services/branding/) | Light service template; positioning → video/media → testimonial → client logos → stacked process → related work → footer | Process items and stacked card progress; Next service path and repeated call booking | 200, populated |
| [lamalama.com/services/websites/](https://lamalama.com/services/websites/) | Light service template; positioning → motion media → testimonial → logos → process stack → related projects | Stacking cards; lacks separate `blocks/process_item` markup used by other services | 200, populated |
| [lamalama.com/services/ecommerce/](https://lamalama.com/services/ecommerce/) | Shopify positioning → media → metrics → logos → four-stage process → related projects | Process cards, conversion-stat display; no testimonial_card component in this response | 200, populated |
| [lamalama.com/services/marketing/](https://lamalama.com/services/marketing/) | Marketing positioning → media → metrics/testimonial → logos → six-stage process → related projects | Data/stat display, process stack; SEO/AI appears as a process stage here, despite sparse /ai route | 200, populated |

### Novel component behavior verified from code

**Contact camera/grid:** The actual contact page instantiates VideoRoom. Camera access occurs through `navigator.mediaDevices.getUserMedia({video:{...facingMode:'user'}})` when the user activates it. It hides contact text, shows settings, uses the stream as a shader texture and returns to contact if setup fails. Reverting stops every stream track and clears `srcObject`; destruction also calls stream cleanup. Grid slider sends `value * 4` to `setGridSize`; thumb formula maps range 1–24, corresponding to 4–96 grid-size values. Dark/light controls update both shader colors and page/header theme. This is a **specific exception** to the main audit's caution that global theme mappings do not prove a sitewide user theme toggle. [Camera module](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/video_room-Bo-689RO.js), [settings module](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/sticky_item_video_room_settings-CnI6N_GB.js).

Potential error feedback issue, source-only: `showError` creates a div and assigns its text/class but does not append it to the page within that method. The user may not see the intended camera-error explanation. This needs a runtime denial test before calling it a confirmed UX defect; no permission was requested during this source audit.

**Team portraits:** About page's TeamMemberList uses the same 8px WebGL grid and transition layer as the brand system. Scroll triggers select the team member crossing viewport center; mouse hover can temporarily override the scroll-selected index, and leaving the list resets to it. Show/hide uses .75s power4.out. [Team module](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/team_member_list-BDYHreN0.js).

**Culture gallery:** Gallery creates a scroll-scrubbed `xPercent:0 → -100` media strip and synchronized progress bar. WebGL image/video rendering starts only within the relevant scroll interval, stops on leaving, and is killed/replaced by mobile behavior below 1000px. [Gallery module](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/gallery-Bfc7HHns.js).

**Stacked values/process:** Each stacked card gets a sticky offset, sequential scaleX progress bar, and clip-path masking as the next card arrives. Timeline is rebuilt on resize. Desktop hover may show contextual cursor text from the section's dataset. This is more than cards translating upward: older content is progressively clipped while the stack advances. [Stacking module](https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/stacking_cards-aW6CyQZS.js).

## Lama case-study family

All English case URLs share **hero_case → case_detail → other_cases_services → footer**. Hero provides Back to work, title and category chips. Detail provides a short narrative, optional credits and external visit action, plus a media sequence using WebGL image/video components. Related cases reuse the same highlighted/item controls, followed by inquiry and scheduling CTAs. The distinction among case pages lies in content, media sequence and optional credits/actions rather than entirely new navigation patterns. No non-analytics iframe was present in the sampled HTML.

The following complete table records every English case sitemap URL. “Images + video” refers to component types in the primary `case_detail` region; it does not claim media loaded or played. “Credits” and “external action” refer to detail-region markup. This avoids counting the shared related-case videos as if they belonged to the case itself.

| Exact case URL | Content focus within shared case template | Detail variants / controls | Status |
|---|---|---|---|
| [10-10](https://lamalama.com/cases/10-10/) | Film-production identity / portfolio | Images + video; external visit action (10outof10.tv) | Redirects to /cases/10-out-of-10/; final 200 |
| [meadow](https://lamalama.com/cases/meadow/) | Personal communications product; brand / campaign | Images + video | 200, populated |
| [seawater](https://lamalama.com/cases/seawater/) | Drinking-water brand; corporate / commerce | Images + video; external visit action (drinkseawater.com) | 200, populated |
| [canals-and-windmills](https://lamalama.com/cases/canals-and-windmills/) | Team-event brand / corporate | Images + video; external visit action (canalsandwindmills.com) | 200, populated |
| [cubby](https://lamalama.com/cases/cubby/) | Branding case with placeholder narrative | Images + video | 200, lorem ipsum in primary narrative |
| [mixr](https://lamalama.com/cases/mixr/) | Cocktail-on-tap branding | Images + video | 200, populated |
| [bottleup](https://lamalama.com/cases/bottleup/) | Reusable bottle brand; corporate / experience | Images + video; external visit action (bottleup.com) | 200, populated |
| [knvb-commissie-mijnals](https://lamalama.com/cases/knvb-commissie-mijnals/) | Anti-racism football organization; identity / campaign | Images + video; external visit action (commissiemijnals.nl) | 200, populated |
| [10-out-of-10](https://lamalama.com/cases/10-out-of-10/) | Film-production identity / portfolio | Images + video; external visit action (10outof10.tv) | 200, populated |
| [noodfonds](https://lamalama.com/cases/noodfonds/) | Local assistance organization; identity / corporate | Images + video; external visit action (noodfondsamsterdam.nl) | 200, populated |
| [soilmates](https://lamalama.com/cases/soilmates/) | Consumer products; campaign / commerce | Images + video; external visit action (soilmates.com) | 200, populated |
| [behind-the-pines](https://lamalama.com/cases/behind-the-pines/) | Outdoor retailer; brand / commerce | Images + video; external visit action (www.behindthepines.eu) | 200, populated |
| [moov](https://lamalama.com/cases/moov/) | Fitness positioning / visual identity | Images + video; credits | 200, populated |
| [van-doorne](https://lamalama.com/cases/van-doorne/) | Law firm; visual identity / website | Images + video; credits; external visit action (www.vandoorne.com) | 200, populated |
| [one-studios](https://lamalama.com/cases/one-studios/) | Music studio; digital experience | Images + video; credits; external visit action (onestudios.nl) | 200, populated |
| [cinekidfestival](https://lamalama.com/cases/cinekidfestival/) | Children’s media festival; brand / campaign | Images + video; credits | 200, populated |
| [steven-taylor](https://lamalama.com/cases/steven-taylor/) | Photographer / creative director portfolio | Images + video; external visit action (www.steventaylor.com) | 200, populated |
| [bruut](https://lamalama.com/cases/bruut/) | Film studio identity / portfolio | Images + video; recognition; external visit action (bruut.media) | 200, populated |
| [jimmy-nelson](https://lamalama.com/cases/jimmy-nelson/) | Photographer; campaign / commerce / portfolio | Images + video; recognition; external visit action (www.jimmynelson.com) | 200, populated |
| [dorstenlesser](https://lamalama.com/cases/dorstenlesser/) | Social agency identity / portfolio | Images + video; recognition; external visit action (dorstenlesser.com) | 200, populated |
| [sony-music](https://lamalama.com/cases/sony-music/) | Music company; corporate / experience | Images + video; credits; external visit action (www.sonymusic.nl) | 200, populated |
| [bmim-mima](https://lamalama.com/cases/bmim-mima/) | Music-driven identity system; showcased generative tool | Images + video; generative identity described; no on-page tool control found | 200, populated |
| [fledge](https://lamalama.com/cases/fledge/) | Film directors’ identity / portfolio | Images + video; external visit action (fledge.tv) | 200, populated |
| [e-bike-store](https://lamalama.com/cases/e-bike-store/) | E-bike retailer; brand / commerce | Images + video | 200, populated |
| [ajax](https://lamalama.com/cases/ajax/) | Explicitly unofficial exploratory Ajax concept | Images + video; external visit action (iconsaremade.com) | 200, populated |
| [storyboard](https://lamalama.com/cases/storyboard/) | Agency identity / corporate / portfolio | Images + video; external visit action (www.storyboard-agency.com) | 200, populated |
| [youngcapital-next](https://lamalama.com/cases/youngcapital-next/) | Career / traineeship corporate experience | Images + video; credits; external visit action (next.youngcapital.nl) | 200, populated |
| [justdiggit-our-world](https://lamalama.com/cases/justdiggit-our-world/) | Environmental storytelling campaign / experience | Images + video; credits; recognition; external visit action (ourworld.justdiggit.org) | 200, populated |
| [neurons-lab](https://lamalama.com/cases/neurons-lab/) | AI consultancy; corporate / portfolio | Images + video; credits | 200, populated |
| [home-agency](https://lamalama.com/cases/home-agency/) | Creative agency; brand / corporate / portfolio | Images + video; external visit action (home.agency) | 200, populated |
| [gardeners](https://lamalama.com/cases/gardeners/) | Creative agency experience / portfolio | Images + video; external visit action (gardeners.nl) | 200, populated |
| [bisque-golf](https://lamalama.com/cases/bisque-golf/) | Golf lifestyle; brand / campaign / commerce | Images + video; credits; external visit action (bisquegolf.com) | 200, populated |
| [monfri](https://lamalama.com/cases/monfri/) | Employer branding firm identity / corporate | Images + video; external visit action (mon-fri.com) | 200, populated |
| [prazeres-united](https://lamalama.com/cases/prazeres-united/) | Community football; brand / campaign / experience | Images + video; credits; external visit action (prazeresunited.com) | 200, populated |
| [jack-and-ai](https://lamalama.com/cases/jack-and-ai/) | AI content agency identity / portfolio | Images + video; external visit action (jackandai.com) | 200, populated |
| [hear](https://lamalama.com/cases/hear/) | Music and sound agency identity / portfolio | Images + video; external visit action (hear.agency) | 200, populated |
| [lelystad-city-branding](https://lamalama.com/cases/lelystad-city-branding/) | City marketing identity / campaign | Images only | 200, populated |
| [750-years-of-amsterdam](https://lamalama.com/cases/750-years-of-amsterdam/) | City anniversary digital campaign | Images only; credits | 200, populated |
| [achmea-impact-ventures](https://lamalama.com/cases/achmea-impact-ventures/) | Venture organization identity / corporate | Images + video; recognition | 200, populated |
| [voor-rookvrij](https://lamalama.com/cases/voor-rookvrij/) | Smoke-free movement identity / campaign | Images + video; credits; external visit action (www.rookvrijegeneratie.nl) | 200, populated |
| [bvp](https://lamalama.com/cases/bvp/) | Investment organization identity / corporate | Images + video; external visit action (bvp.capital) | 200, populated |

## Coverage limits and reading guidance

This is a public response/template and selectively inspected interaction-module inventory, not a report that all listed media or controls were exercised in a browser. HTTP 200 only proves a response was returned, not that content is complete or interactions work. The [main review](review.md) supplies runtime evidence on main routes. Third-party client sites, external booking, form submission, camera permission, and client project functionality are outside this inventory. No remote media was downloaded. English routes were inventoried; alternate Dutch content was not exhaustively duplicated.

HTML snapshots sometimes contain repeated text for responsive variants, animated hover layers or accessibility/display copies. Those source repetitions were not classified as visual duplication defects. Similarity of case templates is intentional system reuse; the substantive concerns are empty/sparse content, placeholder prose, or navigation to a generic shell. Where case copy describes a client tool or creative system, the description is not evidence that the tool can be operated on Lama’s case page.

Source module filenames and live URLs are cited inline above. The temporary route snapshots and extraction JSON are not part of this published collection; use the [main review](review.md) for the accompanying browser observations.
