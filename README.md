# CTV - Sau Tim Tro

Ung dung TanStack Start/React cho du an tim phong tro o Da Nang.

## Chay local

```bash
bun install
bun run dev
```

Neu dung npm:

```bash
npm install
npm run dev
```

## Build

```bash
bun run build
```

## Deploy len Vercel

Vercel ho tro TanStack Start thong qua Nitro. Du an nay da them `nitro` vao `vite.config.ts`, nen co the import repo GitHub vao Vercel va de Vercel tu nhan build command.

Thiet lap tren Vercel:

- Framework Preset: `Other` hoac Vercel auto-detect TanStack Start
- Build Command: `bun run build` hoac `npm run build`
- Install Command: `bun install` hoac `npm install`

Deploy bang CLI neu da dang nhap Vercel:

```bash
npx vercel --prod
```

## Push len GitHub

```bash
git init
git add .
git commit -m "Prepare app for Vercel deployment"
git branch -M main
git remote add origin https://github.com/AnhDuybugde/ctv.git
git push -u origin main
```
