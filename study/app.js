(() => {
  const IMG = '../images/poses/';
  const hubList = document.getElementById('hub-list');
  const viewHub = document.getElementById('view-hub');
  const viewDrill = document.getElementById('view-drill');
  const drillBody = document.getElementById('drill-body');
  const drillTitle = document.getElementById('drill-title');
  const tabLearn = document.getElementById('tab-learn');
  const tabRecall = document.getElementById('tab-recall');

  const { PRIMARY, SECONDARY, FINISHING, POSE_META, AFTER_TEXT } = window.STUDY_DATA;
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

  let showSanskrit = localStorage.getItem('study-sk') === '1';
  function sanskritToggleHtml() {
    return `<button type="button" class="sk-toggle${showSanskrit ? ' on' : ''}" id="sk-toggle" aria-pressed="${showSanskrit}">Sanskrit</button>`;
  }

  function studyTop(left, right, opts = {}) {
    const sk = opts.sanskrit !== false ? sanskritToggleHtml() : '';
    const rightHtml = right
      ? `<span class="q-top-right">${sk}<span class="q-progress">${right}</span></span>`
      : (sk ? `<span class="q-top-right">${sk}</span>` : '');
    return `<div class="q-top"><span>${left}</span>${rightHtml}</div>`;
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

  function bindStudyChrome(repaint) {
    const t = drillBody.querySelector('#sk-toggle');
    if (t) {
      t.onclick = () => {
        showSanskrit = !showSanskrit;
        localStorage.setItem('study-sk', showSanskrit ? '1' : '0');
        repaint();
      };
    }
  }

  function devHtml(text) {
    if (!showSanskrit || !text) return '';
    return `<span class="dev">${text}</span>`;
  }

  function countDevHtml(dev) {
    if (!showSanskrit || !dev) return '';
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

  function buildRootQuestions() {
    const qs = [];
    const fillerPool = ['pāda', 'ūrdhva', 'supta', 'parivrtta', 'supta', 'koṇa', 'utthita', 'paścima'];
    ROOT_POSES.forEach(pose => {
      const use = rootsDisplayParts(pose).filter(isTeachablePart);
      if (!use.length) return;
      const pick = shuffle(use)[0];
      const wrongFromPose = shuffle(use.filter(p => p[0] !== pick[0]).map(p => p[0]));
      const fillers = shuffle(fillerPool.filter(x => x !== pick[0] && !use.some(p => p[0] === x)));
      const opts = shuffle([pick[0], ...wrongFromPose.slice(0, 2), ...fillers].slice(0, 4));
      while (opts.length < 4) opts.push(fillers[0] || 'pāda');
      qs.push({
        pose,
        q: `Which part means “${pick[1].replace(/\.$/, '')}”?`,
        options: opts,
        answer: opts.indexOf(pick[0]),
        why: `${pick[0]}: ${pick[1]}`,
      });
    });
    return qs;
  }

  function buildGazeQuestions() {
    const pool = ['Nose', 'Hand', 'Foot', 'Thumbs', 'Side', 'Up', 'Third eye', 'Navel', 'Eyes closed'];
    return ALL_POSES.filter(p => p.gaze).map(pose => {
      const g = pose.gaze.split(',')[0].trim();
      const norm = g.includes('Hand') ? 'Hand' : g.includes('Foot') ? 'Foot' : g.includes('Thumb') ? 'Thumbs'
        : g.includes('Side') ? 'Side' : g.includes('Up') ? 'Up' : g.includes('Third') ? 'Third eye'
          : g.includes('Navel') ? 'Navel' : g.includes('Eye') ? 'Eyes closed' : 'Nose';
      const opts = shuffle([norm, ...shuffle(pool.filter(x => x !== norm)).slice(0, 3)]);
      let q = 'Where is the gaze?';
      let why = g;
      if (pose.rep) {
        const repPool = ['Nothing else', pose.rep, '3 to 5 rounds', 'Nine rolls', '5 jumps forward and back'];
        const repOpts = shuffle([...new Set(repPool)]).slice(0, 4);
        while (repOpts.length < 4) repOpts.push('Nothing else');
        return {
          pose,
          q: pose.rep.includes('roll') ? 'Along with the five breaths?' : 'What repeats in this pose?',
          options: repOpts,
          answer: repOpts.indexOf(pose.rep),
          why: pose.rep,
        };
      } else if (pose.hold && pose.hold.includes('minute')) {
        const choices = ['5 breaths', '5 each side', '10 to 25 breaths', pose.hold];
        const holdOpts = shuffle(choices);
        return {
          pose,
          q: 'How long is the hold?',
          options: holdOpts,
          answer: holdOpts.indexOf(pose.hold),
          why: pose.hold,
        };
      }
      return {
        pose,
        q,
        options: opts,
        answer: opts.indexOf(norm),
        why: pose.rep ? `${pose.rep}. Gaze: ${g}.` : `Gaze: ${g}.`,
      };
    });
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
        const options = shuffle([NUM[n][0], ...picks.map(x => NUM[x][0])]);
        const next = holds[1] ? ` The next hold is ${NUM[holds[1]][0]}, ${holds[1]}.` : '';
        qs.push({
          type: 'pose',
          pose,
          q: `Which count is the hold in ${pose.s}?`,
          options,
          answer: options.indexOf(NUM[n][0]),
          why: `${NUM[n][0]}, ${n}.${next}`,
        });
      }
      if (pose.rep) {
        const opts = shuffle(['Nothing else', pose.rep, '9 rolls', 'A vinyasa each side']);
        qs.push({
          type: 'pose',
          pose,
          q: `What is special in ${pose.s}?`,
          options: opts,
          answer: opts.indexOf(pose.rep),
          why: pose.rep,
        });
      }
      if (pose.hold) {
        const opts = shuffle(['5 breaths', '5 each side', pose.hold, '10 to 25 breaths']);
        qs.push({
          type: 'pose',
          pose,
          q: `How long is ${pose.s} held?`,
          options: opts,
          answer: opts.indexOf(pose.hold),
          why: pose.hold,
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
      poses: slice.map(p => [p.s, p.img, p.s.split(' ')[0]]),
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
    const opts = list.map((p, i) =>
      `<option value="${i}"${i === index ? ' selected' : ''}>${i + 1}. ${p.s}</option>`).join('');
    return `<label class="pose-jump"><span>Jump to pose</span><select id="pose-select">${opts}</select></label>`;
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
        <img src="${it.img}" alt="">
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
    viewDrill.classList.add('hidden');
    viewHub.classList.remove('hidden');
  }

  let poseAt = 0;
  let stepAt = 0;

  function mountCountLearn() {
    poseAt = 0;
    stepAt = 0;
    paintCountLearn();
  }

  function paintCountLearn() {
    const pose = ALL_POSES[poseAt];
    const round = window.VINYASA[pose.id];
    const nav = navPoses(poseAt);
    if (round) {
      const step = round.steps[stepAt];
      const [n, breath, move] = step;
      const [sa, dev] = countName(n, breath);
      const held = n > 0 && round.holds.includes(n);
      drillBody.innerHTML = `
        ${posePicker(poseAt)}
        ${studyTop('Learn', `Pose ${poseAt + 1} of ${ALL_POSES.length}`)}
        <div class="fig"><img src="${pose.img}" alt=""></div>
        <div class="pose-name">${pose.s}${devHtml(pose.d)}</div>
        <div class="count-panel">
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
          ${navSteps(stepAt, round.steps.length - 1)}
        </div>
        ${nav}`;
      bindStudyChrome(paintCountLearn);
      drillBody.querySelectorAll('.pips button').forEach(b => b.onclick = () => {
        stepAt = +b.dataset.i;
        paintCountLearn();
      });
      drillBody.querySelector('#step-prev').onclick = () => { stepAt--; paintCountLearn(); };
      drillBody.querySelector('#step-next').onclick = () => { stepAt++; paintCountLearn(); };
    } else {
      const hold = pose.breaths || pose.hold || 'Five breaths';
      drillBody.innerHTML = `
        ${posePicker(poseAt)}
        ${studyTop('Learn', `Pose ${poseAt + 1} of ${ALL_POSES.length}`)}
        <div class="fig"><img src="${pose.img}" alt=""></div>
        <div class="pose-name">${pose.s}${devHtml(pose.d)}</div>
        <div class="hold-card">
          <p><b>Hold</b> ${hold}</p>
          ${pose.gaze ? `<p><b>Gaze</b> ${pose.gaze}</p>` : ''}
          ${pose.rep ? `<p><b>Repeats</b> ${pose.rep}</p>` : ''}
          ${afterText(pose) ? `<p><b>Then</b> ${afterText(pose)}</p>` : ''}
        </div>
        ${nav}`;
      bindStudyChrome(paintCountLearn);
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
    if (countQ >= COUNT_QS.length) {
      drillBody.innerHTML = `<div class="end-line">Finished</div><p class="fine">${COUNT_QS.length} questions.</p>${btnNext('Try again', 'retry')}`;
      drillBody.querySelector('#retry').onclick = () => { COUNT_QS = recallDeck(buildCountQuestions); mountCountRecall(); };
      return;
    }
    const item = COUNT_QS[countQ];
    const img = item.type === 'round' ? item.round.img : item.pose.img;
    const name = item.type === 'round' ? item.round.name : item.pose.s;
    const ask = item.type === 'round' ? item.ask : item;
    drillBody.innerHTML = `
      <div class="q-top"><span>Recall</span><span>${countQ + 1} of ${COUNT_QS.length}</span></div>
      <div class="fig"><img src="${img}" alt=""></div>
      <div class="pose-name">${name}</div>
      <div class="ask"><p>${ask.q}</p>
        <div class="opts">
          ${ask.options.map((o, i) => `<button type="button" class="opt" data-a="${i}">${o}</button>`).join('')}
        </div>
        <div class="why" id="count-why"></div>
      </div>
      ${btnNext(countQ === COUNT_QS.length - 1 ? 'See results' : 'Next', 'main-next', true)}`;
    let locked = false;
    const why = drillBody.querySelector('#count-why');
    const next = drillBody.querySelector('#main-next');
    drillBody.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (locked) return;
      locked = true;
      const ok = +b.dataset.a === ask.answer;
      b.classList.add(ok ? 'good' : 'bad');
      if (!ok) drillBody.querySelector(`.opt[data-a="${ask.answer}"]`).classList.add('good');
      why.textContent = ask.why;
      drillBody.querySelectorAll('.opt').forEach(o => o.disabled = true);
      next.classList.remove('hidden');
    });
    next.onclick = () => { countQ++; paintCountQuestion(); };
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
    drillBody.innerHTML = `
      ${posePicker(nameAt, ROOT_POSES)}
      ${studyTop('Learn', `${nameAt + 1} of ${ROOT_POSES.length}`, { sanskrit: false })}
      <div class="pose-name">${pose.s}</div>
      <div class="parts">
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
    if (rootQ >= ROOT_QS.length) {
      drillBody.innerHTML = `<div class="end-line">Finished</div>${btnNext('Try again', 'retry')}`;
      drillBody.querySelector('#retry').onclick = () => { ROOT_QS = recallDeck(buildRootQuestions); mountRootsRecall(); };
      return;
    }
    const item = ROOT_QS[rootQ];
    drillBody.innerHTML = `
      <div class="q-top"><span>Recall</span><span>${rootQ + 1} of ${ROOT_QS.length}</span></div>
      <div class="pose-name">${item.pose.s}</div>
      <div class="ask"><p>${item.q}</p>
        <div class="opts">
          ${item.options.map((o, i) => `<button type="button" class="opt" data-a="${i}">${o}</button>`).join('')}
        </div>
      </div>
      ${btnNext(rootQ === ROOT_QS.length - 1 ? 'Done' : 'Next', 'main-next', true)}`;
    let locked = false;
    const next = drillBody.querySelector('#main-next');
    drillBody.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (locked) return;
      locked = true;
      const ok = +b.dataset.a === item.answer;
      b.classList.add(ok ? 'good' : 'bad');
      if (!ok) drillBody.querySelector(`.opt[data-a="${item.answer}"]`).classList.add('good');
      drillBody.querySelectorAll('.opt').forEach(o => o.disabled = true);
      next.classList.remove('hidden');
    });
    next.onclick = () => { rootQ++; paintRootQuestion(); };
  }

  let gazePoseAt = 0;
  function mountGazeLearn() {
    gazePoseAt = 0;
    drillBody.innerHTML = `
      ${studyTop('Learn', '')}
      <p class="fine drishti-lede">Nine traditional drishtis. Names vary slightly by lineage.</p>
      <div class="drishti-ref">
        ${DRISHTI.map(d => `
          <div class="drishti-row">
            <b>${d[0]}</b>${showSanskrit ? `<i>${d[1]}</i>` : ''}
            <p>${d[2]}. Often in ${d[3]}.</p>
          </div>`).join('')}
      </div>
      <hr class="soft">
      ${btnNext('Gaze by pose')}`;
    bindStudyChrome(mountGazeLearn);
    drillBody.querySelector('#main-next').onclick = () => paintGazeByPose();
  }

  function paintGazeByPose() {
    const pose = ALL_POSES[gazePoseAt];
    drillBody.innerHTML = `
      ${posePicker(gazePoseAt)}
      ${studyTop('Learn', `${gazePoseAt + 1} of ${ALL_POSES.length}`)}
      <div class="fig"><img src="${pose.img}" alt=""></div>
      <div class="pose-name">${pose.s}</div>
      <div class="hold-card">
        ${pose.gaze ? `<p><b>Gaze</b> ${pose.gaze}</p>` : '<p>No separate gaze note for this pose.</p>'}
        ${pose.rep ? `<p><b>Repeats</b> ${pose.rep}</p>` : ''}
        ${pose.breaths ? `<p><b>Hold</b> ${pose.breaths}</p>` : ''}
        ${pose.hold ? `<p><b>Hold</b> ${pose.hold}</p>` : ''}
        ${afterText(pose) ? `<p><b>Then</b> ${afterText(pose)}</p>` : ''}
      </div>
      ${navPoses(gazePoseAt)}`;
    bindStudyChrome(paintGazeByPose);
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
    drillBody.innerHTML = `
      <div class="q-top"><span>Recall</span><span>${gAt + 1} of ${GAZE_QS.length}</span></div>
      <div class="fig"><img src="${q.pose.img}" alt=""></div>
      <div class="pose-name">${q.pose.s}</div>
      <div class="q-label">${q.q}</div>
      <div class="opts">
        ${q.options.map((o, i) => `<button type="button" class="opt" data-a="${i}">${o}</button>`).join('')}
      </div>
      <div class="why" id="gaze-why"></div>
      ${btnNext(gAt === GAZE_QS.length - 1 ? 'See score' : 'Next', 'main-next', true)}`;
    let locked = false;
    const why = drillBody.querySelector('#gaze-why');
    const next = drillBody.querySelector('#main-next');
    drillBody.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (locked) return;
      locked = true;
      const ok = +b.dataset.a === q.answer;
      if (ok) gScore++;
      b.classList.add(ok ? 'good' : 'bad');
      if (!ok) drillBody.querySelector(`.opt[data-a="${q.answer}"]`).classList.add('good');
      why.textContent = q.why;
      drillBody.querySelectorAll('.opt').forEach(o => o.disabled = true);
      next.classList.remove('hidden');
    });
    next.onclick = () => { gAt++; paintGazeQuestion(); };
  }

  let orderRun = [];
  let orderRunAt = 0;
  let placed = [];
  let bank = [];
  let orderFrozen = false;

  function mountOrderRecall() {
    orderRun = shuffle(ORDER_CHUNKS.map((_, i) => i)).slice(0, Math.min(ORDER_ROUNDS, ORDER_CHUNKS.length));
    orderRunAt = 0;
    newOrder();
  }

  function newOrder() {
    orderFrozen = false;
    const set = ORDER_CHUNKS[orderRun[orderRunAt]];
    placed = Array(set.poses.length).fill(null);
    bank = shuffle(set.poses.map((p, i) => i));
    renderOrder('');
  }

  function renderOrder(msg) {
    const set = ORDER_CHUNKS[orderRun[orderRunAt]];
    const allGood = orderFrozen && placed.every((id, i) => id === i);
    drillBody.innerHTML = `
      <div class="q-top"><span>Recall</span><span>${orderRunAt + 1} of ${orderRun.length}</span></div>
      <div class="slots">
        ${placed.map((id, i) => {
          if (id === null) {
            return `<div class="slot"><span class="n">${i + 1}</span><span class="ph"></span><span class="empty">Empty</span></div>`;
          }
          const cls = orderFrozen ? (id === i ? 'good' : 'bad') : '';
          const tag = orderFrozen ? 'div' : 'button';
          const attrs = orderFrozen ? '' : ` type="button" data-slot="${i}"`;
          return `<${tag} class="slot ${cls}"${attrs}><span class="n">${i + 1}</span><img class="thumb" src="${set.poses[id][1]}" alt=""><span class="label">${set.poses[id][0]}</span></${tag}>`;
        }).join('')}
      </div>
      <div class="bank">
        ${orderFrozen ? '' : bank.map(id => `
          <button type="button" data-id="${id}" title="${set.poses[id][0]}">
            <img src="${set.poses[id][1]}" alt="">
            <span class="bank-cap">${set.poses[id][2]}</span>
          </button>`).join('')}
      </div>
      <div class="end-line" id="order-msg">${msg}</div>
      <div class="order-actions">
        ${btnNext(orderRunAt < orderRun.length - 1 ? 'Next round' : 'Done', 'order-next', !allGood)}
        <button type="button" class="btn-ghost full" id="order-reset">${orderFrozen ? 'Reset tiles' : 'Shuffle again'}</button>
      </div>`;
    const nextChunk = drillBody.querySelector('#order-next');
    if (nextChunk && !nextChunk.classList.contains('hidden')) {
      nextChunk.onclick = () => {
        if (orderRunAt < orderRun.length - 1) { orderRunAt++; newOrder(); }
        else closeDrill();
      };
    }
    if (!orderFrozen) {
      drillBody.querySelectorAll('.bank button').forEach(b => b.onclick = () => {
        const hole = placed.indexOf(null);
        if (hole < 0) return;
        placed[hole] = +b.dataset.id;
        bank = bank.filter(id => id !== +b.dataset.id);
        if (placed.every(x => x !== null)) checkOrder();
        else renderOrder('');
      });
      drillBody.querySelectorAll('[data-slot]').forEach(b => b.onclick = () => {
        const i = +b.dataset.slot;
        bank.push(placed[i]);
        placed[i] = null;
        renderOrder('');
      });
    }
    drillBody.querySelector('#order-reset').onclick = newOrder;
  }

  function checkOrder() {
    const set = ORDER_CHUNKS[orderRun[orderRunAt]];
    const n = set.poses.length;
    const good = placed.map((id, i) => id === i);
    orderFrozen = true;
    if (good.every(Boolean)) {
      renderOrder('That is the order.');
      return;
    }
    renderOrder(`${good.filter(Boolean).length} of ${n} in the right place. Reset tiles to try again.`);
  }

  tabLearn.onclick = () => {
    hubMode = 'learn';
    tabLearn.classList.add('on');
    tabRecall.classList.remove('on');
    tabLearn.setAttribute('aria-selected', 'true');
    tabRecall.setAttribute('aria-selected', 'false');
    renderHub();
  };
  tabRecall.onclick = () => {
    hubMode = 'recall';
    tabRecall.classList.add('on');
    tabLearn.classList.remove('on');
    tabRecall.setAttribute('aria-selected', 'true');
    tabLearn.setAttribute('aria-selected', 'false');
    renderHub();
  };
  document.getElementById('btn-back').onclick = closeDrill;

  renderHub();
})();
