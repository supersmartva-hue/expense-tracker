// ── State ─────────────────────────────────────────────────────────────────────
let transactions = JSON.parse(localStorage.getItem("expiq_transactions")) || [];
let categoryChart = null;
let monthlyChart  = null;

// ── Currency Config ───────────────────────────────────────────────────────────
const CURRENCY_LIST = [
  // Americas
  { group: "Americas", code: "USD", symbol: "$",    dec: 2, locale: "en-US",  flag: "🇺🇸", name: "US Dollar",          country: "United States" },
  { group: "Americas", code: "CAD", symbol: "CA$",  dec: 2, locale: "en-CA",  flag: "🇨🇦", name: "Canadian Dollar",     country: "Canada" },
  { group: "Americas", code: "MXN", symbol: "$",    dec: 2, locale: "es-MX",  flag: "🇲🇽", name: "Mexican Peso",        country: "Mexico" },
  { group: "Americas", code: "BRL", symbol: "R$",   dec: 2, locale: "pt-BR",  flag: "🇧🇷", name: "Brazilian Real",      country: "Brazil" },
  { group: "Americas", code: "ARS", symbol: "$",    dec: 2, locale: "es-AR",  flag: "🇦🇷", name: "Argentine Peso",      country: "Argentina" },
  { group: "Americas", code: "CLP", symbol: "$",    dec: 0, locale: "es-CL",  flag: "🇨🇱", name: "Chilean Peso",        country: "Chile" },
  { group: "Americas", code: "COP", symbol: "$",    dec: 0, locale: "es-CO",  flag: "🇨🇴", name: "Colombian Peso",      country: "Colombia" },
  // Europe
  { group: "Europe",   code: "EUR", symbol: "€",    dec: 2, locale: "de-DE",  flag: "🇪🇺", name: "Euro",                country: "European Union" },
  { group: "Europe",   code: "GBP", symbol: "£",    dec: 2, locale: "en-GB",  flag: "🇬🇧", name: "British Pound",       country: "United Kingdom" },
  { group: "Europe",   code: "CHF", symbol: "Fr",   dec: 2, locale: "de-CH",  flag: "🇨🇭", name: "Swiss Franc",         country: "Switzerland" },
  { group: "Europe",   code: "SEK", symbol: "kr",   dec: 2, locale: "sv-SE",  flag: "🇸🇪", name: "Swedish Krona",       country: "Sweden" },
  { group: "Europe",   code: "NOK", symbol: "kr",   dec: 2, locale: "nb-NO",  flag: "🇳🇴", name: "Norwegian Krone",     country: "Norway" },
  { group: "Europe",   code: "DKK", symbol: "kr",   dec: 2, locale: "da-DK",  flag: "🇩🇰", name: "Danish Krone",        country: "Denmark" },
  { group: "Europe",   code: "PLN", symbol: "zł",   dec: 2, locale: "pl-PL",  flag: "🇵🇱", name: "Polish Zloty",        country: "Poland" },
  { group: "Europe",   code: "CZK", symbol: "Kč",   dec: 2, locale: "cs-CZ",  flag: "🇨🇿", name: "Czech Koruna",        country: "Czech Republic" },
  { group: "Europe",   code: "HUF", symbol: "Ft",   dec: 0, locale: "hu-HU",  flag: "🇭🇺", name: "Hungarian Forint",    country: "Hungary" },
  { group: "Europe",   code: "TRY", symbol: "₺",    dec: 2, locale: "tr-TR",  flag: "🇹🇷", name: "Turkish Lira",        country: "Turkey" },
  { group: "Europe",   code: "RUB", symbol: "₽",    dec: 2, locale: "ru-RU",  flag: "🇷🇺", name: "Russian Ruble",       country: "Russia" },
  { group: "Europe",   code: "UAH", symbol: "₴",    dec: 2, locale: "uk-UA",  flag: "🇺🇦", name: "Ukrainian Hryvnia",   country: "Ukraine" },
  { group: "Europe",   code: "RON", symbol: "lei",  dec: 2, locale: "ro-RO",  flag: "🇷🇴", name: "Romanian Leu",        country: "Romania" },
  // South Asia
  { group: "South Asia", code: "PKR", symbol: "₨",  dec: 2, locale: "en-PK",  flag: "🇵🇰", name: "Pakistani Rupee",    country: "Pakistan" },
  { group: "South Asia", code: "INR", symbol: "₹",  dec: 2, locale: "en-IN",  flag: "🇮🇳", name: "Indian Rupee",       country: "India" },
  { group: "South Asia", code: "BDT", symbol: "৳",  dec: 2, locale: "bn-BD",  flag: "🇧🇩", name: "Bangladeshi Taka",   country: "Bangladesh" },
  { group: "South Asia", code: "LKR", symbol: "Rs", dec: 2, locale: "si-LK",  flag: "🇱🇰", name: "Sri Lankan Rupee",   country: "Sri Lanka" },
  { group: "South Asia", code: "NPR", symbol: "Rs", dec: 2, locale: "ne-NP",  flag: "🇳🇵", name: "Nepalese Rupee",     country: "Nepal" },
  { group: "South Asia", code: "AFN", symbol: "؋",  dec: 2, locale: "ps-AF",  flag: "🇦🇫", name: "Afghan Afghani",     country: "Afghanistan" },
  // East & SE Asia
  { group: "East Asia",  code: "JPY", symbol: "¥",  dec: 0, locale: "ja-JP",  flag: "🇯🇵", name: "Japanese Yen",       country: "Japan" },
  { group: "East Asia",  code: "CNY", symbol: "¥",  dec: 2, locale: "zh-CN",  flag: "🇨🇳", name: "Chinese Yuan",       country: "China" },
  { group: "East Asia",  code: "KRW", symbol: "₩",  dec: 0, locale: "ko-KR",  flag: "🇰🇷", name: "South Korean Won",   country: "South Korea" },
  { group: "East Asia",  code: "HKD", symbol: "HK$",dec: 2, locale: "zh-HK",  flag: "🇭🇰", name: "Hong Kong Dollar",   country: "Hong Kong" },
  { group: "East Asia",  code: "SGD", symbol: "S$", dec: 2, locale: "en-SG",  flag: "🇸🇬", name: "Singapore Dollar",   country: "Singapore" },
  { group: "East Asia",  code: "MYR", symbol: "RM", dec: 2, locale: "ms-MY",  flag: "🇲🇾", name: "Malaysian Ringgit",  country: "Malaysia" },
  { group: "East Asia",  code: "THB", symbol: "฿",  dec: 2, locale: "th-TH",  flag: "🇹🇭", name: "Thai Baht",          country: "Thailand" },
  { group: "East Asia",  code: "IDR", symbol: "Rp", dec: 0, locale: "id-ID",  flag: "🇮🇩", name: "Indonesian Rupiah",  country: "Indonesia" },
  { group: "East Asia",  code: "PHP", symbol: "₱",  dec: 2, locale: "en-PH",  flag: "🇵🇭", name: "Philippine Peso",    country: "Philippines" },
  { group: "East Asia",  code: "VND", symbol: "₫",  dec: 0, locale: "vi-VN",  flag: "🇻🇳", name: "Vietnamese Dong",    country: "Vietnam" },
  { group: "East Asia",  code: "TWD", symbol: "NT$",dec: 2, locale: "zh-TW",  flag: "🇹🇼", name: "Taiwan Dollar",      country: "Taiwan" },
  // Middle East
  { group: "Middle East", code: "SAR", symbol: "﷼", dec: 2, locale: "ar-SA", flag: "🇸🇦", name: "Saudi Riyal",         country: "Saudi Arabia" },
  { group: "Middle East", code: "AED", symbol: "د.إ",dec: 2, locale: "ar-AE", flag: "🇦🇪", name: "UAE Dirham",          country: "UAE" },
  { group: "Middle East", code: "KWD", symbol: "KD", dec: 3, locale: "ar-KW", flag: "🇰🇼", name: "Kuwaiti Dinar",       country: "Kuwait" },
  { group: "Middle East", code: "QAR", symbol: "﷼", dec: 2, locale: "ar-QA", flag: "🇶🇦", name: "Qatari Riyal",        country: "Qatar" },
  { group: "Middle East", code: "BHD", symbol: "BD", dec: 3, locale: "ar-BH", flag: "🇧🇭", name: "Bahraini Dinar",      country: "Bahrain" },
  { group: "Middle East", code: "OMR", symbol: "ر.ع",dec: 3, locale: "ar-OM", flag: "🇴🇲", name: "Omani Rial",          country: "Oman" },
  { group: "Middle East", code: "JOD", symbol: "JD", dec: 3, locale: "ar-JO", flag: "🇯🇴", name: "Jordanian Dinar",     country: "Jordan" },
  { group: "Middle East", code: "ILS", symbol: "₪",  dec: 2, locale: "he-IL", flag: "🇮🇱", name: "Israeli Shekel",      country: "Israel" },
  // Africa
  { group: "Africa",   code: "ZAR", symbol: "R",    dec: 2, locale: "en-ZA",  flag: "🇿🇦", name: "South African Rand",  country: "South Africa" },
  { group: "Africa",   code: "NGN", symbol: "₦",    dec: 2, locale: "en-NG",  flag: "🇳🇬", name: "Nigerian Naira",      country: "Nigeria" },
  { group: "Africa",   code: "EGP", symbol: "E£",   dec: 2, locale: "ar-EG",  flag: "🇪🇬", name: "Egyptian Pound",      country: "Egypt" },
  { group: "Africa",   code: "GHS", symbol: "₵",    dec: 2, locale: "en-GH",  flag: "🇬🇭", name: "Ghanaian Cedi",       country: "Ghana" },
  { group: "Africa",   code: "KES", symbol: "KSh",  dec: 2, locale: "sw-KE",  flag: "🇰🇪", name: "Kenyan Shilling",     country: "Kenya" },
  { group: "Africa",   code: "MAD", symbol: "د.م.", dec: 2, locale: "ar-MA",  flag: "🇲🇦", name: "Moroccan Dirham",     country: "Morocco" },
  { group: "Africa",   code: "TZS", symbol: "TSh",  dec: 0, locale: "sw-TZ",  flag: "🇹🇿", name: "Tanzanian Shilling",  country: "Tanzania" },
  // Oceania
  { group: "Oceania",  code: "AUD", symbol: "A$",   dec: 2, locale: "en-AU",  flag: "🇦🇺", name: "Australian Dollar",   country: "Australia" },
  { group: "Oceania",  code: "NZD", symbol: "NZ$",  dec: 2, locale: "en-NZ",  flag: "🇳🇿", name: "New Zealand Dollar",  country: "New Zealand" },
];

