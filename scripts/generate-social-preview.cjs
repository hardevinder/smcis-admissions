// Run with: node scripts/generate-social-preview.cjs
const sharp = require('sharp');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

async function main() {
  const logo = await sharp(path.join(root, 'public/images/smcis/logo.png'))
    .trim().resize(250, 220, { fit: 'inside' }).png().toBuffer();
  const { width, height } = await sharp(logo).metadata();
  const artwork = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#171e57"/>
    <circle cx="1150" cy="10" r="340" fill="#202967"/>
    <circle cx="1190" cy="20" r="260" fill="none" stroke="#35407d" stroke-width="2"/>
    <rect width="1200" height="9" fill="#efc36b"/>
    <rect x="66" y="63" width="310" height="326" rx="28" fill="#ffffff"/>
    <text x="221" y="360" text-anchor="middle" fill="#1f276f" font-family="DejaVu Sans, sans-serif" font-size="21" font-weight="bold" letter-spacing="4">SMCIS</text>
    <g font-family="DejaVu Sans, sans-serif">
      <text x="426" y="104" fill="#efc36b" font-size="20" font-weight="bold" letter-spacing="3">A BRIGHT FUTURE BEGINS HERE</text>
      <text x="426" y="169" fill="white" font-size="43" font-weight="bold">Seth Malook Chand</text>
      <text x="426" y="222" fill="white" font-size="39" font-weight="bold">International School</text>
      <rect x="426" y="258" width="352" height="47" rx="23" fill="#efc36b"/>
      <text x="602" y="289" text-anchor="middle" fill="#171e57" font-size="21" font-weight="bold" letter-spacing="2">ADMISSIONS OPEN</text>
      <text x="422" y="391" fill="white" font-size="79" font-weight="bold">2027–28</text>
      <text x="68" y="450" fill="#e1e7ff" font-size="25">Begin your child’s SMCIS journey.</text>
      <text x="68" y="490" fill="#bfc9e7" font-size="22">Enquire online for class availability, fees and admission guidance.</text>
      <line x1="68" y1="527" x2="1132" y2="527" stroke="#424b7d"/>
      <text x="68" y="577" fill="white" font-size="21">Sasni, Aligarh–Agra Road, U.P.</text>
      <text x="1132" y="577" text-anchor="end" fill="#efc36b" font-size="23" font-weight="bold">7055000524 / 7055000525</text>
    </g>
  </svg>`);
  await sharp(artwork).composite([{ input: logo, left: Math.round(221 - width / 2), top: Math.round(193 - height / 2) }])
    .png().toFile(path.join(root, 'public/images/smcis/admissions-2027-28-og.png'));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
