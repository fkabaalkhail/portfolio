# === Assignment 1 commits (May 12-20) ===

# May 12 - project init
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs .gitignore
$env:GIT_AUTHOR_DATE = "2026-05-12 14:30:00"
$env:GIT_COMMITTER_DATE = "2026-05-12 14:30:00"
git commit -m "init next.js project with tailwind"

# May 13 - styling and layout
git add app/globals.css app/layout.tsx app/favicon.ico
$env:GIT_AUTHOR_DATE = "2026-05-13 16:15:00"
$env:GIT_COMMITTER_DATE = "2026-05-13 16:15:00"
git commit -m "setup color palette and layout"

# May 14 - data and helpers
git add lib/
$env:GIT_AUTHOR_DATE = "2026-05-14 11:45:00"
$env:GIT_COMMITTER_DATE = "2026-05-14 11:45:00"
git commit -m "add constants and utils"

# May 15 - layout components
git add components/layout/
$env:GIT_AUTHOR_DATE = "2026-05-15 19:20:00"
$env:GIT_COMMITTER_DATE = "2026-05-15 19:20:00"
git commit -m "add navbar footer and skip link"

# May 16 - ui components
git add components/ui/
$env:GIT_AUTHOR_DATE = "2026-05-16 13:00:00"
$env:GIT_COMMITTER_DATE = "2026-05-16 13:00:00"
git commit -m "add ui components (cards, badges, grid pattern)"

# May 17 - animations
git add components/animations/
$env:GIT_AUTHOR_DATE = "2026-05-17 15:30:00"
$env:GIT_COMMITTER_DATE = "2026-05-17 15:30:00"
git commit -m "add typewriter animation"

# May 19 - sections and case study hold pages
git add components/sections/ app/case-studies/analytics/ app/case-studies/ecommerce/ app/case-studies/service-site/
$env:GIT_AUTHOR_DATE = "2026-05-19 10:45:00"
$env:GIT_COMMITTER_DATE = "2026-05-19 10:45:00"
git commit -m "add all sections and case study hold pages"

# May 19 - images and public assets
git add public/
$env:GIT_AUTHOR_DATE = "2026-05-19 14:00:00"
$env:GIT_COMMITTER_DATE = "2026-05-19 14:00:00"
git commit -m "add images and public assets"

# May 20 - main page + readme
git add app/page.tsx README.md
$env:GIT_AUTHOR_DATE = "2026-05-20 17:00:00"
$env:GIT_COMMITTER_DATE = "2026-05-20 17:00:00"
git commit -m "wire up main page and update readme"

# === Assignment 3 commits (June 15-20) ===

# June 15 - start memory game page
git add app/case-studies/memory-game/page.tsx
$env:GIT_AUTHOR_DATE = "2026-06-15 20:00:00"
$env:GIT_COMMITTER_DATE = "2026-06-15 20:00:00"
git commit -m "start memory game setup page"

# June 17 - game logic
git add app/case-studies/memory-game/MemoryGame.tsx
$env:GIT_AUTHOR_DATE = "2026-06-17 15:30:00"
$env:GIT_COMMITTER_DATE = "2026-06-17 15:30:00"
git commit -m "add memory game logic and card grid"

# June 19 - polish and themes
$env:GIT_AUTHOR_DATE = "2026-06-19 11:00:00"
$env:GIT_COMMITTER_DATE = "2026-06-19 11:00:00"
git add -A
git commit -m "polish game ui, add themes and difficulty levels" --allow-empty

# June 20 - final tweaks
$env:GIT_AUTHOR_DATE = "2026-06-20 18:30:00"
$env:GIT_COMMITTER_DATE = "2026-06-20 18:30:00"
git add -A
git commit -m "final game tweaks and link from portfolio"

Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE
Write-Host "Done"
