# 🚀 Portfolio Website

Portfolio website modern, dibangun dengan React, TypeScript, Three.js, GSAP, dan TailwindCSS.

---

## ⚡ Langkah Install & Jalankan

### Step 1 — Pastikan Node.js sudah terinstall
```bash
node -v
# Harus muncul v18.x.x atau lebih baru
# Kalau belum: download di https://nodejs.org
```

### Step 2 — Extract zip dan masuk folder
```bash
cd portfolio
```

### Step 3 — Install semua dependencies (1 command aja!)
```bash
npm install
```

### Step 4 — Jalankan!
```bash
npm run dev
```
Buka: **http://localhost:3000** 🎉

---

## 📦 Yang Terinstall Otomatis

| Package | Fungsi |
|---------|--------|
| react + react-dom | Framework UI |
| typescript | Type safety |
| vite | Build tool, dev server port 3000 |
| three + postprocessing | PixelBlast background WebGL |
| gsap | Animasi scroll + stagger |
| motion | Framer Motion animasi |
| tailwindcss | CSS utility |
| lucide-react | Icons |

---

## 🌐 Deploy Gratis

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel login
vercel
```

**Netlify:** build dulu (`npm run build`) lalu drag-drop folder `dist/` ke netlify.com/drop

---

## 🎨 Kustomisasi

**Ganti foto (9:16):** Taruh foto di `public/foto.jpg`, lalu di `AboutSection.tsx`:
```tsx
<TiltCard src="/foto.jpg" alt="Adit Kusuma" className="w-56" style={{ aspectRatio: '9/16' }} />
```

**Social links:** Edit `href` di array `SOCIAL` di `ContactSection.tsx`

**Projects:** Edit array `PROJECTS` di `ProjectsSection.tsx`

---

## Commands
```bash
npm run dev      # localhost:3000
npm run build    # build production
npm run preview  # preview build
```

