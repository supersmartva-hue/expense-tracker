# ExpenseIQ — Smart Expense Tracker

A professional, fully responsive expense tracker built with vanilla HTML, CSS, and JavaScript.

**Live Demo:** https://supersmartva-hue.github.io/expense-tracker/

---

## Features

- **Dashboard** — Net balance, total income, total expenses, and savings rate cards
- **Charts** — Doughnut chart for spending by category + monthly income vs expense bar chart
- **55+ Currencies** — Searchable dropdown with flag, currency code, name, and country (includes PKR, INR, USD, EUR, GBP, AED, SAR and more)
- **Dark / Light Mode** — Toggle with preference saved across sessions
- **Add Transactions** — Description, amount, type (income/expense), category, date, and note
- **Categories** — Salary, Food, Transport, Rent, Entertainment, Shopping, Health, Utilities, Other
- **Transaction History** — Sortable table with category-colored badges
- **Search & Filters** — Filter by type, category, and month; live search by description or note
- **CSV Export** — Download all transactions as a spreadsheet
- **localStorage** — All data persists across page refreshes
- **Fully Responsive** — Works on mobile, tablet, and desktop

---

## Responsive Breakpoints

| Breakpoint | Device | Layout |
|---|---|---|
| ≥ 1280px | Desktop | Full sidebar, 4-col stats, side-by-side charts + form |
| ≤ 1280px | Small desktop | 2-col stats, form below charts |
| ≤ 1024px | Tablet landscape | Icon sidebar, charts side-by-side |
| ≤ 768px | Tablet portrait | Hamburger sidebar overlay, stacked layout |
| ≤ 480px | Mobile | Card-style transactions, bottom sheet currency picker |
| ≤ 360px | Small phone | Single column, compact everything |

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure and semantic markup |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| JavaScript (ES6+) | All logic, localStorage, DOM rendering |
| Chart.js | Doughnut and bar charts |
| GitHub Pages | Free hosting |

---

## Project Structure

```
expense-tracker/
├── index.html    # App structure and layout
├── style.css     # All styling including dark/light themes and responsive design
└── script.js     # All logic — transactions, charts, currency, filters, export
```

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/supersmartva-hue/expense-tracker.git
   ```
2. Open `index.html` in any browser — no build step or server required.

---

## Deployment

Hosted on **GitHub Pages** from the `main` branch.

Any changes pushed to `main` automatically update the live site within ~60 seconds.

```bash
git add .
git commit -m "your message"
git push origin main
```

---

## Developer

**Nadia Mahak**
GitHub: [@supersmartva-hue](https://github.com/supersmartva-hue)