// Quick lookup map
const CURRENCY_MAP = {};
CURRENCY_LIST.forEach(c => { CURRENCY_MAP[c.code] = c; });

let activeCurrency = localStorage.getItem("expiq_currency") || "USD";

function getCurrency() { return CURRENCY_MAP[activeCurrency] || CURRENCY_MAP.USD; }

function fmt(n) {
  const c = getCurrency();
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString(c.locale, {
    minimumFractionDigits: c.dec,
    maximumFractionDigits: c.dec
  });
  return c.symbol + formatted;
}

function fmtChart(n) { return fmt(n); }

// ── DOM ───────────────────────────────────────────────────────────────────────
const form           = document.getElementById("transaction-form");
const descInput      = document.getElementById("description");
const amountInput    = document.getElementById("amount");
const typeHidden     = document.getElementById("type");
const categoryHidden = document.getElementById("category");
const noteInput      = document.getElementById("note");
const dateInput      = document.getElementById("date");
const txnList        = document.getElementById("transaction-list");
const emptyMsg       = document.getElementById("empty-msg");
const filterType     = document.getElementById("filter-type");
const filterCat      = document.getElementById("filter-category");
const filterMonth    = document.getElementById("filter-month");
const clearAllBtn    = document.getElementById("clear-all");
const searchInput    = document.getElementById("search-input");
const exportBtn      = document.getElementById("export-btn");
const themeToggle    = document.getElementById("theme-toggle");
const themeIcon      = document.getElementById("theme-icon");
const themeLabel     = document.getElementById("theme-label");
const barYearSel     = document.getElementById("bar-year");
const countLabel     = document.getElementById("txn-count-label");
const currencyDropdown = document.getElementById("currency-dropdown");
const currencyTrigger  = document.getElementById("currency-trigger");
const currencyPanel    = document.getElementById("currency-panel");
const currencySearch   = document.getElementById("currency-search");
const currencyListEl   = document.getElementById("currency-list");
const currencyFlag     = document.getElementById("currency-flag");
const currencyCode     = document.getElementById("currency-code");
const amountLabel      = document.getElementById("amount-label");
const formBadge        = document.getElementById("form-currency-badge");

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtDate(str) {
  const [y, m, d] = str.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[+m - 1]} ${+d}, ${y}`;
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

function escapeHTML(str) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

function save() { localStorage.setItem("expiq_transactions", JSON.stringify(transactions)); }

// ── Toast ─────────────────────────────────────────────────────────────────────
function toast(msg, type = "info") {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<div class="toast-dot"></div><span>${msg}</span>`;
  document.getElementById("toast-container").appendChild(el);
  setTimeout(() => {
    el.style.animation = "fadeOut 0.3s ease forwards";
    setTimeout(() => el.remove(), 320);
  }, 2800);
}

