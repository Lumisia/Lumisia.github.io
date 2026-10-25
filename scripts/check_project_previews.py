"""Check generated preview markup: python scripts/check_project_previews.py BUILD_DIR."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys


class Markup(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.nodes = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.nodes.append((tag, dict(attrs)))


def check(root):
    nodes = Markup((root / "index.html").read_text(encoding="utf-8")).nodes
    cards = [a for t, a in nodes if "data-project-open" in a]
    dialogs = [a for t, a in nodes if t == "dialog" and "project-preview" in a.get("class", "").split()]
    assert len(cards) == len(dialogs) == 3, "Expected three project cards and three summary dialogs"
    ids = Counter(a["id"] for _, a in nodes if "id" in a)
    assert all(n == 1 for n in ids.values()), "Duplicate HTML id"
    for card in cards:
        assert ids[card["data-project-open"]] == 1, "Card has no dialog"
        target = root / unquote(urlsplit(card["href"]).path).lstrip("/") / "index.html"
        assert target.is_file(), f"Missing detail fallback: {target}"

    tabs = [a for _, a in nodes if a.get("role") == "tab"]
    panels = [a for _, a in nodes if a.get("role") == "tabpanel"]
    assert len(tabs) == len(panels) == 9, "Expected three tabs per project"
    assert sum(a.get("aria-selected") == "true" for a in tabs) == 3
    assert sum("hidden" not in a for a in panels) == 3
    for tab in tabs:
        panel = next(a for a in panels if a["id"] == tab["aria-controls"])
        assert panel["aria-labelledby"] == tab["id"]

    detail_links = [a for _, a in nodes if "preview-detail-link" in a.get("class", "").split()]
    assert {a["href"] for a in detail_links} == {a["href"] for a in cards}
    slides = [a for _, a in nodes if "data-gallery-slide" in a]
    assert len(slides) >= 11, "Missing existing responsibility screenshots"
    for tag, attrs in nodes:
        if tag == "img" and "data-gallery-image" in attrs:
            assert attrs.get("alt", "").strip(), "Gallery image needs a description"
            target = root / unquote(urlsplit(attrs["data-src"]).path).lstrip("/")
            assert target.is_file(), f"Missing gallery asset: {target}"
    assert all("open" not in d for d in dialogs), "Dialogs must start closed"
    print(f"PASS: {len(cards)} cards, {len(dialogs)} dialogs, {len(tabs)} tabs, {len(slides)} gallery images; links and assets exist")


if __name__ == "__main__":
    check(Path(sys.argv[1]))
