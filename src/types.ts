export interface User {
  id?: number;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  status: 'pending' | 'approved' | 'denied';
  requested_at?: string;
  approved_at?: string;
  created_at?: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
}

export interface Quiz {
  id?: number;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  created_by: number;
  created_at?: string;
  updated_at?: string;
}

export interface QuizAttempt {
  id?: number;
  user_id: number;
  quiz_id: number;
  answers: number[];
  score?: number;
  total_questions?: number;
  completed_at?: string;
}

export interface BotContext {
  userId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
}
