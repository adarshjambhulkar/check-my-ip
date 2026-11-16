# check-my-ip

A lightweight, single-page web app that shows your public IPv4 and IPv6 addresses along with your IPv4 /24 subnet range.

## Features

- **IPv4 address** via [`api.ipify.org`](https://api.ipify.org)
- **IPv6 address** via [`api64.ipify.org`](https://api64.ipify.org) (shows "Not available" when your network has no IPv6 connectivity)
- **IPv4 subnet range** (`x.x.x.0` to `x.x.x.255`) with CIDR notation (`x.x.x.0/24`)
- **One-click copy** for every value, with visual confirmation
- **Dark / light theme** toggle (dark by default, preference remembered)
- **Glassmorphism UI** built on a 60-30-10 color system:
  - 60% navy base
  - 30% sky blue (`#0ea5e9`)
  - 10% orange accent (`#fb923c`)
- Responsive layout, keyboard focus styles, and reduced-motion support

## Usage

No build step or dependencies to install. Open `index.html` in a browser, or serve the folder with any static file server:

```bash
npx serve .
```

## Tech

- Plain HTML, CSS, and JavaScript
- [Bootstrap 5.3](https://getbootstrap.com/) (via CDN) for layout and toasts
- Inline SVG icons
