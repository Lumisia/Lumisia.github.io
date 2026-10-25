(() => {
  const root = document.querySelector('[data-gh-contrib]');
  const source = document.querySelector('[data-gh-data]');
  if (!root || !source) return;

  let data;
  try {
    data = JSON.parse(source.textContent);
  } catch (error) {
    return;
  }
  if (!data || !Array.isArray(data.ranges) || !data.ranges.length) return;

  const select = root.querySelector('[data-gh-range]');
  const totalEl = root.querySelector('[data-gh-total]');
  const periodEl = root.querySelector('[data-gh-period]');
  const monthsEl = root.querySelector('[data-gh-months]');
  const gridEl = root.querySelector('[data-gh-grid]');
  const formatCount = new Intl.NumberFormat('ko-KR');

  // 0은 항상 빈 칸. 나머지는 활동한 날의 분포를 사분위로 끊어 4단계로 나눈다.
  // 최대치로 나누면 큰 하루 하나에 다른 날이 전부 1단계로 눌려서 분포가 안 보인다.
  function thresholdsFor(weeks) {
    const counts = [];
    weeks.forEach((week) => week.forEach((count) => { if (count) counts.push(count); }));
    if (!counts.length) return [1, 2, 3];
    counts.sort((a, b) => a - b);
    const at = (ratio) => counts[Math.min(counts.length - 1, Math.floor(counts.length * ratio))];
    return [at(0.25), at(0.5), at(0.75)];
  }

  function levelOf(count, cuts) {
    if (!count) return 0;
    if (count <= cuts[0]) return 1;
    if (count <= cuts[1]) return 2;
    if (count <= cuts[2]) return 3;
    return 4;
  }

  function dayLabel(iso, count) {
    const [year, month, day] = iso.split('-');
    return `${year}년 ${Number(month)}월 ${Number(day)}일 · ${count}건`;
  }

  function render(range) {
    const cuts = thresholdsFor(range.weeks);
    const start = new Date(`${range.start}T00:00:00Z`);

    totalEl.textContent = formatCount.format(range.total);
    periodEl.textContent = `${range.from.replace(/-/g, '.')} ~ ${range.to.replace(/-/g, '.')}`;

    const months = [];
    const cells = [];
    let lastMonth = -1;
    range.weeks.forEach((week, weekIndex) => {
      const weekStart = new Date(start.getTime() + weekIndex * 7 * 86400000);
      const month = weekStart.getUTCMonth();
      // 이 주에 달이 바뀌고 라벨이 잘리지 않을 만큼 주가 남았을 때만 표시한다.
      if (month !== lastMonth && weekIndex < range.weeks.length - 2) {
        months.push(`<span style="grid-column:${weekIndex + 1}">${month + 1}월</span>`);
        lastMonth = month;
      }
      week.forEach((count, dayIndex) => {
        if (count === null || count === undefined) {
          cells.push(`<i data-level="-1" style="grid-area:${dayIndex + 1}/${weekIndex + 1}"></i>`);
          return;
        }
        const iso = new Date(weekStart.getTime() + dayIndex * 86400000).toISOString().slice(0, 10);
        cells.push(
          `<i data-level="${levelOf(count, cuts)}" style="grid-area:${dayIndex + 1}/${weekIndex + 1}" title="${dayLabel(iso, count)}"></i>`,
        );
      });
    });

    const columns = `repeat(${range.weeks.length}, 1fr)`;
    monthsEl.style.gridTemplateColumns = columns;
    gridEl.style.gridTemplateColumns = columns;
    monthsEl.innerHTML = months.join('');
    gridEl.innerHTML = cells.join('');
    gridEl.setAttribute('aria-label', `${range.label} GitHub 기여 ${range.total}건`);
  }

  function show(id) {
    const range = data.ranges.find((item) => item.id === id) || data.ranges[0];
    render(range);
  }

  if (select) {
    select.addEventListener('change', () => show(select.value));
    select.value = data.ranges[0].id;
  }
  show(data.ranges[0].id);
})();
