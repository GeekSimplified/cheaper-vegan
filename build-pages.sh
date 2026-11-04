#!/bin/sh
# Builds index.html (the GitHub Pages site) from cheaper-cart.html.
# cheaper-cart.html is the source: edit it, then run `sh build-pages.sh` and commit both.
set -e
cd "$(dirname "$0")"
{
  printf '%s\n' '<!doctype html>' '<html lang="en">' '<head>' \
    '<meta charset="utf-8">' \
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' \
    '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,-apple-system,"Segoe UI",sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>' \
    '</head>' '<body>'
  cat cheaper-cart.html
  printf '%s\n' '</body>' '</html>'
} > index.html
echo "Wrote index.html"
