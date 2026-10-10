(() => {
  const IMG = '../images/poses/';
  const hubList = document.getElementById('hub-list');
  const viewHub = document.getElementById('view-hub');
  const viewDrill = document.getElementById('view-drill');
  const drillBody = document.getElementById('drill-body');
  const drillCard = document.getElementById('drill-card');
  const drillTitle = document.getElementById('drill-title');
  const drillTools = document.getElementById('drill-tools');
  const tabLearn = document.getElementById('tab-learn');
  const tabRecall = document.getElementById('tab-recall');
  const hubListWrap = document.getElementById('hub-list-wrap');
  const studyProgressMeta = document.getElementById('study-progress-meta');
  const studyProgressFill = document.getElementById('study-progress-fill');

  const { PRIMARY, SECONDARY, FINISHING, POSE_META, AFTER_TEXT } = window.STUDY_DATA;
  const POSE_IMAGE_BG = window.POSE_IMAGE_BG || {};
  const PAPER_RGB = [253, 250, 247];

  function poseImgKey(src) {
    const i = src.indexOf('images/poses/');
    if (i < 0) return null;
    return src.slice(i).split('?')[0];
  }

  function poseImgBgHex(src) {
    const key = poseImgKey(src);
    const hex = key && POSE_IMAGE_BG[key];
    if (!hex) return null;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const nearPaper = Math.max(
      Math.abs(r - PAPER_RGB[0]),
      Math.abs(g - PAPER_RGB[1]),
      Math.abs(b - PAPER_RGB[2]),
    ) <= 12;
    return nearPaper ? '#FDFAF7' : hex;
  }

  function poseImgBgAttr(src) {
    const hex = poseImgBgHex(src);
    return hex ? ` style="background:${hex}"` : '';
  }

  function poseFig(src, imgAttrs = 'loading="lazy" decoding="async"') {
    return `<div class="fig"${poseImgBgAttr(src)}><img src="${src}" alt="" ${imgAttrs}></div>`;
  }

  const ALL_POSES = [...PRIMARY, ...SECONDARY, ...FINISHING]
    .filter(p => !p.skip && p.img)
    .map(p => ({ ...p, ...(POSE_META[p.id] || {}), img: '../' + p.img }));

  let hubMode = 'learn';
  let drillId = null;

  const HUB = {
    learn: [
      { id: 'count', title: 'Vinyasa count', sub: 'Every pose, step by step', img: IMG + 'suryanamaskar_a_400.png' },
      { id: 'roots', title: 'Name roots', sub: 'Names that break into parts', img: IMG + '003_utthita_trikonasana_400.png' },
      { id: 'gaze', title: 'Nine drishtis', sub: 'Reference, then gaze by pose', img: IMG + '014_utkatasana_400.png' },
      { id: 'breath', title: 'Breath pacer', sub: 'Ujjāyī rhythm and holds', img: IMG + 'samasthiti_400.png', href: 'breath-pacer.html' },
    ],
    recall: [
      { id: 'count', title: 'Vinyasa count', sub: 'Which count is the hold?', img: IMG + '027_marichyasana_a_400.png' },
      { id: 'gaze', title: 'Gaze and breath', sub: '20 questions, shuffled', img: IMG + '031_navasana_400.png' },
      { id: 'roots', title: 'Name roots', sub: '20 questions, shuffled', img: IMG + '001_padangusthasana_400.png' },
      { id: 'order', title: 'Order the sequence', sub: '10 rounds, five poses each', img: IMG + '005_utthita_parsvakonasana_400.png' },
    ],
  };

  const NUM = {
    1: ['ekam', 'एकम्'], 2: ['dve', 'द्वे'], 3: ['trīṇi', 'त्रीणि'], 4: ['catvāri', 'चत्वारि'],
    5: ['pañca', 'पञ्च'], 6: ['ṣaṭ', 'षट्'], 7: ['sapta', 'सप्त'], 8: ['aṣṭau', 'अष्टौ'],
    9: ['nava', 'नव'], 10: ['daśa', 'दश'], 11: ['ekādaśa', 'एकादश'], 12: ['dvādaśa', 'द्वादश'],
    13: ['trayodaśa', 'त्रयोदश'], 14: ['caturdaśa', 'चतुर्दश'], 15: ['pañcadaśa', 'पञ्चदश'],
    16: ['ṣoḍaśa', 'षोडश'], 17: ['saptadaśa', 'सप्तदश'], 18: ['aṣṭādaśa', 'अष्टादश'],
    19: ['ekonaviṃśatiḥ', 'एकोनविंशतिः'], 20: ['viṃśatiḥ', 'विंशतिः'],
    21: ['ekāviṃśatiḥ', 'एकाविंशतिः'], 22: ['dvāviṃśatiḥ', 'द्वाविंशतिः'],
    23: ['trayoviṃśatiḥ', 'त्रयोविंशतिः'], 24: ['caturviṃśatiḥ', 'चतुर्विंशतिः'],
    25: ['pañcaviṃśatiḥ', 'पञ्चविंशतिः'], 26: ['ṣaḍviṃśatiḥ', 'षड्विंशतिः'],
    27: ['saptaviṃśatiḥ', 'सप्तविंशतिः'], 28: ['aṣṭāviṃśatiḥ', 'अष्टाविंशतिः'],
  };

  function countName(n, breath) {
    if (!n) return breath === 'Rest' ? ['rest', ''] : ['samasthiti', 'समस्थिति'];
    return NUM[n];
  }

  function countOptionLabel(n) {
    if (!NUM[n]) return String(n);
    return `${NUM[n][0]} (${n})`;
  }

  function setDrillTools(html) {
    if (drillTools) drillTools.innerHTML = html || '';
  }

  function setStudyProgress(label, current = 0, total = 0) {
    if (studyProgressMeta) studyProgressMeta.textContent = label;
    if (studyProgressFill) {
      studyProgressFill.style.width = total > 0
        ? `${Math.min(100, (current / total) * 100)}%`
        : '0%';
    }
  }

  function learnJumpTools(poseIndex, list) {
    return compactPosePicker(poseIndex, list);
  }

  function recallShell(mainHtml, footHtml) {
    if (drillCard) drillCard.classList.add('has-recall-foot');
    return `<div class="recall-layout"><div class="recall-main">${mainHtml}</div><div class="recall-foot">${footHtml}</div></div>`;
  }

  function bindRecallNext(next, onNext, hidden = true) {
    if (hidden) next.classList.add('hidden');
    next.onclick = onNext;
  }

  function bindRecallOpts(opts, answer, onDone) {
    let locked = false;
    opts.forEach(b => {
      b.onclick = () => {
        if (locked) return;
        locked = true;
        const ok = +b.dataset.a === answer;
        b.classList.add(ok ? 'good' : 'bad');
        if (!ok) opts.find(o => +o.dataset.a === answer)?.classList.add('good');
        opts.forEach(o => { o.disabled = true; });
        onDone(ok);
      };
    });
  }

  const TRADITIONAL_NAME_GLOSS = 'Part of the traditional name.';
  const GENERIC_GLOSS = new Set([
    TRADITIONAL_NAME_GLOSS,
    'Traditional pose name.',
    'A name element.',
  ]);
  const ASANA_GLOSS = 'A seat. The pose.';

  function isTeachablePart(part) {
    return part && !GENERIC_GLOSS.has(part[1]);
  }

  function devHtml(text) {
    if (!text) return '';
    return `<span class="dev">${text}</span>`;
  }

  function countDevHtml(dev) {
    if (!dev) return '';
    return `<div class="dev">${dev}</div>`;
  }

  function rootsDisplayParts(pose) {
    return poseParts(pose).filter(p => strip(p[0]) !== 'asana' && isTeachablePart(p));
  }

  const QUIZ_LEN = 20;
  const ORDER_ROUNDS = 10;

  const DRISHTI = [
    ['aṅguṣṭhamadhye', 'अङ्गुष्ठमध्ये', 'Between the thumbs', 'Utkaṭāsana, Vīrabhadrāsana'],
    ['nāsāgrai', 'नासाग्रै', 'Tip of the nose', 'Most standing poses, finishing'],
    ['pādāgrai', 'पादाग्रै', 'Toes', 'Forward folds, many seated poses'],
    ['hastāgrai', 'हस्ताग्रै', 'Hands', 'Utthita Trikoṇāsana'],
    ['parśva', 'पार्श्व', 'Far to the side', 'Twists such as Marīcyāsana C'],
    ['ūrdhva', 'ऊर्ध्व', 'Up', 'Upward gaze'],
    ['nābhicakre', 'नाभिचक्रे', 'Navel', 'Ūrdhva Daṇḍāsana'],
    ['bhrūmadhye', 'भ्रूमध्ये', 'Third eye', 'Long holds, some inversions'],
    ['aṅguṣṭhāgre', 'अङ्गुष्ठाग्रे', 'Tip of the thumb', 'Some variations'],
  ];

  const ROOT_GLOSS = [
    ['samasthiti', 'Equal standing. Steady and upright.'],
    ['sūrya', 'The sun.'],
    ['namaskāra', 'A bow, a salutation.'],
    ['pāda', 'Foot.'],
    ['aṅguṣṭha', 'Big toe or thumb.'],
    ['hasta', 'Hand.'],
    ['utthita', 'Extended, risen.'],
    ['tri', 'Three.'],
    ['koṇa', 'Angle.'],
    ['parivrtta', 'Revolved, turned.'],
    ['pārśva', 'Side.'],
    ['prasārita', 'Spread wide.'],
    ['uttāna', 'Intense stretch.'],
    ['paścima', 'West. In the body, the back.'],
    ['pūrva', 'East. In the body, the front.'],
    ['ardha', 'Half.'],
    ['baddha', 'Bound.'],
    ['padma', 'Lotus.'],
    ['janu', 'Knee.'],
    ['śīrṣa', 'Head.'],
    ['marīci', 'Sage Marīci.'],
    ['nāva', 'Boat.'],
    ['bhuja', 'Arm.'],
    ['pīḍa', 'Pressure.'],
    ['kūrma', 'Tortoise.'],
    ['supta', 'Reclining.'],
    ['garbha', 'Womb.'],
    ['piṇḍa', 'Embryo, ball.'],
    ['kukkuṭa', 'Rooster.'],
    ['upaviṣṭha', 'Seated.'],
    ['ubhaya', 'Both.'],
    ['ūrdhva', 'Upward.'],
    ['mukha', 'Face.'],
    ['setu', 'Bridge.'],
    ['bandha', 'Lock, bond.'],
    ['vīra', 'Hero.'],
    ['bhadra', 'Friend, auspicious.'],
    ['utkaṭa', 'Fierce, powerful.'],
    ['daṇḍa', 'Staff, stick.'],
    ['triyaṅga', 'Three limbs.'],
    ['mukhaikapāda', 'One foot before the face.'],
    ['pāśa', 'Noose.'],
    ['kroñca', 'Heron.'],
    ['śalabha', 'Locust.'],
    ['bheka', 'Frog.'],
    ['dhanu', 'Bow.'],
    ['uṣṭra', 'Camel.'],
    ['vajra', 'Thunderbolt.'],
    ['laghu', 'Small, light.'],
    ['kapota', 'Pigeon.'],
    ['baka', 'Crane.'],
    ['bharadvāja', 'Sage Bharadvāja.'],
    ['matsya', 'Fish.'],
    ['matsyendra', 'Lord of the fishes.'],
    ['eka', 'One.'],
    ['dvi', 'Two.'],
    ['yoga', 'Yoga.'],
    ['nidrā', 'Sleep.'],
    ['ṭiṭṭibha', 'Firefly.'],
    ['pincha', 'Feather.'],
    ['mayūra', 'Peacock.'],
    ['karāṇḍava', 'Duck.'],
    ['nakra', 'Crocodile.'],
    ['vātāyana', 'Horse, window.'],
    ['parigha', 'Gate bar.'],
    ['gomukha', 'Cow face.'],
    ['mukta', 'Free.'],
    ['hala', 'Plough.'],
    ['karṇa', 'Ear.'],
    ['bāla', 'Child.'],
    ['mudrā', 'Seal.'],
    ['utpluti', 'Floating, scales.'],
    ['śava', 'Corpse.'],
    ['āsana', 'A seat. The pose.'],
  ].sort((a, b) => b[0].length - a[0].length);

  function strip(s) {
    return s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z]/g, '');
  }

  function afterText(pose) {
    if (!pose.after) return '';
    return AFTER_TEXT[pose.after] || pose.after;
  }

  function glossKeyAt(rest) {
    let best = null;
    let bestLen = 0;
    for (const [k, g] of ROOT_GLOSS) {
      const sk = strip(k);
      if (sk.length < 2) continue;
      const variants = [sk];
      if (sk.length > 4) variants.push(sk.slice(1));
      for (const v of variants) {
        if (rest.startsWith(v) && v.length > bestLen) {
          best = [k, g];
          bestLen = v.length;
        }
      }
    }
    return best ? { hit: best, len: bestLen } : null;
  }

  function glossLoose(rest) {
    const exact = ROOT_GLOSS.find(([k]) => strip(k) === rest);
    if (exact) return exact;
    return ROOT_GLOSS.find(([k]) => {
      const sk = strip(k);
      return sk.length > rest.length && sk.startsWith(rest) && sk.length - rest.length <= 2;
    }) || null;
  }

  function pushAsana(parts) {
    parts.push(['āsana', ASANA_GLOSS]);
  }

  function fragmentFromWord(word, stripTarget) {
    const t = stripTarget;
    if (!t) return word;
    for (let i = 0; i < word.length; i++) {
      for (let j = word.length; j > i; j--) {
        if (strip(word.slice(i, j)) === t) return word.slice(i, j);
      }
    }
    return word;
  }

  function pushTraditionalFragment(parts, word, stripRest) {
    parts.push([fragmentFromWord(word, stripRest), TRADITIONAL_NAME_GLOSS]);
  }

  function compoundParts(word, { learn = false } = {}) {
    let rest = strip(word).replace(/h$/, '');
    const parts = [];
    let asanaSuffix = false;
    if (rest === 'asana' || rest === 'sana') {
      pushAsana(parts);
      return parts;
    }
    if (rest.endsWith('asana') && rest.length > 5) {
      asanaSuffix = true;
      rest = rest.slice(0, -5);
    }
    while (rest.length > 0) {
      const exact = ROOT_GLOSS.find(([k]) => strip(k) === rest);
      if (exact) {
        parts.push(exact);
        rest = '';
        break;
      }
      const match = glossKeyAt(rest);
      if (match) {
        parts.push(match.hit);
        rest = rest.slice(match.len);
        continue;
      }
      const loose = glossLoose(rest);
      if (loose) {
        parts.push(loose);
        rest = rest.slice(strip(loose[0]).length);
        continue;
      }
      if (learn && rest.length) {
        pushTraditionalFragment(parts, word, rest);
      }
      break;
    }
    if (asanaSuffix) pushAsana(parts);
    return parts;
  }

  function cleanParts(parts, pose, { keepTraditional = false } = {}) {
    const base = strip(pose.s.replace(/\s+[A-D](\s*,.*)?$/, ''));
    const seen = new Set();
    return parts.filter(([label, gloss]) => {
      const isTrad = GENERIC_GLOSS.has(gloss);
      if (isTrad && !keepTraditional) return false;
      const s = strip(label);
      if (!isTrad && (s === base || s.length >= base.length - 1 && base.includes(s) && s.length > 8)) return false;
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });
  }

  function poseParts(pose) {
    const base = pose.s.replace(/\s+[A-D](\s*,.*)?$/, '').trim();
    const words = base.split(/\s+/);
    const raw = words.length > 1
      ? words.flatMap(w => compoundParts(w))
      : compoundParts(base);
    const cleaned = cleanParts(raw, pose);
    if (cleaned.length) return cleaned;
    const fallback = compoundParts(base.replace(/\s+/g, ''));
    const merged = cleanParts(fallback, pose);
    if (merged.length) return merged;
    return [];
  }

  function nonAsanaParts(pose) {
    return poseParts(pose).filter(p => strip(p[0]) !== 'asana');
  }

  function hasUsefulRoots(pose) {
    return nonAsanaParts(pose).length > 0;
  }

  const ROOT_POSES = ALL_POSES.filter(hasUsefulRoots);

  function poseLearnParts(pose) {
    const base = pose.s.replace(/\s+[A-D](\s*,.*)?$/, '').trim();
    const words = base.split(/\s+/);
    const raw = words.length > 1
      ? words.flatMap(w => compoundParts(w, { learn: true }))
      : compoundParts(base, { learn: true });
    let cleaned = cleanParts(raw, pose, { keepTraditional: true });
    if (cleaned.length) return cleaned;
    const fallback = compoundParts(base.replace(/\s+/g, ''), { learn: true });
    cleaned = cleanParts(fallback, pose, { keepTraditional: true });
    return cleaned;
  }

  function posePartsForLearn(pose) {
    if (!nonAsanaParts(pose).length) return [];
    return poseLearnParts(pose);
  }

  const ROOT_LABEL_POOL = ROOT_GLOSS.map(([k]) => k).filter(k => strip(k) !== 'asana');
  const GLOSS_MEANING_POOL = [...new Set(ROOT_GLOSS.map(([, g]) => g).filter(g => g !== ASANA_GLOSS))];

  function buildRootQuestions() {
    const qs = [];
    ROOT_POSES.forEach(pose => {
      const use = rootsDisplayParts(pose).filter(isTeachablePart);
      if (!use.length) return;
      const pick = shuffle(use)[0];
      const glossPlain = pick[1].replace(/\.$/, '');
      if (Math.random() < 0.5) {
        const wrong = shuffle(ROOT_LABEL_POOL.filter(r => r !== pick[0])).slice(0, 3);
        const options = shuffle([pick[0], ...wrong]);
        qs.push({
          mode: 'pick-root',
          q: `Which root means “${glossPlain}”?`,
          options,
          answer: options.indexOf(pick[0]),
        });
      } else {
        const wrong = shuffle(GLOSS_MEANING_POOL.filter(g => g !== pick[1])).slice(0, 3);
        const options = shuffle([pick[1], ...wrong]);
        qs.push({
          mode: 'pick-gloss',
          q: `What does “${pick[0]}” mean?`,
          options,
          answer: options.indexOf(pick[1]),
        });
      }
    });
    return qs;
  }

  function gazeChoice(gazeText) {
    const g = (gazeText || '').split(',')[0].trim();
    if (g.includes('Hand')) return 'Hand';
    if (g.includes('Foot')) return 'Foot';
    if (g.includes('Thumb')) return 'Thumbs';
    if (g.includes('Side')) return 'Side';
    if (g.includes('Up')) return 'Up';
    if (g.includes('Third')) return 'Third eye';
    if (g.includes('Navel')) return 'Navel';
    if (g.includes('Eye')) return 'Eyes closed';
    return 'Nose';
  }

  function buildGazeQuestions() {
    const gazePool = ['Nose', 'Hand', 'Foot', 'Thumbs', 'Side', 'Up', 'Third eye', 'Navel', 'Eyes closed'];
    const holdPool = ['5 breaths', '5 each side', '5 to 10', '10 to 25 breaths', '10 to 20 minutes', 'A few breaths'];
    const qs = [];
    ALL_POSES.forEach(pose => {
      if (pose.gaze) {
        const norm = gazeChoice(pose.gaze);
        const opts = shuffle([norm, ...shuffle(gazePool.filter(x => x !== norm)).slice(0, 3)]);
        qs.push({
          pose,
          kind: 'gaze',
          q: `Where is the gaze in ${pose.s}?`,
          hidePoseName: true,
          options: opts,
          answer: opts.indexOf(norm),
        });
      }
      if (pose.rep) {
        const repPool = ['Nothing else', pose.rep, '3 to 5 rounds', 'Nine rolls', '5 jumps forward and back'];
        const options = shuffle([...new Set(repPool)]).slice(0, 4);
        if (!options.includes(pose.rep)) options[0] = pose.rep;
        const qText = pose.rep.includes('roll')
          ? `Along with the five breaths in ${pose.s}?`
          : `What repeats in ${pose.s}?`;
        qs.push({
          pose,
          kind: 'rep',
          q: qText,
          hidePoseName: true,
          options,
          answer: options.indexOf(pose.rep),
        });
      }
      const holdText = pose.hold || pose.breaths;
      if (holdText) {
        const choices = shuffle([...new Set([holdText, ...holdPool.filter(x => x !== holdText)])].slice(0, 4));
        while (choices.length < 4) choices.push('5 breaths');
        qs.push({
          pose,
          kind: 'hold',
          q: `How long is ${pose.s} held?`,
          hidePoseName: true,
          options: choices,
          answer: choices.indexOf(holdText),
        });
      }
    });
    return qs;
  }

  function buildCountQuestions() {
    const qs = [];
    ALL_POSES.forEach(pose => {
      const count = window.VINYASA[pose.id];
      if (count && count.ask) {
        qs.push({ type: 'round', round: { img: pose.img, name: pose.s }, ask: count.ask });
      }
      const holds = ((count && count.holds) || []).filter(n => n > 0);
      if (count && holds.length && !count.ask) {
        const n = holds[0];
        const near = [n - 2, n - 1, n + 1, n + 2, n + 7, n - 7, 5, 8, 9, 15]
          .filter(x => x !== n && x >= 1 && NUM[x]);
        const picks = [];
        near.forEach(x => { if (!picks.includes(x) && picks.length < 3) picks.push(x); });
        const correct = countOptionLabel(n);
        const options = shuffle([correct, ...picks.map(x => countOptionLabel(x))]);
        const next = holds[1] ? ` The next hold is ${countOptionLabel(holds[1])}.` : '';
        qs.push({
          type: 'pose',
          pose,
          q: `Which count is the hold in ${pose.s}?`,
          hidePoseName: true,
          options,
          answer: options.indexOf(correct),
          why: `${correct}.${next}`,
        });
      }
      if (pose.rep) {
        const opts = shuffle(['Nothing else', pose.rep, '9 rolls', 'A vinyasa each side']);
        qs.push({
          type: 'pose',
          pose,
          q: `What is special in ${pose.s}?`,
          hidePoseName: true,
          options: opts,
          answer: opts.indexOf(pose.rep),
          why: pose.rep,
        });
      }
      const holdText = pose.hold || pose.breaths;
      if (holdText && !(count && holds.length && !count.ask)) {
        const opts = shuffle(['5 breaths', '5 each side', holdText, '10 to 25 breaths']);
        qs.push({
          type: 'pose',
          pose,
          q: `How long is ${pose.s} held?`,
          hidePoseName: true,
          options: opts,
          answer: opts.indexOf(holdText),
          why: holdText,
        });
      }
    });
    return qs;
  }

  const ORDER_CHUNKS = [];
  for (let i = 0; i < ALL_POSES.length; i += 5) {
    const slice = ALL_POSES.slice(i, i + 5);
    if (slice.length < 3) continue;
    ORDER_CHUNKS.push({
      title: `${slice[0].s} through ${slice[slice.length - 1].s}`,
      poses: slice.map(p => [p.s, p.img, p.e || p.s.split(' ')[0]]),
    });
  }

  let ROOT_QS = buildRootQuestions();
  let GAZE_QS = buildGazeQuestions();
  let COUNT_QS = buildCountQuestions();

  function shuffle(a) {
    const b = [...a];
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  }

  function recallDeck(buildFn) {
    const deck = shuffle(buildFn());
    return deck.slice(0, Math.min(QUIZ_LEN, deck.length));
  }

  function btnNext(label, id = 'main-next', hidden = false) {
    return `<button type="button" class="btn-next-study${hidden ? ' hidden' : ''}" id="${id}">${label}</button>`;
  }

  function rowGhost(prevLabel, nextLabel, prevId, nextId, prevOff, nextOff) {
    return `<div class="row-ghost">
      <button type="button" class="btn-ghost" id="${prevId}" ${prevOff ? 'disabled' : ''}>${prevLabel}</button>
      <button type="button" class="btn-ghost" id="${nextId}" ${nextOff ? 'disabled' : ''}>${nextLabel}</button>
    </div>`;
  }

  function posePicker(index, list = ALL_POSES) {
    return compactPosePicker(index, list);
  }

  function compactPosePicker(index, list = ALL_POSES) {
    const opts = list.map((p, i) =>
      `<option value="${i}"${i === index ? ' selected' : ''}>${i + 1}. ${p.s}</option>`).join('');
    return `<label class="pose-jump-compact"><span class="pose-jump-label">Jump to pose</span><select id="pose-select" aria-label="Jump to pose">${opts}</select></label>`;
  }

  function bindPosePicker(onPick) {
    const sel = drillBody.querySelector('#pose-select');
    if (sel) sel.onchange = () => onPick(+sel.value);
  }

  function bindPoseNav(index, onStep) {
    const prev = drillBody.querySelector('#pose-prev');
    const next = drillBody.querySelector('#pose-next');
    if (prev) prev.onclick = () => { if (index > 0) onStep(index - 1); };
    if (next) next.onclick = () => { if (index < ALL_POSES.length - 1) onStep(index + 1); };
  }

  function navSteps(stepAt, max) {
    return `<div class="nav-block">
      <div class="row-ghost nav-steps">
        <button type="button" class="btn-ghost btn-step" id="step-prev" ${stepAt === 0 ? 'disabled' : ''}>Previous count</button>
        <button type="button" class="btn-ghost btn-step" id="step-next" ${stepAt >= max ? 'disabled' : ''}>Next count</button>
      </div>
    </div>`;
  }

  function navPoses(at) {
    return navPosesInList(at, ALL_POSES);
  }

  function navPosesInList(at, list) {
    return `<div class="nav-block">
      <div class="row-ghost nav-poses">
        <button type="button" class="btn-ghost" id="pose-prev" ${at === 0 ? 'disabled' : ''}>Previous pose</button>
        <button type="button" class="btn-ghost" id="pose-next" ${at >= list.length - 1 ? 'disabled' : ''}>Next pose</button>
      </div>
    </div>`;
  }

  function bindPoseNavInList(index, list, onStep) {
    const prev = drillBody.querySelector('#pose-prev');
    const next = drillBody.querySelector('#pose-next');
    if (prev) prev.onclick = () => { if (index > 0) onStep(index - 1); };
    if (next) next.onclick = () => { if (index < list.length - 1) onStep(index + 1); };
  }

  function renderHub() {
    hubList.innerHTML = HUB[hubMode].map(it => `
      <button type="button" class="hub-row" data-id="${it.id}">
        <img src="${it.img}" alt=""${poseImgBgAttr(it.img)}>
        <div><b>${it.title}</b><span>${it.sub}</span></div>
      </button>`).join('');
    hubList.querySelectorAll('.hub-row').forEach(b => {
      const item = HUB[hubMode].find(x => x.id === b.dataset.id);
      b.onclick = () => {
        if (item?.href) {
          location.href = item.href;
          return;
        }
        openDrill(b.dataset.id);
      };
    });
  }

  function openDrill(id) {
    drillId = id;
    const item = HUB[hubMode].find(x => x.id === id);
    drillTitle.textContent = item.title;
    setStudyProgress(item.title, 0, 0);
    viewHub.classList.add('hidden');
    viewDrill.classList.remove('hidden');
    if (hubMode === 'learn') {
      if (id === 'count') mountCountLearn();
      else if (id === 'roots') mountRootsLearn();
      else if (id === 'gaze') mountGazeLearn();
    } else {
      COUNT_QS = recallDeck(buildCountQuestions);
      GAZE_QS = recallDeck(buildGazeQuestions);
      ROOT_QS = recallDeck(buildRootQuestions);
      if (id === 'count') mountCountRecall();
      else if (id === 'gaze') mountGazeRecall();
      else if (id === 'roots') mountRootsRecall();
      else if (id === 'order') mountOrderRecall();
    }
  }

  function closeDrill() {
    drillId = null;
    setDrillTools('');
    if (drillCard) drillCard.classList.remove('has-recall-foot');
    viewDrill.classList.add('hidden');
    viewHub.classList.remove('hidden');
    setStudyProgress('Study', 0, 0);
  }

  let poseAt = 0;
  let stepAt = 0;

  function mountCountLearn() {
    poseAt = 0;
    stepAt = 0;
    paintCountLearn();
  }

  function countStepHtml(round) {
    const step = round.steps[stepAt];
    const [n, breath, move] = step;
    const [sa, dev] = countName(n, breath);
    const held = n > 0 && round.holds.includes(n);
    return `
      <div class="count-now">
        <div class="count-sa-row">
          <div class="sa">${sa}</div>
          ${countDevHtml(dev)}
        </div>
        <div class="move"><span class="breath">${breath}</span> ${move}</div>
        ${held ? '<div class="hold-note">This is the pose.</div>' : ''}
      </div>
      <div class="pips">
        ${round.steps.map((s, i) =>
          `<button type="button" data-i="${i}" class="${i === stepAt ? 'on' : ''} ${s[0] > 0 && round.holds.includes(s[0]) ? 'hold' : ''}">${s[0] || (s[1] === 'Rest' ? 'R' : 'S')}</button>`).join('')}
      </div>
      ${navSteps(stepAt, round.steps.length - 1)}`;
  }

  function bindCountStepNav(round) {
    drillBody.querySelectorAll('.pips button').forEach(b => {
      b.onclick = () => {
        stepAt = +b.dataset.i;
        paintCountLearn({ stepOnly: true });
      };
    });
    const prev = drillBody.querySelector('#step-prev');
    const next = drillBody.querySelector('#step-next');
    if (prev) prev.onclick = () => { stepAt--; paintCountLearn({ stepOnly: true }); };
    if (next) next.onclick = () => { stepAt++; paintCountLearn({ stepOnly: true }); };
  }

  function refreshCountLearnStep(round) {
    const panel = drillBody.querySelector('#count-learn-panel');
    if (!panel) return false;
    panel.innerHTML = countStepHtml(round);
    bindCountStepNav(round);
    return true;
  }

  function paintCountLearn({ stepOnly = false } = {}) {
    const pose = ALL_POSES[poseAt];
    const round = window.VINYASA[pose.id];
    const nav = navPoses(poseAt);
    if (stepOnly && round && refreshCountLearnStep(round)) return;
    setDrillTools(learnJumpTools(poseAt, ALL_POSES));
    setStudyProgress(`Pose ${poseAt + 1} of ${ALL_POSES.length}`, poseAt + 1, ALL_POSES.length);
    if (round) {
      drillBody.innerHTML = `
        <div id="count-learn-shell" data-pose-id="${pose.id}">
          ${poseFig(pose.img, 'decoding="async"')}
          <div class="pose-name">${pose.s}${devHtml(pose.d)}</div>
          <div class="count-panel" id="count-learn-panel">
            ${countStepHtml(round)}
          </div>
          ${nav}
        </div>`;
      bindCountStepNav(round);
    } else {
      const hold = pose.breaths || pose.hold || 'Five breaths';
      drillBody.innerHTML = `
        ${poseFig(pose.img)}
        <div class="pose-name">${pose.s}${devHtml(pose.d)}</div>
        <div class="hold-card">
          <p><b>Hold</b> ${hold}</p>
          ${pose.gaze ? `<p><b>Gaze</b> ${pose.gaze}</p>` : ''}
          ${pose.rep ? `<p><b>Repeats</b> ${pose.rep}</p>` : ''}
          ${afterText(pose) ? `<p><b>Then</b> ${afterText(pose)}</p>` : ''}
        </div>
        ${nav}`;
    }
    bindPosePicker(i => { poseAt = i; stepAt = 0; paintCountLearn(); });
    bindPoseNav(poseAt, i => {
      if (i >= ALL_POSES.length) {
        drillBody.innerHTML = `<div class="end-line">You have walked every pose.</div>${btnNext('Back to topics', 'back-hub')}`;
        drillBody.querySelector('#back-hub').onclick = closeDrill;
        return;
      }
      poseAt = i;
      stepAt = 0;
      paintCountLearn();
    });
  }

  let countQ = 0;
  function mountCountRecall() {
    countQ = 0;
    paintCountQuestion();
  }

  function paintCountQuestion() {
    setStudyProgress(`Question ${countQ + 1} of ${COUNT_QS.length}`, countQ + 1, COUNT_QS.length);
    if (countQ >= COUNT_QS.length) {
      drillBody.innerHTML = `<div class="end-line">Finished</div><p class="fine">${COUNT_QS.length} questions.</p>${btnNext('Try again', 'retry')}`;
      drillBody.querySelector('#retry').onclick = () => { COUNT_QS = recallDeck(buildCountQuestions); mountCountRecall(); };
      return;
    }
    const item = COUNT_QS[countQ];
    const img = item.type === 'round' ? item.round.img : item.pose.img;
    const name = item.type === 'round' ? item.round.name : item.pose.s;
    const ask = item.type === 'round' ? item.ask : item;
    const nameRow = ask.hidePoseName ? '' : `<div class="pose-name">${name}</div>`;
    const main = `
      ${poseFig(img, '')}
      ${nameRow}
      <div class="ask ask-flush"><p class="recall-q">${ask.q}</p>
        <div class="opts">
          ${ask.options.map((o, i) => `<button type="button" class="opt" data-a="${i}">${o}</button>`).join('')}
        </div>
      </div>`;
    const foot = btnNext(countQ === COUNT_QS.length - 1 ? 'See results' : 'Next', 'main-next', true);
    drillBody.innerHTML = recallShell(main, foot);
    const next = drillBody.querySelector('#main-next');
    const opts = [...drillBody.querySelectorAll('.opt')];
    bindRecallOpts(opts, ask.answer, () => next.classList.remove('hidden'));
    bindRecallNext(next, () => { countQ++; paintCountQuestion(); });
  }

  let nameAt = 0;
  let partAt = 0;

  function mountRootsLearn() {
    nameAt = 0;
    partAt = 0;
    paintRootsLearn();
  }

  function paintRootsLearn() {
    if (!ROOT_POSES.length) {
      drillBody.innerHTML = `<p class="fine">No splittable names in the list yet.</p>${btnNext('Back to topics', 'back-hub')}`;
      drillBody.querySelector('#back-hub').onclick = closeDrill;
      return;
    }
    if (nameAt >= ROOT_POSES.length) nameAt = ROOT_POSES.length - 1;
    const pose = ROOT_POSES[nameAt];
    const parts = posePartsForLearn(pose);
    if (partAt >= parts.length) partAt = 0;
    const [, gloss] = parts[partAt] || parts[0];
    setDrillTools(learnJumpTools(nameAt, ROOT_POSES));
    setStudyProgress(`Pose ${nameAt + 1} of ${ROOT_POSES.length}`, nameAt + 1, ROOT_POSES.length);
    drillBody.innerHTML = `
      <div class="pose-name roots-pose-name">${pose.s}</div>
      <div class="parts roots-parts">
        ${parts.map((p, i) => `<button type="button" data-i="${i}" class="${i === partAt ? 'on' : ''}">${p[0]}</button>`).join('')}
      </div>
      <div class="gloss"><p>${gloss}</p></div>
      ${navPosesInList(nameAt, ROOT_POSES)}`;
    drillBody.querySelectorAll('.parts button').forEach(b => b.onclick = () => {
      partAt = +b.dataset.i;
      paintRootsLearn();
    });
    bindPosePicker(i => { nameAt = i; partAt = 0; paintRootsLearn(); });
    bindPoseNavInList(nameAt, ROOT_POSES, i => {
      if (i >= ROOT_POSES.length) {
        drillBody.innerHTML = `<div class="end-line">Every splittable name.</div>${btnNext('Back to topics', 'back-hub')}`;
        drillBody.querySelector('#back-hub').onclick = closeDrill;
        return;
      }
      nameAt = i;
      partAt = 0;
      paintRootsLearn();
    });
  }

  let rootQ = 0;
  function mountRootsRecall() {
    rootQ = 0;
    paintRootQuestion();
  }

  function paintRootQuestion() {
    setStudyProgress(`Question ${rootQ + 1} of ${ROOT_QS.length}`, rootQ + 1, ROOT_QS.length);
    if (rootQ >= ROOT_QS.length) {
      drillBody.innerHTML = `<div class="end-line">Finished</div>${btnNext('Try again', 'retry')}`;
      drillBody.querySelector('#retry').onclick = () => { ROOT_QS = recallDeck(buildRootQuestions); mountRootsRecall(); };
      return;
    }
    const item = ROOT_QS[rootQ];
    const main = `
      <div class="ask ask-flush"><p class="q-label">${item.q}</p>
        <div class="opts">
          ${item.options.map((o, i) => `<button type="button" class="opt" data-a="${i}">${o}</button>`).join('')}
        </div>
      </div>`;
    const foot = btnNext(rootQ === ROOT_QS.length - 1 ? 'Done' : 'Next', 'main-next', true);
    drillBody.innerHTML = recallShell(main, foot);
    const next = drillBody.querySelector('#main-next');
    const opts = [...drillBody.querySelectorAll('.opt')];
    bindRecallOpts(opts, item.answer, () => next.classList.remove('hidden'));
    bindRecallNext(next, () => { rootQ++; paintRootQuestion(); });
  }

  let gazePoseAt = 0;
  function mountGazeLearn() {
    gazePoseAt = 0;
    setDrillTools('');
    setStudyProgress('Nine drishtis', 0, 0);
    drillBody.innerHTML = `
      <div class="drishti-ref">
        ${DRISHTI.map(d => `
          <div class="drishti-row">
            <b>${d[0]}</b><i>${d[1]}</i>
            <p>${d[2]}. Often in ${d[3]}.</p>
          </div>`).join('')}
      </div>
      <hr class="soft">
      ${btnNext('Gaze by pose')}`;
    drillBody.querySelector('#main-next').onclick = () => paintGazeByPose();
  }

  function paintGazeByPose() {
    const pose = ALL_POSES[gazePoseAt];
    setDrillTools(learnJumpTools(gazePoseAt, ALL_POSES));
    setStudyProgress(`Pose ${gazePoseAt + 1} of ${ALL_POSES.length}`, gazePoseAt + 1, ALL_POSES.length);
    drillBody.innerHTML = `
      ${poseFig(pose.img)}
      <div class="pose-name">${pose.s}${devHtml(pose.d)}</div>
      <div class="hold-card">
        ${pose.gaze ? `<p><b>Gaze</b> ${pose.gaze}</p>` : '<p>No separate gaze note for this pose.</p>'}
        ${pose.rep ? `<p><b>Repeats</b> ${pose.rep}</p>` : ''}
        ${pose.breaths ? `<p><b>Hold</b> ${pose.breaths}</p>` : ''}
        ${pose.hold ? `<p><b>Hold</b> ${pose.hold}</p>` : ''}
        ${afterText(pose) ? `<p><b>Then</b> ${afterText(pose)}</p>` : ''}
      </div>
      ${navPoses(gazePoseAt)}`;
    bindPosePicker(i => { gazePoseAt = i; paintGazeByPose(); });
    bindPoseNav(gazePoseAt, i => {
      if (i >= ALL_POSES.length) {
        drillBody.innerHTML = `<div class="end-line">Every pose.</div>${btnNext('Back to topics', 'back-hub')}`;
        drillBody.querySelector('#back-hub').onclick = closeDrill;
        return;
      }
      gazePoseAt = i;
      paintGazeByPose();
    });
  }

  let gAt = 0;
  let gScore = 0;
  function mountGazeRecall() {
    gAt = 0;
    gScore = 0;
    paintGazeQuestion();
  }

  function paintGazeQuestion() {
    setStudyProgress(`Question ${gAt + 1} of ${GAZE_QS.length}`, gAt + 1, GAZE_QS.length);
    if (gAt >= GAZE_QS.length) {
      drillBody.innerHTML = `
        <div class="end-line">${gScore} of ${GAZE_QS.length}</div>
        ${btnNext('Try again', 'retry')}`;
      drillBody.querySelector('#retry').onclick = () => {
        GAZE_QS = recallDeck(buildGazeQuestions);
        mountGazeRecall();
      };
      return;
    }
    const q = GAZE_QS[gAt];
    const nameRow = q.hidePoseName ? '' : `<div class="pose-name">${q.pose.s}</div>`;
    const main = `
      ${poseFig(q.pose.img, '')}
      ${nameRow}
      <div class="q-label recall-q">${q.q}</div>
      <div class="opts">
        ${q.options.map((o, i) => `<button type="button" class="opt" data-a="${i}">${o}</button>`).join('')}
      </div>`;
    const foot = btnNext(gAt === GAZE_QS.length - 1 ? 'See score' : 'Next', 'main-next', true);
    drillBody.innerHTML = recallShell(main, foot);
    const next = drillBody.querySelector('#main-next');
    const opts = [...drillBody.querySelectorAll('.opt')];
    bindRecallOpts(opts, q.answer, ok => {
      if (ok) gScore++;
      next.classList.remove('hidden');
    });
    bindRecallNext(next, () => { gAt++; paintGazeQuestion(); });
  }

  let orderRun = [];
  let orderRunAt = 0;
  let placed = [];
  let bank = [];
  let orderFrozen = false;
  let orderPickSlot = null;

  function mountOrderRecall() {
    orderRun = shuffle(ORDER_CHUNKS.map((_, i) => i)).slice(0, Math.min(ORDER_ROUNDS, ORDER_CHUNKS.length));
    orderRunAt = 0;
    newOrder();
  }

  function newOrder() {
    orderFrozen = false;
    orderPickSlot = null;
    const set = ORDER_CHUNKS[orderRun[orderRunAt]];
    placed = Array(set.poses.length).fill(null);
    bank = shuffle(set.poses.map((p, i) => i));
    renderOrder('');
  }

  function orderRetryRound() {
    orderFrozen = false;
    orderPickSlot = null;
    const set = ORDER_CHUNKS[orderRun[orderRunAt]];
    placed = Array(set.poses.length).fill(null);
    bank = shuffle([...set.poses.keys()]);
    renderOrder('');
  }

  function orderLabel(pose) {
    return `<span class="label"><b>${pose[0]}</b></span>`;
  }

  function orderBankCap(pose) {
    const s = pose[0];
    return s.length > 22 ? `${s.slice(0, 20)}…` : s;
  }

  function orderPlaceInSlot(slotIdx, poseIdx) {
    const existing = placed[slotIdx];
    if (existing !== null && existing !== poseIdx && !bank.includes(existing)) bank.push(existing);
    placed[slotIdx] = poseIdx;
    bank = bank.filter(x => x !== poseIdx);
  }

  function orderReturnToBank(slotIdx) {
    const id = placed[slotIdx];
    if (id === null) return;
    bank.push(id);
    placed[slotIdx] = null;
  }

  function bindOrderDnD(set) {
    const readDrop = (raw) => {
      if (!raw) return null;
      if (raw.startsWith('b:')) return { from: 'bank', id: +raw.slice(2) };
      if (raw.startsWith('s:')) {
        const [, slot, id] = raw.split(':');
        return { from: 'slot', slot: +slot, id: +id };
      }
      return null;
    };

    drillBody.querySelectorAll('[data-slot]').forEach(el => {
      el.ondragover = e => { e.preventDefault(); el.classList.add('drag-over'); };
      el.ondragleave = () => el.classList.remove('drag-over');
      el.ondrop = e => {
        e.preventDefault();
        el.classList.remove('drag-over');
        const drop = readDrop(e.dataTransfer.getData('text/plain'));
        const slotIdx = +el.dataset.slot;
        if (!drop) return;
        if (drop.from === 'bank') orderPlaceInSlot(slotIdx, drop.id);
        else if (drop.from === 'slot') {
          const fromId = placed[drop.slot];
          const toId = placed[slotIdx];
          placed[drop.slot] = toId;
          placed[slotIdx] = fromId;
        }
        orderPickSlot = null;
        if (placed.every(x => x !== null)) checkOrder();
        else renderOrder('');
      };
    });

    drillBody.querySelectorAll('.bank button').forEach(b => {
      b.draggable = true;
      b.ondragstart = e => e.dataTransfer.setData('text/plain', `b:${b.dataset.id}`);
    });

    drillBody.querySelectorAll('[data-slot]').forEach(b => {
      if (placed[+b.dataset.slot] === null) return;
      b.draggable = true;
      b.ondragstart = e => {
        const i = +b.dataset.slot;
        e.dataTransfer.setData('text/plain', `s:${i}:${placed[i]}`);
      };
    });
  }

  function renderOrder(msg) {
    const set = ORDER_CHUNKS[orderRun[orderRunAt]];
    const allFull = placed.every(x => x !== null);
    const allGood = orderFrozen && allFull && placed.every((id, i) => id === i);
    const showResult = orderFrozen && allFull;
    setStudyProgress(`Round ${orderRunAt + 1} of ${orderRun.length}`, orderRunAt + 1, orderRun.length);
    let msgHtml = '';
    if (msg) {
      const cls = allGood ? 'order-msg good' : 'order-msg';
      msgHtml = `<p class="${cls}" id="order-msg">${msg}</p>`;
    }
    const main = `
      <div class="slots">
        ${placed.map((id, i) => {
          const pick = !orderFrozen && orderPickSlot === i ? ' slot-pick' : '';
          const state = showResult && id !== null ? (id === i ? ' good' : ' bad') : '';
          if (id === null) {
            return `<button type="button" class="slot slot-empty${pick}" data-slot="${i}"><span class="n">${i + 1}</span><span class="ph"></span><span class="empty">Empty</span></button>`;
          }
          const tag = orderFrozen ? 'div' : 'button';
          const attrs = orderFrozen ? '' : ` type="button" data-slot="${i}"`;
          const thumbSrc = set.poses[id][1];
          return `<${tag} class="slot${state}${pick}"${attrs}><span class="n">${i + 1}</span><img class="thumb" src="${thumbSrc}" alt=""${poseImgBgAttr(thumbSrc)}>${orderLabel(set.poses[id])}</${tag}>`;
        }).join('')}
      </div>
      <div class="bank">
        ${orderFrozen ? '' : bank.map(id => `
          <button type="button" data-id="${id}" title="${set.poses[id][0]}">
            <img src="${set.poses[id][1]}" alt=""${poseImgBgAttr(set.poses[id][1])}>
            <span class="bank-cap">${orderBankCap(set.poses[id])}</span>
          </button>`).join('')}
      </div>
      ${msgHtml}`;
    const resetWarn = showResult && !allGood;
    const resetLabel = showResult && !allGood ? 'Reset and shuffle' : 'Shuffle again';
    const foot = `
      ${btnNext(orderRunAt < orderRun.length - 1 ? 'Next round' : 'Done', 'order-next', !allGood)}
      <button type="button" class="btn-ghost full${resetWarn ? ' order-reset-warn' : ''}" id="order-reset">${resetLabel}</button>`;
    drillBody.innerHTML = recallShell(main, foot);
    const nextChunk = drillBody.querySelector('#order-next');
    if (nextChunk && !nextChunk.classList.contains('hidden')) {
      nextChunk.onclick = () => {
        orderPickSlot = null;
        if (orderRunAt < orderRun.length - 1) { orderRunAt++; newOrder(); }
        else closeDrill();
      };
    }
    if (!orderFrozen) {
      bindOrderDnD(set);
      drillBody.querySelectorAll('.bank button').forEach(b => {
        b.onclick = () => {
          const poseIdx = +b.dataset.id;
          if (orderPickSlot !== null) {
            orderPlaceInSlot(orderPickSlot, poseIdx);
            orderPickSlot = null;
          } else {
            const hole = placed.indexOf(null);
            if (hole < 0) return;
            orderPlaceInSlot(hole, poseIdx);
          }
          if (placed.every(x => x !== null)) checkOrder();
          else renderOrder('');
        };
      });
      drillBody.querySelectorAll('[data-slot]').forEach(b => {
        b.onclick = () => {
          const i = +b.dataset.slot;
          if (orderPickSlot === null) {
            if (placed[i] === null) return;
            orderPickSlot = i;
            renderOrder('');
            return;
          }
          if (orderPickSlot === i) {
            orderReturnToBank(i);
            orderPickSlot = null;
            renderOrder('');
            return;
          }
          const from = orderPickSlot;
          const tmp = placed[i];
          placed[i] = placed[from];
          placed[from] = tmp;
          orderPickSlot = null;
          if (placed.every(x => x !== null)) checkOrder();
          else renderOrder('');
        };
      });
    }
    drillBody.querySelector('#order-reset').onclick = () => {
      if (orderFrozen) orderRetryRound();
      else newOrder();
    };
  }

  function checkOrder() {
    const set = ORDER_CHUNKS[orderRun[orderRunAt]];
    const n = set.poses.length;
    const good = placed.map((id, i) => id === i);
    orderPickSlot = null;
    orderFrozen = true;
    if (good.every(Boolean)) {
      renderOrder('You have the sequence.');
      return;
    }
    renderOrder(`Not quite. ${good.filter(Boolean).length} of ${n} in the right place. Reset to try again.`);
  }

  function setHubTab(mode) {
    const learn = mode === 'learn';
    tabLearn.classList.toggle('active', learn);
    tabRecall.classList.toggle('active', !learn);
    tabLearn.setAttribute('aria-selected', learn ? 'true' : 'false');
    tabRecall.setAttribute('aria-selected', learn ? 'false' : 'true');
  }

  function switchHubMode(mode) {
    if (mode === hubMode) return;
    hubList.classList.add('hub-anim-out');
    setTimeout(() => {
      hubMode = mode;
      setHubTab(mode);
      renderHub();
      hubList.classList.remove('hub-anim-out');
      hubList.classList.add('hub-anim-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => hubList.classList.remove('hub-anim-in'));
      });
    }, 180);
  }

  function initSlidingThumb(track, itemSel, thumbClass) {
    if (!track) return;
    const thumb = document.createElement('span');
    thumb.className = thumbClass;
    thumb.setAttribute('aria-hidden', 'true');
    track.prepend(thumb);
    track.classList.add('has-thumb');
    let placed = false;
    let lastX = null;
    const place = () => {
      const a = track.querySelector(itemSel);
      if (!a || !a.offsetWidth) return;
      const x = a.offsetLeft;
      const w = a.offsetWidth;
      if (x === lastX && thumb.style.width === `${w}px`) return;
      if (!placed) thumb.style.transition = 'none';
      thumb.style.width = `${w}px`;
      thumb.style.translate = `${x}px 0`;
      lastX = x;
      if (!placed) {
        void thumb.offsetWidth;
        thumb.style.transition = '';
        placed = true;
      }
    };
    new MutationObserver(place).observe(track, { subtree: true, attributes: true, attributeFilter: ['class'] });
    new ResizeObserver(place).observe(track);
    place();
  }

  tabLearn.onclick = () => switchHubMode('learn');
  tabRecall.onclick = () => switchHubMode('recall');
  document.getElementById('btn-back').onclick = closeDrill;

  initSlidingThumb(document.getElementById('hub-seg'), 'button.active', 'seg-thumb');
  setStudyProgress('Study', 0, 0);
  renderHub();
})();
