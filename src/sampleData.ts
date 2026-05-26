import { databaseManager } from './database';
import { Quiz } from './types';

export const sampleQuizzes: Quiz[] = [
  {
    title: 'Basic Math',
    description: 'Test your basic mathematics skills',
    questions: [
      {
        id: 1,
        text: 'What is 15 + 27?',
        options: ['42', '40', '45', '38'],
        correct_answer: 0,
        explanation: '15 + 27 = 42',
      },
      {
        id: 2,
        text: 'What is 100 - 35?',
        options: ['65', '70', '75', '60'],
        correct_answer: 0,
        explanation: '100 - 35 = 65',
      },
      {
        id: 3,
        text: 'What is 8 × 9?',
        options: ['72', '70', '81', '64'],
        correct_answer: 0,
        explanation: '8 × 9 = 72',
      },
    ],
    created_by: 0,
  },
  {
    title: 'General Knowledge',
    description: 'Test your general knowledge',
    questions: [
      {
        id: 1,
        text: 'What is the capital of France?',
        options: ['Paris', 'Lyon', 'Marseille', 'Nice'],
        correct_answer: 0,
        explanation: 'Paris is the capital and most populous city of France.',
      },
      {
        id: 2,
        text: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correct_answer: 1,
        explanation: 'Mars is known as the Red Planet due to its reddish appearance.',
      },
    ],
    created_by: 0,
  },
];

export async function seedSampleQuizzes(adminId: number): Promise<void> {
  try {
    for (const quiz of sampleQuizzes) {
      quiz.created_by = adminId;
      await databaseManager.run(
        `INSERT INTO quizzes (title, description, questions, created_by)
         VALUES (?, ?, ?, ?)`,
        [
          quiz.title,
          quiz.description,
          JSON.stringify(quiz.questions),
          quiz.created_by,
        ]
      );
    }
    console.log('✅ Sample quizzes seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding sample quizzes:', error);
  }
}
