# Cheaper Cart

A single-page app for eating well on an extreme budget. It plans very cheap, high-nutrition vegan meals (13¢–66¢ a serving), builds a shopping list, and compares prices across **Aldi, Walmart, Target and Cub Foods**.

## Features

- **Plan meals:** 12 meals built on about 20 cheap staples (dry beans, lentils, split peas, oats, rice, peanut butter, potatoes, cabbage, carrots, onions, bananas), sorted cheapest first. Each shows its cost per serving, calories, protein and fiber.
- **Shopping list:** Adds up ingredients across the week and rounds up to whole packages. Groups items by store, lets you mark what you already have and check items off as you shop, and copies the list as text.
- **Compare prices:** Shows each item's price at each store with the cheapest highlighted. Totals the trip for each store on its own and for the cheapest mix of stores.
- **Ingredient search:** Search about 60 groceries to compare prices at all four stores, add any of them to your list, or jump to each store's website to check today's price.
- **Your own prices:** Tap any price to type in the real shelf price. It's saved and used everywhere.

## Prices

The built-in prices are estimates of typical Twin Cities store-brand prices as of November 2026, not live data. These stores don't offer public price APIs, so update prices in the app as you shop.

## Running it

**Live site:** https://geeksimplified.github.io/cheaper-cart/

Or open `index.html` in any web browser. Nothing to install. Your plan and prices are saved in your browser's local storage.

## Editing

`cheaper-cart.html` is the source. After editing it, run `sh build-pages.sh` to regenerate `index.html` (the GitHub Pages site), then commit both.

## Notes

Nutrition figures are per-serving estimates. A vegan diet needs a vitamin B12 supplement.
