import { databaseManager } from './database';
import { Quiz, QuizQuestion, QuizAttempt } from './types';

export class QuizManager {
  async createQuiz(quiz: Quiz): Promise<Quiz> {
    const questionsJson = JSON.stringify(quiz.questions);
    const result = await databaseManager.run(
      `INSERT INTO quizzes (title, description, questions, created_by)
       VALUES (?, ?, ?, ?)`,
      [quiz.title, quiz.description || null, questionsJson, quiz.created_by]
    );

    return this.getQuizById(result.lastID) as Promise<Quiz>;
  }

  async getQuizById(quizId: number): Promise<Quiz | null> {
    const quiz = await databaseManager.get(
      'SELECT * FROM quizzes WHERE id = ?',
      [quizId]
    );

    if (!quiz) return null;

    return {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questions: JSON.parse(quiz.questions),
      created_by: quiz.created_by,
      created_at: quiz.created_at,
      updated_at: quiz.updated_at,
    };
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    const quizzes = await databaseManager.all(
      'SELECT * FROM quizzes ORDER BY created_at DESC'
    );

    return quizzes.map((quiz: any) => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questions: JSON.parse(quiz.questions),
      created_by: quiz.created_by,
      created_at: quiz.created_at,
      updated_at: quiz.updated_at,
    }));
  }

  async deleteQuiz(quizId: number): Promise<boolean> {
    const result = await databaseManager.run(
      'DELETE FROM quizzes WHERE id = ?',
      [quizId]
    );
    return result.changes > 0;
  }

  async submitQuizAttempt(attempt: QuizAttempt): Promise<QuizAttempt> {
    const answersJson = JSON.stringify(attempt.answers);
    const result = await databaseManager.run(
      `INSERT INTO quiz_attempts (user_id, quiz_id, answers, score, total_questions)
       VALUES (?, ?, ?, ?, ?)`,
      [attempt.user_id, attempt.quiz_id, answersJson, attempt.score || 0, attempt.total_questions || 0]
    );

    return this.getAttemptById(result.lastID) as Promise<QuizAttempt>;
  }

  async getAttemptById(attemptId: number): Promise<QuizAttempt | null> {
    const attempt = await databaseManager.get(
      'SELECT * FROM quiz_attempts WHERE id = ?',
      [attemptId]
    );

    if (!attempt) return null;

    return {
      id: attempt.id,
      user_id: attempt.user_id,
      quiz_id: attempt.quiz_id,
      answers: JSON.parse(attempt.answers),
      score: attempt.score,
      total_questions: attempt.total_questions,
      completed_at: attempt.completed_at,
    };
  }

  async getUserAttempts(userId: number): Promise<QuizAttempt[]> {
    const attempts = await databaseManager.all(
      `SELECT * FROM quiz_attempts WHERE user_id = ? ORDER BY completed_at DESC`,
      [userId]
    );

    return attempts.map((attempt: any) => ({
      id: attempt.id,
      user_id: attempt.user_id,
      quiz_id: attempt.quiz_id,
      answers: JSON.parse(attempt.answers),
      score: attempt.score,
      total_questions: attempt.total_questions,
      completed_at: attempt.completed_at,
    }));
  }

  async getQuizAttempts(quizId: number): Promise<QuizAttempt[]> {
    const attempts = await databaseManager.all(
      `SELECT * FROM quiz_attempts WHERE quiz_id = ? ORDER BY completed_at DESC`,
      [quizId]
    );

    return attempts.map((attempt: any) => ({
      id: attempt.id,
      user_id: attempt.user_id,
      quiz_id: attempt.quiz_id,
      answers: JSON.parse(attempt.answers),
      score: attempt.score,
      total_questions: attempt.total_questions,
      completed_at: attempt.completed_at,
    }));
  }

  calculateScore(answers: number[], quiz: Quiz): number {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (quiz.questions[index] && answer === quiz.questions[index].correct_answer) {
        correctCount++;
      }
    });
    return Math.round((correctCount / quiz.questions.length) * 100);
  }
}

export const quizManager = new QuizManager();
