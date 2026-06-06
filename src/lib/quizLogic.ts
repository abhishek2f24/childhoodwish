import { QuizAnswers } from '@/types';

interface ProductScore {
  productId: string;
  score: number;
}

const PRODUCT_IDS = {
  RC_HELICOPTER: '1',
  RC_CAR: '2',
  MARBLES: '3',
  SPINNING_TOP: '4',
  YOYO: '5',
  GEOMETRY_BOX: '6',
  BLUETOOTH_SPEAKER: '7',
  TIFFIN: '8',
  BOX_90S: '9',
  DREAMER_BOX: '10',
  CUSTOM_BOX: '11',
  CRICKET_KIT: '12',
};

export function getQuizRecommendations(answers: QuizAnswers): string[] {
  const scores: Record<string, number> = {};

  // Initialize all product scores
  Object.values(PRODUCT_IDS).forEach((id) => {
    scores[id] = 0;
  });

  // --- Score by interests ---
  const interests = answers.interests || [];

  if (interests.includes('cricket')) {
    scores[PRODUCT_IDS.CRICKET_KIT] += 10;
    scores[PRODUCT_IDS.MARBLES] += 3;
  }
  if (interests.includes('rc-vehicles')) {
    scores[PRODUCT_IDS.RC_HELICOPTER] += 10;
    scores[PRODUCT_IDS.RC_CAR] += 10;
    scores[PRODUCT_IDS.DREAMER_BOX] += 7;
  }
  if (interests.includes('outdoor-games')) {
    scores[PRODUCT_IDS.MARBLES] += 8;
    scores[PRODUCT_IDS.YOYO] += 7;
    scores[PRODUCT_IDS.SPINNING_TOP] += 6;
    scores[PRODUCT_IDS.CRICKET_KIT] += 6;
  }
  if (interests.includes('indoor-games')) {
    scores[PRODUCT_IDS.MARBLES] += 8;
    scores[PRODUCT_IDS.SPINNING_TOP] += 8;
    scores[PRODUCT_IDS.YOYO] += 7;
  }
  if (interests.includes('stationery')) {
    scores[PRODUCT_IDS.GEOMETRY_BOX] += 10;
    scores[PRODUCT_IDS.TIFFIN] += 7;
    scores[PRODUCT_IDS.BLUETOOTH_SPEAKER] += 5;
  }
  if (interests.includes('music-nostalgia')) {
    scores[PRODUCT_IDS.BLUETOOTH_SPEAKER] += 10;
    scores[PRODUCT_IDS.TIFFIN] += 4;
  }

  // --- Score by budget ---
  switch (answers.budget) {
    case 'under-500':
      scores[PRODUCT_IDS.MARBLES] += 5;
      scores[PRODUCT_IDS.SPINNING_TOP] += 5;
      scores[PRODUCT_IDS.YOYO] += 5;
      break;
    case '500-1000':
      scores[PRODUCT_IDS.RC_HELICOPTER] += 5;
      scores[PRODUCT_IDS.RC_CAR] += 5;
      scores[PRODUCT_IDS.GEOMETRY_BOX] += 5;
      scores[PRODUCT_IDS.TIFFIN] += 5;
      scores[PRODUCT_IDS.CRICKET_KIT] += 5;
      scores[PRODUCT_IDS.DREAMER_BOX] += 4;
      break;
    case '1000-2000':
      scores[PRODUCT_IDS.BLUETOOTH_SPEAKER] += 5;
      scores[PRODUCT_IDS.DREAMER_BOX] += 7;
      scores[PRODUCT_IDS.CUSTOM_BOX] += 7;
      scores[PRODUCT_IDS.BOX_90S] += 6;
      break;
    case '2000-plus':
      scores[PRODUCT_IDS.BOX_90S] += 8;
      scores[PRODUCT_IDS.CUSTOM_BOX] += 8;
      scores[PRODUCT_IDS.DREAMER_BOX] += 6;
      break;
  }

  // --- Score by decade ---
  switch (answers.decade) {
    case '80s':
      scores[PRODUCT_IDS.TIFFIN] += 6;
      scores[PRODUCT_IDS.SPINNING_TOP] += 6;
      scores[PRODUCT_IDS.BLUETOOTH_SPEAKER] += 6;
      scores[PRODUCT_IDS.MARBLES] += 5;
      break;
    case '90s':
      scores[PRODUCT_IDS.RC_HELICOPTER] += 6;
      scores[PRODUCT_IDS.GEOMETRY_BOX] += 6;
      scores[PRODUCT_IDS.YOYO] += 6;
      scores[PRODUCT_IDS.BOX_90S] += 8;
      break;
    case '2000s':
      scores[PRODUCT_IDS.RC_CAR] += 6;
      scores[PRODUCT_IDS.CRICKET_KIT] += 5;
      scores[PRODUCT_IDS.DREAMER_BOX] += 5;
      break;
  }

  // --- Score by occasion ---
  if (answers.occasion === 'birthday' || answers.occasion === 'milestone') {
    scores[PRODUCT_IDS.BOX_90S] += 5;
    scores[PRODUCT_IDS.DREAMER_BOX] += 5;
    scores[PRODUCT_IDS.CUSTOM_BOX] += 5;
  }
  if (answers.occasion === 'self-gift') {
    scores[PRODUCT_IDS.RC_HELICOPTER] += 3;
    scores[PRODUCT_IDS.RC_CAR] += 3;
    scores[PRODUCT_IDS.BLUETOOTH_SPEAKER] += 3;
  }

  // --- Score by recipient ---
  if (answers.recipient === 'myself' || answers.recipient === 'self') {
    scores[PRODUCT_IDS.RC_HELICOPTER] += 3;
    scores[PRODUCT_IDS.BLUETOOTH_SPEAKER] += 3;
  }
  if (answers.recipient === 'brother') {
    scores[PRODUCT_IDS.RC_CAR] += 3;
    scores[PRODUCT_IDS.CRICKET_KIT] += 3;
    scores[PRODUCT_IDS.DREAMER_BOX] += 3;
  }

  // Sort products by score descending
  const sorted: ProductScore[] = Object.entries(scores)
    .map(([productId, score]) => ({ productId, score }))
    .sort((a, b) => b.score - a.score);

  // Return top 3 product IDs
  return sorted.slice(0, 3).map((s) => s.productId);
}

