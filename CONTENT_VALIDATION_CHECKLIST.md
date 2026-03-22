# Pre-release Content Validation Checklist

Use this checklist before publishing updates to ensure all public pages are free of placeholder content and broken internal links.

## 1) Link integrity checks
- [ ] Run `rg -n 'href="#"|src="https://via\.placeholder\.com' *.html blog/*.html` and confirm there are no matches in release-target pages.
- [ ] Run `rg -n 'blog/[A-Za-z0-9-]*[A-Z][A-Za-z0-9-]*\.html' *.html *.js blog/*.html` and confirm blog slug paths are lowercase.
- [ ] Manually click through all internal nav links on `index.html`, `blog.html`, and `project.html`.

## 2) Placeholder text checks
- [ ] Run `rg -n 'John Doe|YOUR_|TODO|TBD|lorem ipsum' *.html blog/*.html *.js` and remove any release-facing placeholder text.
- [ ] Verify page `<title>` values in updated pages reflect the site brand (`Ram Murmu` / `rammurmu.io`).

## 3) Final sanity checks
- [ ] Open `blog.html` and confirm all blog cards route to valid blog pages.
- [ ] Open `project.html` and confirm each card has a real image and non-placeholder destinations.
- [ ] Spot-check mobile navigation menu on at least one page.
