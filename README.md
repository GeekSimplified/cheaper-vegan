# Cheaper Vegan

A single-page app for eating well on an extreme budget. It plans very cheap, high-nutrition vegan meals (13¢–83¢ a serving), builds a shopping list, and compares prices across **Aldi, Walmart, Target, Cub Foods, Hy-Vee and Fresh Thyme (Savage)**.

## Features

- **Plan meals:** 49 meals you can favorite (favorites come up more often in Shuffle), including Mexican, Chinese and other Asian dishes (with a Shuffle my week button and meal-type and cuisine filters), built on about 20 cheap staples (dry beans, lentils, split peas, oats, rice, peanut butter, potatoes, cabbage, carrots, onions, bananas), sorted cheapest first. Each shows its cost per serving, calories, protein and fiber.
- **Shopping list:** Adds up ingredients across the week and rounds up to whole packages. Groups items by store, lets you mark what you already have and check items off as you shop, and copies the list as text.
- **Compare prices:** Shows each item's price at each store with the cheapest highlighted. Totals the trip for each store on its own and for the cheapest mix of stores.
- **Pantry:** A recommended vegan pantry list in 8 groups (starter staples, a well-stocked freezer, plus nice-to-haves and vegan nutrition must-haves like B12), with cheapest prices, have-it checkboxes, and one button to add missing starter items to your list.
- **Ingredient search:** Search about 95 groceries, including 14 frozen and about 30 canned foods, to compare prices at all six stores, add any of them to your list, or jump to each store's website to check today's price.
- **Live prices (Claude desktop app):** Ask Claude in the Claude app to "refresh Cheaper Vegan prices". Claude checks each store's website for your local stores and saves the results to the app, which then rebuilds your list around the lowest real prices, with the exact product to buy. Target blocks automated checks, so Target uses estimates. The GitHub Pages copy uses estimates only.
- **Your own prices:** Tap any price to type in the real shelf price. It's saved and used everywhere.

## Prices

The built-in prices are estimates of typical Twin Cities store-brand prices as of November 2026, not live data. These stores don't offer public price APIs, so update prices in the app as you shop.

## Running it

**Live site:** https://geeksimplified.github.io/cheaper-vegan/

Or open `index.html` in any web browser. Nothing to install. Your plan and prices are saved in your browser's local storage.

## Editing

`cheaper-cart.html` is the source. After editing it, run `sh build-pages.sh` to regenerate `index.html` (the GitHub Pages site), then commit both.

## Accessibility checks

Automated checks run axe-core in a real browser (Playwright) against WCAG 2.1 and 2.2 AA. They cover every tab, search results, the theme menu, color contrast in every background theme, and keyboard use of the tabs (arrow keys, Home, End).

One-time setup: `npm install` then `npx playwright install chromium`. After that, run `sh build-pages.sh` and then `npm test`.

Automated checks catch only part of what matters, so check changes with NVDA too.

## Notes

Nutrition figures are per-serving estimates. A vegan diet needs a vitamin B12 supplement.