// ── Init Date & Date Display ──────────────────────────────────────────────────
dateInput.valueAsDate = new Date();
document.getElementById("current-date").textContent = new Date().toLocaleDateString("en-US", {
  weekday: "long", year: "numeric", month: "long", day: "numeric"
});

// ── Theme ─────────────────────────────────────────────────────────────────────
const savedTheme = localStorage.getItem("expiq_theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
applyThemeUI(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("expiq_theme", next);
  applyThemeUI(next);
  refreshCharts();
});

function applyThemeUI(theme) {
  if (theme === "dark") {
    themeIcon.textContent  = "☀";
    themeLabel.textContent = "Light Mode";
  } else {
    themeIcon.textContent  = "☽";
    themeLabel.textContent = "Dark Mode";
  }
}

// ── Currency Searchable Dropdown ──────────────────────────────────────────────
function renderCurrencyList(query = "") {
  const q = query.toLowerCase().trim();
  const filtered = q
    ? CURRENCY_LIST.filter(c =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
      )
    : CURRENCY_LIST;

  if (filtered.length === 0) {
    currencyListEl.innerHTML = `<div class="currency-no-result">No currency found for "${query}"</div>`;
    return;
  }

  // Group currencies (only when no search query)
  if (!q) {
    const groups = {};
    filtered.forEach(c => {
      if (!groups[c.group]) groups[c.group] = [];
      groups[c.group].push(c);
    });

    currencyListEl.innerHTML = Object.entries(groups).map(([group, items]) => `
      <div class="currency-group-label">${group}</div>
      ${items.map(c => currencyOptionHTML(c)).join("")}
    `).join("");
  } else {
    currencyListEl.innerHTML = filtered.map(c => currencyOptionHTML(c)).join("");
  }

  // Attach click events
  currencyListEl.querySelectorAll(".currency-option").forEach(el => {
    el.addEventListener("click", () => {
      activeCurrency = el.dataset.code;
      localStorage.setItem("expiq_currency", activeCurrency);
      updateCurrencyUI();
      closeCurrencyDropdown();
      refresh();
    });
  });
}

