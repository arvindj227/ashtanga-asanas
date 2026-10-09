import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const start = html.indexOf('const PRIMARY = [');
const end = html.indexOf('[...PRIMARY, ...SECONDARY, ...FINISHING].forEach');
if (start < 0 || end < 0) throw new Error('Could not find pose tables in index.html');
const chunk = html.slice(start, end);
const data = new Function(`${chunk}; return { PRIMARY, SECONDARY, FINISHING, POSE_META, AFTER_TEXT };`)();
const out = `/* Auto-synced from index.html pose tables. Rebuild: node study/sync-poses-data.mjs */\nwindow.STUDY_DATA = ${JSON.stringify(data)};\n`;
fs.writeFileSync(path.join(root, 'study/poses-data.js'), out);
console.log('Wrote study/poses-data.js');
