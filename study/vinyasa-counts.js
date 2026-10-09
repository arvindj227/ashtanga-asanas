/* Step-by-step vinyasa count for every pose.
   Numbers follow the led count of the Jois lineage, the same numbering
   the 2015 practice sheets mark on each pose. Sun A, Sun B, Marichi A,
   and Boat keep the cues already in the app. The rest use the same
   short form. Once the rhythm is familiar, seated poses drop the first
   six and last three movements and continue from downward dog, so many
   counts begin at seven. Some schools number a transition differently. */
(function () {
  const stay = 'and stay for five breaths';

  function twoSide(right, left, hold, foot) {
    return {
      holds: [8, 15],
      foot,
      steps: [
        [7, 'Inhale', right],
        [8, 'Exhale', hold],
        [9, 'Inhale', 'Head up'],
        [10, 'Inhale', 'Lift up'],
        [11, 'Exhale', 'Jump back'],
        [12, 'Inhale', 'Upward dog'],
        [13, 'Exhale', 'Downward dog'],
        [14, 'Inhale', left],
        [15, 'Exhale', hold],
        [16, 'Inhale', 'Head up'],
        [17, 'Inhale', 'Lift up'],
        [18, 'Exhale', 'Jump back'],
        [19, 'Inhale', 'Upward dog'],
        [20, 'Exhale', 'Downward dog'],
      ],
    };
  }

  function inhaleSide(right, left, foot) {
    return {
      holds: [7, 12],
      foot,
      steps: [
        [7, 'Inhale', right],
        [8, 'Inhale', 'Lift up'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
        [12, 'Inhale', left],
        [13, 'Inhale', 'Lift up'],
        [14, 'Exhale', 'Jump back'],
        [15, 'Inhale', 'Upward dog'],
        [16, 'Exhale', 'Downward dog'],
      ],
    };
  }

  function out(from) {
    return [
      [from, 'Inhale', 'Lift up'],
      [from + 1, 'Exhale', 'Jump back'],
      [from + 2, 'Inhale', 'Upward dog'],
      [from + 3, 'Exhale', 'Downward dog'],
    ];
  }

  const link = 'Between standing poses, a basic vinyasa can link them. These numbers stay the same.';

  window.VINYASA = {
    p01: {
      holds: [0],
      steps: [[0, 'Stand', 'Equal standing, five breaths']],
      foot: 'This is where every full count begins and ends. The gaze is the nose.',
    },
    p02: {
      holds: [],
      steps: [
        [1, 'Inhale', 'Arms up'], [2, 'Exhale', 'Fold'], [3, 'Inhale', 'Head up, lengthen'],
        [4, 'Exhale', 'Jump back'], [5, 'Inhale', 'Upward dog'], [6, 'Exhale', 'Downward dog'],
        [7, 'Inhale', 'Jump forward, head up'], [8, 'Exhale', 'Fold'], [9, 'Inhale', 'Arms up'],
      ],
      foot: 'Then exhale, back to samasthiti.',
      ask: {
        q: 'How many movements are in Sun A?',
        options: ['7', '9', '12', '17'],
        answer: 1,
        why: 'Nine movements, then an exhale to samasthiti. Sun B has seventeen.',
      },
    },
    p03: {
      holds: [7, 8, 10, 11],
      steps: [
        [1, 'Inhale', 'Chair'], [2, 'Exhale', 'Fold'], [3, 'Inhale', 'Head up'],
        [4, 'Exhale', 'Jump back'], [5, 'Inhale', 'Upward dog'], [6, 'Exhale', 'Downward dog'],
        [7, 'Inhale', 'Right foot forward, warrior I'], [8, 'Exhale', 'Warrior I, five breaths'],
        [9, 'Inhale', 'Up'], [10, 'Exhale', 'Left foot forward, warrior I'],
        [11, 'Inhale', 'Warrior I, five breaths'], [12, 'Exhale', 'Fold'],
        [13, 'Inhale', 'Chair'], [14, 'Exhale', 'Jump back'], [15, 'Inhale', 'Upward dog'],
        [16, 'Exhale', 'Downward dog'], [17, 'Inhale', 'Jump forward, head up'],
      ],
      foot: 'Then exhale to fold, inhale chair, exhale samasthiti.',
      ask: {
        q: 'How many movements are in Sun B?',
        options: ['9', '12', '17', '20'],
        answer: 2,
        why: 'Seventeen movements before the closing exhale to samasthiti.',
      },
    },
    p04: {
      holds: [2],
      steps: [
        [1, 'Inhale', 'Head up, lengthen'],
        [2, 'Exhale', 'Fold, hold the big toes, five breaths'],
        [3, 'Inhale', 'Head up, lengthen'],
      ],
      foot: 'Exhale, then Pada Hastasana. ' + link,
    },
    p05: {
      holds: [2],
      steps: [
        [1, 'Inhale', 'Hands under the feet, head up'],
        [2, 'Exhale', 'Fold, five breaths'],
        [3, 'Inhale', 'Head up'],
      ],
      foot: 'Exhale back to samasthiti.',
    },
    p06: {
      holds: [2, 4],
      steps: [
        [1, 'Inhale', 'Step wide, open to the right'],
        [2, 'Exhale', 'Triangle, five breaths'],
        [3, 'Inhale', 'Come up'],
        [4, 'Exhale', 'Left side, five breaths'],
        [5, 'Inhale', 'Come up'],
      ],
      foot: 'The left side is catvāri. ' + link,
    },
    p07: {
      holds: [2, 4],
      steps: [
        [1, 'Inhale', 'Turn toward the right foot'],
        [2, 'Exhale', 'Revolve, five breaths'],
        [3, 'Inhale', 'Come up'],
        [4, 'Exhale', 'Left side, five breaths'],
        [5, 'Inhale', 'Come up'],
      ],
      foot: 'Exhale to samasthiti, or link with a basic vinyasa.',
    },
    p08: {
      holds: [2, 4],
      steps: [
        [1, 'Inhale', 'Step wide, open to the right'],
        [2, 'Exhale', 'Side angle, five breaths'],
        [3, 'Inhale', 'Come up'],
        [4, 'Exhale', 'Left side, five breaths'],
        [5, 'Inhale', 'Come up'],
      ],
      foot: 'The left side is catvāri. ' + link,
    },
    p09: {
      holds: [2, 4],
      steps: [
        [1, 'Inhale', 'Turn toward the right foot'],
        [2, 'Exhale', 'Revolve, front elbow outside the knee, five breaths'],
        [3, 'Inhale', 'Come up'],
        [4, 'Exhale', 'Left side, five breaths'],
        [5, 'Inhale', 'Come up'],
      ],
      foot: 'Exhale to samasthiti, or link with a basic vinyasa.',
    },
    p10: {
      holds: [4],
      steps: [
        [1, 'Inhale', 'Step wide, hands to the waist'],
        [2, 'Exhale', 'Fold, hands to the floor'],
        [3, 'Inhale', 'Head up'],
        [4, 'Exhale', 'Crown down, five breaths'],
        [5, 'Inhale', 'Head up'],
      ],
      foot: 'Exhale, hands back to the waist. B continues from here.',
    },
    p11: {
      holds: [4],
      steps: [
        [1, 'Inhale', 'Hands on the waist, lengthen'],
        [2, 'Exhale', 'Fold, hands stay on the waist'],
        [3, 'Inhale', 'Head up'],
        [4, 'Exhale', 'Fold, five breaths'],
      ],
      foot: 'Inhale up. C takes the arms behind the back.',
    },
    p12: {
      holds: [4],
      steps: [
        [1, 'Inhale', 'Interlace the fingers behind the back'],
        [2, 'Exhale', 'Fold, arms overhead'],
        [3, 'Inhale', 'Head up'],
        [4, 'Exhale', 'Fold, five breaths'],
      ],
      foot: 'Inhale up. D catches the big toes.',
    },
    p13: {
      holds: [4],
      steps: [
        [1, 'Inhale', 'Hands to the waist'],
        [2, 'Exhale', 'Fold, hold the big toes'],
        [3, 'Inhale', 'Head up'],
        [4, 'Exhale', 'Fold, five breaths'],
        [5, 'Inhale', 'Head up'],
      ],
      foot: 'Exhale toward samasthiti, then turn into Pārśvottānāsana.',
    },
    p14: {
      holds: [2, 4],
      steps: [
        [1, 'Inhale', 'Turn right, hands in prayer behind the back'],
        [2, 'Exhale', 'Fold over the right leg, five breaths'],
        [3, 'Inhale', 'Come up, square to the front'],
        [4, 'Exhale', 'Fold over the left leg, five breaths'],
        [5, 'Inhale', 'Come up'],
      ],
      foot: 'Exhale to samasthiti.',
    },
    p15: {
      holds: [2, 4, 7, 9, 11, 14],
      steps: [
        [1, 'Inhale', 'Right leg up, hold the big toe, five breaths'],
        [2, 'Exhale', 'Fold over the leg, five breaths'],
        [3, 'Inhale', 'Stand tall, leg still up'],
        [4, 'Exhale', 'Open the leg to the side, five breaths'],
        [5, 'Inhale', 'Bring the leg forward'],
        [6, 'Exhale', 'Fold'],
        [7, 'Inhale', 'Hands to the waist, leg up, five breaths'],
        [8, 'Inhale', 'Left leg up, hold the big toe, five breaths'],
        [9, 'Exhale', 'Fold over the leg, five breaths'],
        [10, 'Inhale', 'Stand tall, leg still up'],
        [11, 'Exhale', 'Open the leg to the side, five breaths'],
        [12, 'Inhale', 'Bring the leg forward'],
        [13, 'Exhale', 'Fold'],
        [14, 'Inhale', 'Hands to the waist, leg up, five breaths'],
      ],
      foot: 'Exhale, lower the leg to samasthiti. This pose comes in after the reclining version is familiar.',
    },
    p16: {
      holds: [2, 7],
      steps: [
        [1, 'Inhale', 'Right foot to half lotus, bind'],
        [2, 'Exhale', 'Fold, five breaths'],
        [3, 'Inhale', 'Head up, lengthen'],
        [4, 'Inhale', 'Stand up'],
        [5, 'Exhale', 'Release the leg'],
        [6, 'Inhale', 'Left foot to half lotus, bind'],
        [7, 'Exhale', 'Fold, five breaths'],
        [8, 'Inhale', 'Head up, lengthen'],
        [9, 'Inhale', 'Stand up'],
      ],
      foot: 'Exhale to samasthiti, then vinyasa.',
    },
    p17: {
      holds: [7],
      steps: [
        [1, 'Inhale', 'Arms up'],
        [2, 'Exhale', 'Fold'],
        [3, 'Inhale', 'Head up, lengthen'],
        [4, 'Exhale', 'Jump back'],
        [5, 'Inhale', 'Upward dog'],
        [6, 'Exhale', 'Downward dog'],
        [7, 'Inhale', 'Jump forward to chair, five breaths'],
        [8, 'Inhale', 'Head up'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
      ],
      foot: 'After the five breaths, exhale and fold. Eight is the inhale back up. Warrior continues from downward dog.',
    },
    p18: {
      holds: [7, 8],
      steps: [
        [7, 'Inhale', 'Right side, warrior I, five breaths'],
        [8, 'Exhale', 'Left side, warrior I, five breaths'],
      ],
      foot: 'No vinyasa between the sides. Warrior II turns from here.',
    },
    p19: {
      holds: [9, 10],
      steps: [
        [9, 'Inhale', 'Right side, warrior II, five breaths'],
        [10, 'Exhale', 'Left side, warrior II, five breaths'],
        [11, 'Inhale', 'Head up'],
        [12, 'Exhale', 'Jump back'],
        [13, 'Inhale', 'Upward dog'],
        [14, 'Exhale', 'Downward dog'],
      ],
      foot: 'Then jump through to sitting. Daṇḍāsana is seven of the next count.',
    },
    p20: {
      holds: [7],
      steps: [[7, 'Inhale', 'Jump through to staff, five breaths']],
      foot: 'Exhale, and stay seated. Paścimottānāsana A is eight.',
    },
    p21: {
      holds: [9],
      steps: [
        [8, 'Inhale', 'Hold the big toes, head up'],
        [9, 'Exhale', 'Fold, five breaths'],
        [10, 'Inhale', 'Head up, lengthen'],
      ],
      foot: 'Exhale. B takes the sides of the feet, and eight, nine, and ten repeat.',
    },
    p22: {
      holds: [9],
      steps: [
        [8, 'Inhale', 'Hands over the feet, head up'],
        [9, 'Exhale', 'Fold, five breaths'],
        [10, 'Inhale', 'Head up, lengthen'],
        ...out(11),
      ],
      foot: 'Same eight, nine, and ten as A, with the hands over the feet. Then the vinyasa.',
    },
    p24: {
      holds: [8],
      steps: [
        [7, 'Inhale', 'Jump through, hands behind the hips'],
        [8, 'Inhale', 'Lift the hips, five breaths'],
        [9, 'Exhale', 'Sit down'],
        ...out(10),
      ],
      foot: 'The count was already at seven, from downward dog.',
    },
    p25: twoSide(
      'Jump through, right leg in half lotus, bind',
      'Jump through, left leg in half lotus, bind',
      'Fold, ' + stay,
      'The count is already at seven. A vinyasa separates the sides.'
    ),
    p26: twoSide(
      'Jump through, right foot beside the hip',
      'Jump through, left foot beside the hip',
      'Fold, ' + stay,
      'The count is already at seven. A vinyasa separates the sides.'
    ),
    p27: twoSide(
      'Jump through, right foot to the inner thigh',
      'Jump through, left foot to the inner thigh',
      'Fold, ' + stay,
      'The count is already at seven. A vinyasa separates the sides.'
    ),
    p28: twoSide(
      'Jump through, sit on the right heel',
      'Jump through, sit on the left heel',
      'Fold, ' + stay,
      'The count is already at seven. A vinyasa separates the sides.'
    ),
    p29: twoSide(
      'Jump through, right foot up on its ball',
      'Jump through, left foot up on its ball',
      'Fold, ' + stay,
      'The count is already at seven. A vinyasa separates the sides.'
    ),
    p30: {
      holds: [8, 15],
      steps: [
        [7, 'Inhale', 'Jump through, right knee up'],
        [8, 'Exhale', 'Fold, and stay for five breaths'],
        [9, 'Inhale', 'Head up'], [10, 'Inhale', 'Lift up'], [11, 'Exhale', 'Jump back'],
        [12, 'Inhale', 'Upward dog'], [13, 'Exhale', 'Downward dog'],
        [14, 'Inhale', 'Jump through, left knee up'],
        [15, 'Exhale', 'Fold, and stay for five breaths'],
        [16, 'Inhale', 'Head up'], [17, 'Inhale', 'Lift up'], [18, 'Exhale', 'Jump back'],
        [19, 'Inhale', 'Upward dog'], [20, 'Exhale', 'Downward dog'],
      ],
      foot: 'The count is already at seven. The vinyasa between poses carries it.',
      ask: {
        q: 'The first side of Marichi A is held on which count?',
        options: ['sapta', 'aṣṭau', 'nava', 'daśa'],
        answer: 1,
        why: 'Aṣṭau, eight. The second side is held on pañcadaśa, fifteen.',
      },
    },
    p31: twoSide(
      'Jump through, left leg in lotus, right knee up',
      'Jump through, right leg in lotus, left knee up',
      'Fold, ' + stay,
      'Same count as Marichi A. The lotus leg is the one that stays down.'
    ),
    p32: inhaleSide(
      'Jump through and twist to the right, five breaths',
      'Jump through and twist to the left, five breaths',
      'Taken on the inhale, so the hold is seven, then twelve. Marichi A and B are held on eight.'
    ),
    p33: inhaleSide(
      'Jump through, lotus, twist to the right, five breaths',
      'Jump through, lotus, twist to the left, five breaths',
      'Taken on the inhale, like Marichi C. The hold is seven, then twelve.'
    ),
    p34: {
      holds: [7],
      steps: [
        [7, 'Inhale', 'Boat, five breaths'], [8, 'Inhale', 'Lift up'],
        [9, 'Exhale', 'Jump back'], [10, 'Inhale', 'Upward dog'], [11, 'Exhale', 'Downward dog'],
      ],
      foot: 'Sapta and aṣṭau repeat, three to five rounds, before the jump back.',
      ask: {
        q: 'Which count is the boat itself?',
        options: ['pañca', 'ṣaṭ', 'sapta', 'nava'],
        answer: 2,
        why: 'Sapta. Aṣṭau is the lift between rounds.',
      },
    },
    p35: {
      holds: [8],
      steps: [
        [7, 'Inhale', 'Jump the legs around the arms, cross the feet'],
        [8, 'Exhale', 'Chin toward the floor, five breaths'],
        [9, 'Inhale', 'Head up'],
        [10, 'Inhale', 'Lift up'],
        [11, 'Exhale', 'Jump back'],
        [12, 'Inhale', 'Upward dog'],
        [13, 'Exhale', 'Downward dog'],
      ],
      foot: 'There is an exhale in bakāsana between the lift and the jump back. It is not given its own number.',
    },
    p36: {
      holds: [7],
      steps: [[7, 'Inhale', 'Legs over the shoulders, five breaths']],
      foot: 'Stay down. Supta Kūrmāsana binds the feet and the hands from here.',
    },
    p37: {
      holds: [8],
      steps: [
        [8, 'Exhale', 'Feet behind the head, hands bound, five breaths'],
        [9, 'Inhale', 'Look up'],
        [10, 'Inhale', 'Lift up'],
        [11, 'Exhale', 'Jump back'],
        [12, 'Inhale', 'Upward dog'],
        [13, 'Exhale', 'Downward dog'],
      ],
      foot: 'Kūrmāsana was seven. This bind is eight.',
    },
    p38: {
      holds: [9],
      steps: [
        [7, 'Inhale', 'Jump through to staff'],
        [8, 'Exhale', 'Lotus, arms through, hands to the face'],
        [9, 'Roll', 'Nine circles: inhale up, exhale down'],
      ],
      foot: 'Nine rolls, clockwise. The rooster is the next inhale.',
    },
    p39: {
      holds: [9],
      steps: [
        [9, 'Inhale', 'Lift into the rooster, five breaths'],
        ...out(10),
      ],
      foot: 'Nine was also the rolls in Garbha Piṇḍāsana. This inhale is the lift.',
    },
    p40: {
      holds: [7],
      steps: [[7, 'Inhale', 'Jump through, soles together, sit tall, five breaths']],
      foot: 'Stay seated. B is the fold.',
    },
    p41: {
      holds: [8],
      steps: [
        [8, 'Exhale', 'Fold, five breaths'],
        [9, 'Inhale', 'Sit up'],
        ...out(10),
      ],
      foot: 'A was seven, sitting tall. This fold is eight.',
    },
    p42: {
      holds: [8, 9],
      steps: [
        [7, 'Inhale', 'Jump through, hold the feet, legs wide'],
        [8, 'Exhale', 'Fold, five breaths'],
        [9, 'Inhale', 'Balance, legs wide, five breaths'],
        ...out(10),
      ],
      foot: 'Eight is the fold. Nine is the lift, still holding the feet.',
    },
    p43: {
      holds: [8],
      steps: [
        [7, 'Inhale', 'Jump through and lie down'],
        [8, 'Inhale', 'Legs up and wide, hold the toes, five breaths'],
        [9, 'Inhale', 'Roll up'],
        [10, 'Inhale', 'Head up'],
        ...out(11),
      ],
      foot: 'You lie down on seven, then the pose is eight.',
    },
    p44: {
      holds: [9, 11, 17, 19],
      steps: [
        [7, 'Inhale', 'Jump through and lie down'],
        [8, 'Inhale', 'Right leg up, hold the big toe'],
        [9, 'Exhale', 'Chin toward the shin, five breaths'],
        [10, 'Inhale', 'Head down'],
        [11, 'Exhale', 'Open the leg to the side, five breaths'],
        [12, 'Inhale', 'Leg back to center'],
        [13, 'Exhale', 'Fold'],
        [14, 'Inhale', 'Head down'],
        [15, 'Exhale', 'Leg down'],
        [16, 'Inhale', 'Left leg up, hold the big toe'],
        [17, 'Exhale', 'Chin toward the shin, five breaths'],
        [18, 'Inhale', 'Head down'],
        [19, 'Exhale', 'Open the leg to the side, five breaths'],
        [20, 'Inhale', 'Leg back to center'],
        [21, 'Exhale', 'Fold'],
        [22, 'Inhale', 'Head down'],
        [23, 'Exhale', 'Leg down'],
        [24, 'Inhale', 'Roll back, cakrāsana'],
        [25, 'Inhale', 'Upward dog'],
        [26, 'Exhale', 'Downward dog'],
      ],
      foot: 'Both sides are inside this count. You leave with a backward roll, not a jump back.',
    },
    p45: {
      holds: [9],
      steps: [
        [7, 'Inhale', 'Jump through and lie down'],
        [8, 'Inhale', 'Both legs up, hold the big toes'],
        [9, 'Inhale', 'Roll up to balance, five breaths'],
        ...out(10),
      ],
      foot: 'You lie down on seven. The balance is nine.',
    },
    p46: {
      holds: [9, 10],
      steps: [
        [7, 'Inhale', 'Jump through and lie down'],
        [8, 'Inhale', 'Legs up, hold the feet'],
        [9, 'Inhale', 'Roll up, arms straight, five breaths'],
        [10, 'Exhale', 'Fold toward the legs, five breaths'],
        [11, 'Inhale', 'Head up, arms straight'],
        ...out(12),
      ],
      foot: 'Nine is the balance. Ten is the fold.',
    },
    p47: {
      holds: [9],
      steps: [
        [7, 'Inhale', 'Jump through and lie down'],
        [8, 'Exhale', 'Feet in, arms crossed under the back'],
        [9, 'Inhale', 'Lift into the bridge, five breaths'],
        [10, 'Exhale', 'Lower down'],
        [11, 'Inhale', 'Roll back, cakrāsana'],
        [12, 'Inhale', 'Upward dog'],
        [13, 'Exhale', 'Downward dog'],
      ],
      foot: 'The roll leads into the finishing poses.',
    },

    s01: twoSide(
      'Jump through to a squat, twist to the right',
      'Jump through to a squat, twist to the left',
      'Bind, ' + stay,
      'A vinyasa between the sides. The hold is the exhale, eight and fifteen.'
    ),
    s02: twoSide(
      'Jump through, right leg up, hold the foot',
      'Jump through, left leg up, hold the foot',
      'Chin to the shin, ' + stay,
      'A vinyasa between the sides.'
    ),
    s03: {
      holds: [5],
      steps: [
        [4, 'Exhale', 'Lower to the floor'],
        [5, 'Inhale', 'Locust A, arms back, five breaths'],
      ],
      foot: 'Stay down. Locust B is the next inhale.',
    },
    s04: {
      holds: [6],
      steps: [
        [6, 'Inhale', 'Locust B, chest and legs up, five breaths'],
        [7, 'Inhale', 'Upward dog'],
        [8, 'Exhale', 'Downward dog'],
      ],
      foot: 'Locust A was five. This lift is six, then the vinyasa.',
    },
    s05: {
      holds: [5],
      steps: [
        [4, 'Exhale', 'Lower to the floor'],
        [5, 'Inhale', 'Take the feet and press up, five breaths'],
        [6, 'Inhale', 'Upward dog'],
        [7, 'Exhale', 'Downward dog'],
      ],
      foot: 'The pose is pañca. Then upward dog and downward dog.',
    },
    s06: {
      holds: [5],
      steps: [
        [4, 'Exhale', 'Lower, catch the ankles'],
        [5, 'Inhale', 'Bow, five breaths'],
      ],
      foot: 'Stay holding the ankles. Side bow rolls from here.',
    },
    s07: {
      holds: [6, 8, 9],
      steps: [
        [6, 'Exhale', 'Roll to the right, five breaths'],
        [7, 'Inhale', 'Come up to the bow'],
        [8, 'Exhale', 'Roll to the left, five breaths'],
        [9, 'Inhale', 'Bow in the center, five breaths'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
      ],
      foot: 'Both sides, then the bow again, then the vinyasa.',
    },
    s08: {
      holds: [8],
      steps: [
        [7, 'Inhale', 'Jump forward to kneeling, hands on the waist'],
        [8, 'Exhale', 'Reach the heels, five breaths'],
        [9, 'Inhale', 'Come up'],
        ...out(10),
      ],
      foot: 'The backbend is the exhale, eight.',
    },
    s09: {
      holds: [8],
      steps: [
        [7, 'Inhale', 'Kneeling, hands on the waist'],
        [8, 'Exhale', 'Reach the ankles and lean back, five breaths'],
        [9, 'Inhale', 'Come up'],
        ...out(10),
      ],
      foot: 'You come up on nine, still kneeling, then lift and jump back.',
    },
    s10: {
      holds: [8],
      steps: [
        [7, 'Inhale', 'Kneeling, hands on the waist'],
        [8, 'Exhale', 'Catch the heels, five breaths'],
      ],
      foot: 'Stay in the backbend. B straightens the arms.',
    },
    s11: {
      holds: [9],
      steps: [
        [9, 'Inhale', 'Straighten the arms, five breaths'],
        [10, 'Inhale', 'Come up, hands on the waist'],
        ...out(11),
      ],
      foot: 'A was eight, catching the heels. This inhale deepens it.',
    },
    s12: {
      holds: [9],
      steps: [
        [7, 'Inhale', 'Jump through to sitting'],
        [8, 'Exhale', 'Lotus'],
        [9, 'Exhale', 'Head down, five breaths'],
        [10, 'Inhale', 'Head up, back to bound lotus'],
        [11, 'Inhale', 'Lift the lotus'],
        [12, 'Exhale', 'Jump back'],
        [13, 'Inhale', 'Upward dog'],
        [14, 'Exhale', 'Downward dog'],
      ],
      foot: 'Lower and lift three to five times on nine and ten, then stay down for five breaths before you come up.',
    },
    s13: {
      holds: [8],
      steps: [
        [7, 'Inhale', 'Jump forward to a squat'],
        [8, 'Inhale', 'Lift into the crane, five breaths'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
      ],
      foot: 'The crane itself is eight.',
    },
    s14: twoSide(
      'Jump through, twist to the right',
      'Jump through, twist to the left',
      'Bind, ' + stay,
      'A vinyasa between the sides.'
    ),
    s15: twoSide(
      'Jump through, right foot by the hip, twist right',
      'Jump through, left foot by the hip, twist left',
      'Bind, ' + stay,
      'A vinyasa between the sides.'
    ),
    s16: twoSide(
      'Jump through, right leg behind the head',
      'Jump through, left leg behind the head',
      'Fold, ' + stay,
      'A vinyasa between the sides. Gaze the nose, then the foot.'
    ),
    s17: {
      holds: [7, 8],
      steps: [
        [7, 'Inhale', 'Both legs behind the head, ten breaths'],
        [8, 'Inhale', 'Lift, five breaths'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
      ],
      foot: 'Seven is the pose. Eight is the lift, then the vinyasa.',
    },
    s18: {
      holds: [8],
      steps: [
        [7, 'Inhale', 'Jump through and lie down'],
        [8, 'Exhale', 'Both legs behind the head, ten breaths'],
        [9, 'Inhale', 'Roll back, cakrāsana'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
      ],
      foot: 'You leave with a backward roll.',
    },
    s19: {
      holds: [7, 8, 10],
      steps: [
        [7, 'Inhale', 'Firefly A, five breaths'],
        [8, 'Inhale', 'Firefly B, hands bound, five breaths'],
        [9, 'Walk', 'Five steps forward, five steps back'],
        [10, 'Inhale', 'Hands to the ankles, five breaths'],
        [11, 'Inhale', 'Lift up'],
        [12, 'Exhale', 'Jump back'],
        [13, 'Inhale', 'Upward dog'],
        [14, 'Exhale', 'Downward dog'],
      ],
      foot: 'A, B, and C are one count. Nine is the walk, not a held pose.',
    },
    s20: {
      holds: [8],
      steps: [
        [7, 'Exhale', 'Forearms down'],
        [8, 'Inhale', 'Lift, five breaths'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
      ],
      foot: 'The balance is eight. Then a vinyasa, not a drop to standing.',
    },
    s21: {
      holds: [9],
      steps: [
        [7, 'Exhale', 'Forearms down'],
        [8, 'Inhale', 'Lift to pincha'],
        [9, 'Exhale', 'Lotus, and lower, five breaths'],
        [10, 'Inhale', 'Lift back up'],
        [11, 'Exhale', 'Jump back'],
        [12, 'Inhale', 'Upward dog'],
        [13, 'Exhale', 'Downward dog'],
        [14, 'Inhale', 'Jump forward and stand'],
        [15, 'Exhale', 'Fold'],
      ],
      foot: 'Inhale to samasthiti. The pose is nine, the lowering.',
    },
    s22: {
      holds: [5],
      steps: [
        [1, 'Exhale', 'Hands on the floor, look forward'],
        [2, 'Exhale', 'Head down between the arms'],
        [3, 'Inhale', 'Head up'],
        [4, 'Exhale', 'Jump back'],
        [5, 'Inhale', 'Peacock, five breaths'],
        [6, 'Inhale', 'Upward dog'],
        [7, 'Exhale', 'Downward dog'],
        [8, 'Inhale', 'Jump forward, head up'],
        [9, 'Exhale', 'Fold'],
      ],
      foot: 'Inhale to samasthiti.',
    },
    s23: {
      holds: [5],
      steps: [
        [1, 'Inhale', 'Arms up'],
        [2, 'Exhale', 'Fold'],
        [3, 'Inhale', 'Head up'],
        [4, 'Exhale', 'Jump back, hold'],
        [5, 'Jump', 'Five jumps forward, five jumps back'],
        [6, 'Inhale', 'Upward dog'],
        [7, 'Exhale', 'Downward dog'],
        [8, 'Inhale', 'Jump forward and stand'],
        [9, 'Exhale', 'Fold'],
      ],
      foot: 'Inhale to samasthiti. The jumps are five.',
    },
    s24: {
      holds: [7, 12],
      steps: [
        [1, 'Inhale', 'Right leg to half lotus, bind'],
        [2, 'Exhale', 'Hands down'],
        [3, 'Inhale', 'Head up'],
        [4, 'Exhale', 'Jump back'],
        [5, 'Inhale', 'Upward dog'],
        [6, 'Exhale', 'Downward dog'],
        [7, 'Inhale', 'Right side, five breaths'],
        [8, 'Inhale', 'Lift up'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
        [12, 'Inhale', 'Left side, five breaths'],
        [13, 'Inhale', 'Lift up'],
        [14, 'Exhale', 'Jump back'],
        [15, 'Inhale', 'Upward dog'],
        [16, 'Exhale', 'Downward dog'],
        [17, 'Inhale', 'Jump forward, head up'],
        [18, 'Exhale', 'Fold'],
        [19, 'Inhale', 'Head up'],
        [20, 'Exhale', 'Stand'],
      ],
      foot: 'Inhale to samasthiti. A vinyasa separates the sides, then you return to standing.',
    },
    s25: twoSide(
      'Jump through, kneel on the right knee, lean left',
      'Jump through, kneel on the left knee, lean right',
      'Gate, ' + stay,
      'A vinyasa between the sides. Hands come to the waist to enter and to leave.'
    ),
    s26: twoSide(
      'Jump through, right leg in cow face, sit tall',
      'Jump through, left leg in cow face, sit tall',
      'Sit, ' + stay,
      'A vinyasa between the sides. B is the fold, with the same count.'
    ),
    s27: twoSide(
      'Jump through, cow face legs, right side',
      'Jump through, cow face legs, left side',
      'Fold, ' + stay,
      'A vinyasa between the sides.'
    ),
    s28: {
      holds: [9, 16],
      steps: [
        [7, 'Inhale', 'Jump through and lie down'],
        [8, 'Inhale', 'Right leg in half lotus, hold the foot'],
        [9, 'Inhale', 'Roll up and twist right, five breaths'],
        [10, 'Inhale', 'Lift up'],
        [11, 'Exhale', 'Jump back'],
        [12, 'Inhale', 'Upward dog'],
        [13, 'Exhale', 'Downward dog'],
        [14, 'Inhale', 'Jump through and lie down'],
        [15, 'Inhale', 'Left leg in half lotus, hold the foot'],
        [16, 'Inhale', 'Roll up and twist left, five breaths'],
        [17, 'Inhale', 'Lift up'],
        [18, 'Exhale', 'Jump back'],
        [19, 'Inhale', 'Upward dog'],
        [20, 'Exhale', 'Downward dog'],
      ],
      foot: 'A vinyasa between the sides. The twist is nine, then sixteen.',
    },
    s29: {
      holds: [8],
      steps: [
        [7, 'Exhale', 'A: hands on the floor, head down'],
        [8, 'Inhale', 'Free hands headstand A, five breaths'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
        [7, 'Exhale', 'B: hands in prayer, head down'],
        [8, 'Inhale', 'Free hands headstand B, five breaths'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
        [7, 'Exhale', 'C: arms wide, head down'],
        [8, 'Inhale', 'Free hands headstand C, five breaths'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
      ],
      foot: 'A vinyasa after each. The count starts again at seven.',
    },
    s30: {
      holds: [8],
      steps: [
        [7, 'Exhale', 'A: hands bound, head down'],
        [8, 'Inhale', 'Bound hands headstand A, five breaths'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
        [7, 'Exhale', 'B: one hand on the other, head down'],
        [8, 'Inhale', 'Bound hands headstand B, five breaths'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
        [7, 'Exhale', 'C: palms together, head down'],
        [8, 'Inhale', 'Bound hands headstand C, five breaths'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
        [7, 'Exhale', 'D: forearms on the floor, head down'],
        [8, 'Inhale', 'Bound hands headstand D, five breaths'],
        [9, 'Exhale', 'Jump back'],
        [10, 'Inhale', 'Upward dog'],
        [11, 'Exhale', 'Downward dog'],
      ],
      foot: 'A vinyasa after each. The count starts again at seven.',
    },

    f01: {
      holds: [8],
      steps: [
        [7, 'Inhale', 'Lie down, hands by the ears'],
        [8, 'Inhale', 'Wheel, five to ten breaths'],
        [9, 'Exhale', 'Lower down'],
      ],
      foot: 'Eight and nine repeat, three to five rounds. Rest, fold forward, then shoulderstand.',
    },
    f02: {
      holds: [8],
      steps: [
        [7, 'Inhale', 'Lie down'],
        [8, 'Inhale', 'Shoulderstand, 10 to 25 breaths'],
      ],
      foot: 'Stay up. Halāsana is the next exhale.',
    },
    f03: {
      holds: [8],
      steps: [[8, 'Exhale', 'Plough, hands bound, 5 to 10 breaths']],
      foot: 'The count stays on eight. Karṇa Pīḍāsana is the next shape.',
    },
    f04: {
      holds: [8],
      steps: [[8, 'Exhale', 'Knees by the ears, 5 to 10 breaths']],
      foot: 'Still eight. The lotus in shoulderstand is nine.',
    },
    f05: {
      holds: [9],
      steps: [[9, 'Inhale', 'Lotus in shoulderstand, 5 to 10 breaths']],
      foot: 'Piṇḍāsana folds from here, still on nine.',
    },
    f06: {
      holds: [9],
      steps: [[9, 'Exhale', 'Fold the lotus, hands bound, 5 to 10 breaths']],
      foot: 'Come down into Matsyāsana.',
    },
    f07: {
      holds: [9],
      steps: [[9, 'Inhale', 'Fish, 5 to 10 breaths']],
      foot: 'You are down from shoulderstand. Uttāna Pādāsana is next.',
    },
    f08: {
      holds: [9],
      steps: [
        [9, 'Inhale', 'Chest and legs up, 5 to 10 breaths'],
        [10, 'Inhale', 'Roll back, cakrāsana'],
        [11, 'Inhale', 'Upward dog'],
        [12, 'Exhale', 'Downward dog'],
      ],
      foot: 'The roll leads toward headstand.',
    },
    f09: {
      holds: [8],
      steps: [
        [7, 'Exhale', 'Head and hands down'],
        [8, 'Inhale', 'Headstand, 10 to 25 breaths'],
      ],
      foot: 'Ūrdhva Daṇḍāsana lowers the legs from here.',
    },
    f10: {
      holds: [9],
      steps: [
        [9, 'Exhale', 'Lower the legs halfway, then inhale them up'],
        [10, 'Exhale', 'Come down'],
      ],
      foot: 'A few breaths in Bālāsana, then a vinyasa if you are continuing.',
    },
    f11: {
      holds: [0],
      steps: [[0, 'Rest', 'A few breaths, forehead down']],
      foot: 'Then vinyasa to sitting, for Yoga Mudrā.',
    },
    f12: {
      holds: [9],
      steps: [
        [7, 'Inhale', 'Jump through'],
        [8, 'Exhale', 'Lotus, and bind'],
        [9, 'Exhale', 'Fold, 10 to 25 breaths'],
      ],
      foot: 'Sit up into Padmāsana.',
    },
    f13: {
      holds: [8],
      steps: [[8, 'Inhale', 'Sit in lotus, 10 to 25 breaths']],
      foot: 'Utplutiḥ is the next inhale, the lift.',
    },
    f14: {
      holds: [9],
      steps: [
        [9, 'Inhale', 'Lift the body, 10 to 25 breaths'],
        [10, 'Exhale', 'Jump back'],
        [11, 'Inhale', 'Upward dog'],
        [12, 'Exhale', 'Downward dog'],
      ],
      foot: 'Then lie down. Śavāsana is not counted.',
    },
    f15: {
      holds: [0],
      steps: [[0, 'Rest', '10 to 20 minutes, eyes closed']],
      foot: 'The practice ends here.',
    },
  };
})();