function currencyOptionHTML(c) {
  const isSelected = c.code === activeCurrency;
  return `
    <div class="currency-option ${isSelected ? "selected" : ""}" data-code="${c.code}">
      <span class="opt-flag">${c.flag}</span>
      <span class="opt-code">${c.code}</span>
      <span class="opt-name">${c.name} &middot; ${c.country}</span>
    </div>
  `;
}

function openCurrencyDropdown() {
  currencyDropdown.classList.add("open");
  currencySearch.value = "";
  renderCurrencyList();
  currencySearch.focus();

  // Scroll to selected option
  setTimeout(() => {
    const selected = currencyListEl.querySelector(".selected");
    if (selected) selected.scrollIntoView({ block: "nearest" });
  }, 50);
}

function closeCurrencyDropdown() {
  currencyDropdown.classList.remove("open");
}

// Toggle open/close
currencyTrigger.addEventListener("click", e => {
  e.stopPropagation();
  currencyDropdown.classList.contains("open") ? closeCurrencyDropdown() : openCurrencyDropdown();
});

// Close on outside click
document.addEventListener("click", e => {
  if (!currencyDropdown.contains(e.target)) closeCurrencyDropdown();
});

// Live search filter
currencySearch.addEventListener("input", () => {
  renderCurrencyList(currencySearch.value);
});

