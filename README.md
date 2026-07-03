# SMCIS Admissions Landing Page

A modern Next.js admission enquiry landing page for Seth Malook Chand International School.

## API

The enquiry form submits to:

```bash
https://api-smcis.edubridgeerp.in/enquiries
```

You can change the base API with:

```bash
NEXT_PUBLIC_API_URL=https://api-smcis.edubridgeerp.in
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4566`.

## Production

```bash
npm run build
npm run start
```

The default production start command uses `127.0.0.1:4566` for nginx/PM2 deployment.
