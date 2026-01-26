## huhugerman-portal

A mobile-first, operational frontend portal for German language courses.
Designed to minimize cognitive load for students while acting as a clear presentation layer for backend automation and technical documentation.

This repository represents the **student-facing interface** of the huhugerman ecosystem.

---

## 🎯 Project Purpose

The portal is designed under a **Customer Success Engineering mindset**, applied to education:

* **Zero Friction Access**
  Students reach courses, forms, and materials without navigation overhead.

* **Cognitive Clarity**
  A minimalist UI focused on learning outcomes, not interface exploration.

* **Operational Transparency**
  Frontend actions map directly to backend automations (intake, tracking, progression).

---

## 🧠 Design Principles

1. **Simple-First**
   Reduced component surface area to lower maintenance and onboarding cost.

2. **Functional-First**
   Every UI element exists to support a concrete learning or operational goal.

3. **Mobile-First**
   The layout is optimized for small screens first, then progressively enhanced.

4. **Linear Flow (No Navbar)**
   Navigation is replaced by contextual CTAs to avoid decision fatigue.

---

## 🏗️ Technical Stack

* **Framework:** [Astro](https://astro.build/)
  Static-first architecture for speed, SEO, and long-term stability.

* **Styling:** Native CSS3
  Custom design system (dark mode, minimal, functional).

* **Deployment:** [Vercel](https://vercel.com/)
  Edge-ready, Git-based deployments.

* **Forms & Automation:** Google Apps Script (GAS)
  Used for intake, credential handling, and backend workflows.

---

## 🧩 Architecture Overview

* **Home**

  * Two primary course cards (Alemán 1, Alemán 2)
  * Inline disclosure of intake forms via `<details>`

* **Roadmap**

  * 10-week asynchronous reinforcement structure
  * Mirrors in-person sessions (Monday & Wednesday)

* **Toolbox**

  * Curated external linguistic resources
  * No content duplication, only trusted references

---

## 🔗 Ecosystem Relationship

This frontend is conceptually and operationally coupled with:

👉 **[huhugerman-cse](https://github.com/yassergandhi/huhugerman-cse)**

That repository contains:

* Business logic
* Automation scripts
* Operational documentation
* CSE-oriented architectural decisions

This portal acts as the **presentation layer** of that system.

---

## 🛠️ Local Development

```bash
# Clone repository
git clone https://github.com/yassergandhi/huhugerman-portal.git

# Install dependencies
npm install

# Run local dev server
npm run dev
```

Astro will start a local server with hot reload enabled.

---

## 🚀 Deployment

The project is deployed via **Vercel**, using Git-based continuous deployment.

Domain management is handled through **Cloudflare DNS**.

---

## 📄 License

Private / Educational use.
All rights reserved.

