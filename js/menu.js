(async function () {
  const grid = document.getElementById('menuGrid');
  const filterRow = document.getElementById('menuFilterRow');

  let items = [];

  function categoryLabel(cat) { return window.WineDetail.categoryLabel(cat); }

  function renderGrid(list) {
    grid.innerHTML = '';
    if (list.length === 0) {
      grid.innerHTML = '<p style="color:var(--paper-dim)">No items in this category yet.</p>';
      return;
    }
    list.forEach(item => {
      const priceLine = (item.priceBottle && item.priceBottle !== '—')
        ? `${item.priceGlass} / ${item.priceBottle}`
        : item.priceGlass;
      const btn = document.createElement('button');
      btn.className = 'menu-item';
      btn.innerHTML = `
        <span class="tag tag-${item.category}">${categoryLabel(item.category)}</span>
        <h3>${item.name}</h3>
        <div class="producer">${item.producer} · ${item.vintage}</div>
        <div class="prices">${priceLine}</div>
      `;
      btn.addEventListener('click', () => window.WineDetail.open(item));
      grid.appendChild(btn);
    });
  }

  function buildFilters() {
    const cats = Array.from(new Set(items.map(i => i.category)));
    cats.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-chip';
      btn.dataset.filter = cat;
      btn.textContent = categoryLabel(cat);
      filterRow.appendChild(btn);
    });

    filterRow.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-chip');
      if (!btn) return;
      filterRow.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      renderGrid(cat === 'all' ? items : items.filter(i => i.category === cat));
    });
  }

  window.WineDetail.init();

  try {
    const data = await window.DataSource.load();
    items = data.wines || [];
    buildFilters();
    renderGrid(items);
  } catch (err) {
    grid.innerHTML = '<p style="color:var(--paper-dim)">Could not load the wine list.</p>';
    console.error(err);
  }
})();