// Prevent panel clicks from closing
currencyPanel.addEventListener("click", e => e.stopPropagation());

function updateCurrencyUI() {
  const c = getCurrency();
  currencyFlag.textContent = c.flag;
  currencyCode.textContent = c.code;
  amountLabel.textContent  = `Amount (${c.symbol})`;
  formBadge.textContent    = c.code;
}

// Init currency UI
updateCurrencyUI();

// ── Type Toggle ───────────────────────────────────────────────────────────────
document.querySelectorAll(".type-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    typeHidden.value = btn.dataset.value;
  });
});

// ── Category Buttons ──────────────────────────────────────────────────────────
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    categoryHidden.value = btn.dataset.value;
  });
});

// ── Summary ───────────────────────────────────────────────────────────────────
function updateSummary() {
  const incomes  = transactions.filter(t => t.type === "income");
  const expenses = transactions.filter(t => t.type === "expense");
  const totalIn  = incomes.reduce((s, t) => s + t.amount, 0);
  const totalExp = expenses.reduce((s, t) => s + t.amount, 0);
  const balance  = totalIn - totalExp;
  const savRate  = totalIn > 0 ? Math.round(((totalIn - totalExp) / totalIn) * 100) : 0;

  document.getElementById("balance").textContent      = (balance < 0 ? "-" : "") + fmt(balance);
  document.getElementById("total-income").textContent  = fmt(totalIn);
  document.getElementById("total-expense").textContent = fmt(totalExp);
  document.getElementById("savings-rate").textContent  = savRate + "%";
  document.getElementById("income-count").textContent  = incomes.length + " transaction" + (incomes.length !== 1 ? "s" : "");
  document.getElementById("expense-count").textContent = expenses.length + " transaction" + (expenses.length !== 1 ? "s" : "");

  const balEl = document.getElementById("balance");
  balEl.style.color = balance < 0 ? "var(--expense)" : balance === 0 ? "var(--text2)" : "var(--accent)";
}

// ── Populate Filters ──────────────────────────────────────────────────────────
function populateMonthFilter() {
  const months = new Set(transactions.map(t => t.date.slice(0, 7)));
  const sorted = [...months].sort((a, b) => b.localeCompare(a));
  filterMonth.innerHTML = `<option value="all">All Months</option>`;
  sorted.forEach(m => {
    const [y, mo] = m.split("-");
    const label = new Date(+y, +mo - 1).toLocaleString("en-US", { month: "long", year: "numeric" });
    filterMonth.innerHTML += `<option value="${m}">${label}</option>`;
  });
}

function populateYearFilter() {
  const years = [...new Set(transactions.map(t => t.date.slice(0, 4)))].sort((a, b) => b - a);
  if (years.length === 0) years.push(new Date().getFullYear().toString());
  barYearSel.innerHTML = "";
  years.forEach(y => { barYearSel.innerHTML += `<option value="${y}">${y}</option>`; });
}

