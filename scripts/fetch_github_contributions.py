"""GitHub 기여 달력을 연도별로 받아 data/github_contributions.json에 저장한다.

GITHUB_TOKEN(또는 METRICS_TOKEN) 환경변수의 토큰으로 GraphQL을 호출한다.
실패하면 기존 파일을 그대로 두고 0이 아닌 코드로 끝낸다.
"""
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import date, datetime, timedelta, timezone

API = "https://api.github.com/graphql"
QUERY = """
query($login:String!, $from:DateTime!, $to:DateTime!) {
  user(login: $login) {
    createdAt
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}
"""


def call(token, login, start, end):
    body = json.dumps({
        "query": QUERY,
        "variables": {
            "login": login,
            "from": f"{start.isoformat()}T00:00:00Z",
            "to": f"{end.isoformat()}T23:59:59Z",
        },
    }).encode()
    req = urllib.request.Request(
        API,
        data=body,
        headers={
            "Authorization": f"bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "lumisia-portfolio",
        },
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        payload = json.load(resp)
    if "errors" in payload:
        raise RuntimeError(payload["errors"])
    return payload["data"]["user"]


def build_range(token, login, range_id, label, start, end):
    """GitHub가 돌려준 주 단위 격자를 그대로 쓰되, 기간 밖 날짜는 None으로 비운다."""
    user = call(token, login, start, end)
    cal = user["contributionsCollection"]["contributionCalendar"]
    weeks = []
    for week in cal["weeks"]:
        days = {d["date"]: d["contributionCount"] for d in week["contributionDays"]}
        first = date.fromisoformat(week["contributionDays"][0]["date"])
        sunday = first - timedelta(days=first.weekday() + 1 if first.weekday() != 6 else 0)
        weeks.append([days.get((sunday + timedelta(days=i)).isoformat()) for i in range(7)])
    first_day = cal["weeks"][0]["contributionDays"][0]["date"]
    first = date.fromisoformat(first_day)
    grid_start = first - timedelta(days=first.weekday() + 1 if first.weekday() != 6 else 0)
    return {
        "id": range_id,
        "label": label,
        "total": cal["totalContributions"],
        "from": start.isoformat(),
        "to": end.isoformat(),
        "start": grid_start.isoformat(),
        "weeks": weeks,
    }, user["createdAt"]


def main():
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("METRICS_TOKEN")
    login = os.environ.get("GITHUB_LOGIN", "Lumisia")
    if not token:
        print("no token (GITHUB_TOKEN / METRICS_TOKEN); skipping", file=sys.stderr)
        return 1

    today = datetime.now(timezone.utc).date()
    ranges = []

    recent, created_at = build_range(
        token, login, "recent", "최근 1년", today - timedelta(days=364), today
    )
    ranges.append(recent)

    first_year = date.fromisoformat(created_at[:10]).year
    for year in range(today.year, first_year - 1, -1):
        start = date(year, 1, 1)
        end = min(date(year, 12, 31), today)
        block, _ = build_range(token, login, str(year), f"{year}년", start, end)
        if block["total"] == 0 and year != today.year:
            continue
        ranges.append(block)

    out = {
        "user": login,
        "updated": today.isoformat(),
        "ranges": ranges,
    }
    os.makedirs("data", exist_ok=True)
    with open("data/github_contributions.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    print(f"wrote {len(ranges)} ranges; recent total {recent['total']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
