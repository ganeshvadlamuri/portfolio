# Cyber Security Portfolio Template

This repo contains a simple, fast, static template you can host on GitHub Pages. It’s plain HTML/CSS/JS (no build step).

## Structure (one file to update)

- `index.html` – Home feed. Fetches posts from JSON and renders cards.
- `post.html` – Single article view. Loads by `?slug=...` from the same JSON.
- `data/posts.json` – The only file you edit to publish. Newest first.
- `assets/` – Images and static files.
- `.nojekyll` – Disable Jekyll on Pages.

### Editing `data/posts.json`

Each post object supports:

```json
{
  "slug": "my-post",
  "title": "My Post",
  "date": "2025-11-09",
  "featured": true,
  "comments": 0,
  "categories": ["Security"],
  "img": "assets/hero.jpg",
  "excerpt": "Short summary for the feed.",
  "content": "# Markdown Title\nYour body in markdown."
}
```

That’s it — add a new object (at the top) and push.

## Quick Deploy (GitHub Pages)

1. Create a new repository on GitHub (public). Name it either:
   - `USERNAME.github.io` for a user site, or
   - Any name for a project site.
2. Add these files to the repo and push to `main`:
   - `index.html`, `.nojekyll`, plus an `assets/` folder for images.
3. In GitHub, open: Settings → Pages
   - Source: select `Deploy from a branch`
   - Branch: `main` and folder `/ (root)`, then Save.
4. Wait ~1–2 minutes. Your site will be live at:
   - `https://USERNAME.github.io` (user site) or
   - `https://USERNAME.github.io/REPO` (project site).

### Optional: Custom Domain

1. In Settings → Pages, set your custom domain (e.g., `example.com`).
2. In your DNS, create CNAME for the root or `www` pointing to `USERNAME.github.io`.
3. GitHub will place a `CNAME` file in the repo automatically (or add one manually).

## Local Preview

- Open `index.html` in a browser for the feed.
- Click a card or open `post.html?slug=your-slug` for a single post.

## Notes

- `.nojekyll` disables Jekyll processing so files/folders starting with `_` are served as-is.
- Everything is self-contained and easy to tweak. No frameworks.