// ── Render Transactions ───────────────────────────────────────────────────────
function getFiltered() {
  const typeVal  = filterType.value;
  const catVal   = filterCat.value;
  const monthVal = filterMonth.value;
  const query    = searchInput.value.trim().toLowerCase();

  return transactions
    .filter(t => {
      const okType   = typeVal  === "all" || t.type     === typeVal;
      const okCat    = catVal   === "all" || t.category === catVal;
      const okMonth  = monthVal === "all" || t.date.startsWith(monthVal);
      const okSearch = !query   || t.description.toLowerCase().includes(query) || (t.note || "").toLowerCase().includes(query);
      return okType && okCat && okMonth && okSearch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function renderTransactions() {
  const filtered = getFiltered();
  txnList.innerHTML = "";

  if (filtered.length === 0) {
    emptyMsg.style.display = "flex";
    countLabel.textContent = "Showing 0 transactions";
    return;
  }

  emptyMsg.style.display = "none";
  countLabel.textContent = `Showing ${filtered.length} transaction${filtered.length !== 1 ? "s" : ""}`;

  filtered.forEach(t => {
    const tr = document.createElement("tr");
    tr.className = `${t.type}-row`;
    tr.innerHTML = `
      <td class="txn-desc-cell">${escapeHTML(t.description)}</td>
      <td data-label="Category"><span class="txn-badge" data-cat="${t.category}">${t.category}</span></td>
      <td class="txn-date" data-label="Date">${fmtDate(t.date)}</td>
      <td class="txn-note txn-note-cell" data-label="Note">${t.note ? escapeHTML(t.note) : "—"}</td>
      <td data-label="Amount"><span class="txn-amount ${t.type}">${t.type === "income" ? "+" : "-"}${fmt(t.amount)}</span></td>
      <td class="del-cell"><button class="btn-del" data-id="${t.id}" title="Delete">&#10005;</button></td>
    `;
    txnList.appendChild(tr);
  });
}

// ── Chart Colors ──────────────────────────────────────────────────────────────
const CAT_COLORS = {
  salary:        "#7C6FFF",
  food:          "#FF6B6B",
  transport:     "#00BCD4",
  rent:          "#FFC107",
  entertainment: "#FF9800",
  shopping:      "#4CAF50",
  health:        "#E91E8C",
  utilities:     "#2196F3",
  other:         "#90A4AE"
};

// ── Doughnut Chart ────────────────────────────────────────────────────────────
function renderCategoryChart() {
  const expenses   = transactions.filter(t => t.type === "expense");
  const chartEmpty = document.getElementById("chart-empty");
  const legend     = document.getElementById("donut-legend");

  if (expenses.length === 0) {
    chartEmpty.style.display = "block";
    if (categoryChart) { categoryChart.destroy(); categoryChart = null; }
    legend.innerHTML = "";
    return;
  }

  chartEmpty.style.display = "none";

  const totals = {};
  expenses.forEach(t => { totals[t.category] = (totals[t.category] || 0) + t.amount; });
  const labels = Object.keys(totals);
  const data   = Object.values(totals);
  const colors = labels.map(l => CAT_COLORS[l] || "#888");

  if (categoryChart) categoryChart.destroy();

  categoryChart = new Chart(document.getElementById("category-chart"), {
    type: "doughnut",
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 8 }] },
    options: {
      cutout: "68%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.label}: ${fmtChart(ctx.parsed)}` }
        }
      }
    }
  });

  legend.innerHTML = labels.map((l, i) => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${colors[i]}"></div>
      <span>${l} — ${fmt(totals[l])}</span>
    </div>
  `).join("");
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────
function renderMonthlyChart() {
  const year       = barYearSel.value || new Date().getFullYear().toString();
  const monthEmpty = document.getElementById("monthly-empty");
  const MONTHS     = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const income  = new Array(12).fill(0);
  const expense = new Array(12).fill(0);

  transactions.forEach(t => {
    if (!t.date.startsWith(year)) return;
    const mo = parseInt(t.date.split("-")[1]) - 1;
    if (t.type === "income") income[mo]  += t.amount;
    else                     expense[mo] += t.amount;
  });

  const hasData = income.some(v => v > 0) || expense.some(v => v > 0);

  if (!hasData) {
    monthEmpty.style.display = "block";
    if (monthlyChart) { monthlyChart.destroy(); monthlyChart = null; }
    return;
  }

  monthEmpty.style.display = "none";

  const isDark    = document.documentElement.getAttribute("data-theme") === "dark";
  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(100,90,220,0.08)";
  const textColor = isDark ? "#8B90B8" : "#7C6FFF";

  if (monthlyChart) monthlyChart.destroy();

  monthlyChart = new Chart(document.getElementById("monthly-chart"), {
    type: "bar",
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: "Income",
          data: income,
          backgroundColor: isDark ? "rgba(0,200,150,0.75)" : "rgba(0,200,150,0.65)",
          borderRadius: 5,
          borderSkipped: false
        },
        {
          label: "Expense",
          data: expense,
          backgroundColor: isDark ? "rgba(255,77,109,0.75)" : "rgba(255,77,109,0.65)",
          borderRadius: 5,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: textColor, font: { size: 11 }, boxWidth: 12, boxHeight: 12 }
        },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${fmtChart(ctx.parsed.y)}` }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { size: 10 } }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { size: 10 },
            callback: v => getCurrency().symbol + v
          }
        }
      }
    }
  });
}