export const QUIZ_QUESTIONS = [
  {
    id: 'recipient',
    question: "Who's this gift for?",
    options: [
      { label: 'For Myself', value: 'myself', emoji: '🙋' },
      { label: 'For a Friend', value: 'friend', emoji: '🤝' },
      { label: 'For My Brother', value: 'brother', emoji: '👦' },
      { label: 'For My Husband', value: 'husband', emoji: '❤️' },
      { label: 'For Someone Else', value: 'other', emoji: '🎁' },
    ],
    multiSelect: false,
  },
  {
    id: 'decade',
    question: 'When did they grow up?',
    options: [
      { label: '80s Kid', value: '80s', emoji: '📻', sub: '(born 1975–1985)' },
      { label: '90s Kid', value: '90s', emoji: '🎮', sub: '(born 1986–1995)' },
      { label: '2000s Kid', value: '2000s', emoji: '📱', sub: '(born 1996–2005)' },
      { label: 'Not Sure', value: 'unsure', emoji: '🤷', sub: '' },
    ],
    multiSelect: false,
  },
  {
    id: 'interests',
    question: 'What did they love as a kid?',
    options: [
      { label: 'Cricket & Sports', value: 'cricket', emoji: '🏏' },
      { label: 'Toy Vehicles & RC', value: 'rc-vehicles', emoji: '🚗' },
      { label: 'Outdoor Games', value: 'outdoor-games', emoji: '🎯' },
      { label: 'School Stationery', value: 'stationery', emoji: '✏️' },
      { label: 'Indoor Games', value: 'indoor-games', emoji: '🏠' },
      { label: 'Music & Radio', value: 'music-nostalgia', emoji: '🎵' },
    ],
    multiSelect: true,
  },
  {
    id: 'budget',
    question: "What's your budget?",
    options: [
      { label: 'Under ₹500', value: 'under-500', emoji: '💰' },
      { label: '₹500–₹1,000', value: '500-1000', emoji: '💳' },
      { label: '₹1,000–₹2,000', value: '1000-2000', emoji: '🎁' },
      { label: '₹2,000+', value: '2000-plus', emoji: '✨' },
    ],
    multiSelect: false,
  },
  {
    id: 'occasion',
    question: "What's the occasion?",
    options: [
      { label: 'Birthday', value: 'birthday', emoji: '🎂' },
      { label: 'Just Because', value: 'just-because', emoji: '🎁' },
      { label: 'Milestone / Achievement', value: 'milestone', emoji: '💼' },
      { label: 'Housewarming', value: 'housewarming', emoji: '🏠' },
      { label: 'Self-Gift', value: 'self-gift', emoji: '💝' },
      { label: 'Other', value: 'other', emoji: '🌟' },
    ],
    multiSelect: false,
  },
];
