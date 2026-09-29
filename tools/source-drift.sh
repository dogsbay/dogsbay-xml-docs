#!/usr/bin/env bash
# What has changed in the product since each page was last read against it.
#
#   tools/source-drift.sh                     every page, furthest behind first
#   tools/source-drift.sh reference/menus.md  the actual commits for one page
#
# The dogsbay-xml checkout is assumed to be beside this one; DOGSBAY_XML
# overrides that.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
manifest="$here/docs-source.yml"
repo="${DOGSBAY_XML:-$here/../dogsbay-xml}"
page="${1:-}"

[ -d "$repo/.git" ] || { echo "no dogsbay-xml checkout at $repo (set DOGSBAY_XML)" >&2; exit 2; }

# Only the page entries: a path ending .md, then a sha. This deliberately does
# not match `reconciled:` under `source:`, which is a summary, not a page.
pages=$(sed -n 's/^  \([A-Za-z0-9_./-]*\.md\): \([0-9a-f]\{7,\}\)$/\1 \2/p' "$manifest")
head=$(git -C "$repo" log --format=%h -1)

if [ -n "$page" ]; then
    sha=$(echo "$pages" | awk -v p="$page" '$1 == p {print $2}')
    [ -n "$sha" ] || { echo "$page is not listed in docs-source.yml" >&2; exit 2; }
    echo "$page: read against $sha; the product is at $head"
    echo
    git -C "$repo" log --no-merges --format='  %h %ad %s' --date=short "$sha..HEAD"
    exit 0
fi

printf '%-46s %-9s %s\n' PAGE VERIFIED BEHIND
echo "$pages" | while read -r name sha; do
    behind=$(git -C "$repo" rev-list --no-merges --count "$sha..HEAD" 2>/dev/null || echo '?')
    printf '%-46s %-9s %s\n' "$name" "$sha" "$behind"
done | sort -k3 -rn

echo
printf 'the whole set is reconciled to %s; the product is at %s\n' \
    "$(sed -n 's/^  reconciled: //p' "$manifest")" "$head"