// ── Refresh ───────────────────────────────────────────────────────────────────
function refreshCharts() { renderCategoryChart(); renderMonthlyChart(); }

function refresh() {
  save();
  updateSummary();
  populateMonthFilter();
  populateYearFilter();
  renderTransactions();
  refreshCharts();
}

// ── Add Transaction ───────────────────────────────────────────────────────────
form.addEventListener("submit", e => {
  e.preventDefault();

  const description = descInput.value.trim();
  const amount      = parseFloat(amountInput.value);
  const type        = typeHidden.value;
  const category    = categoryHidden.value;
  const date        = dateInput.value;
  const note        = noteInput.value.trim();

  if (!description || isNaN(amount) || amount <= 0 || !date) {
    toast("Please fill in all required fields.", "error");
    return;
  }

  transactions.unshift({ id: uid(), description, amount, type, category, date, note, currency: activeCurrency });
  refresh();
  toast(`${type === "income" ? "Income" : "Expense"} added — ${fmt(amount)}`, "success");

  form.reset();
  dateInput.valueAsDate = new Date();

  document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
  document.querySelector('.type-btn[data-value="income"]').classList.add("active");
  typeHidden.value = "income";

  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  document.querySelector('.cat-btn[data-value="salary"]').classList.add("active");
  categoryHidden.value = "salary";
});

// ── Delete ────────────────────────────────────────────────────────────────────
txnList.addEventListener("click", e => {
  const btn = e.target.closest(".btn-del");
  if (!btn) return;
  transactions = transactions.filter(t => t.id !== btn.dataset.id);
  refresh();
  toast("Transaction deleted.", "info");
});

// ── Clear All ─────────────────────────────────────────────────────────────────
clearAllBtn.addEventListener("click", () => {
  if (transactions.length === 0) return;
  if (!confirm("Delete all transactions? This cannot be undone.")) return;
  transactions = [];
  refresh();
  toast("All transactions cleared.", "info");
});

// ── Filters & Search ──────────────────────────────────────────────────────────
filterType.addEventListener("change",  renderTransactions);
filterCat.addEventListener("change",   renderTransactions);
filterMonth.addEventListener("change", renderTransactions);
searchInput.addEventListener("input",  renderTransactions);
barYearSel.addEventListener("change",  renderMonthlyChart);

// ── Export CSV ────────────────────────────────────────────────────────────────
exportBtn.addEventListener("click", () => {
  if (transactions.length === 0) { toast("No transactions to export.", "error"); return; }

  const headers = ["Description", "Amount", "Currency", "Type", "Category", "Date", "Note"];
  const rows = transactions.map(t => [
    `"${t.description.replace(/"/g, '""')}"`,
    t.amount.toFixed(getCurrency().dec),
    activeCurrency,
    t.type,
    t.category,
    t.date,
    `"${(t.note || "").replace(/"/g, '""')}"`
  ].join(","));

  const csv  = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = `expenseiq_${activeCurrency}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast("CSV exported successfully!", "success");
});

// ── Sidebar nav active state ──────────────────────────────────────────────────
document.querySelectorAll(".nav-item").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    closeSidebar(); // close mobile sidebar on nav click
  });
});

// ── Mobile Hamburger ──────────────────────────────────────────────────────────
const sidebar        = document.getElementById("sidebar");
const hamburgerBtn   = document.getElementById("hamburger");
const sidebarOverlay = document.getElementById("sidebar-overlay");

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("visible");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("visible");
  document.body.style.overflow = "";
}

hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
});

sidebarOverlay.addEventListener("click", closeSidebar);

// ── Init ──────────────────────────────────────────────────────────────────────
populateYearFilter();
refresh();
