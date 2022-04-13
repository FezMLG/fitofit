export interface IUserLogin {
  userId: string;
  username: string;
  password: string;
}

export interface IUserDetails {
  userId: string;
  username: string;
  about?: string;
  gender?: string;
  avatar?: string;
  workouts?: IWorkout[];
  goals?: IGoal[];
}

export type GoalType = 'distance' | 'workoutCount';
export type Gender = 'male' | 'female' | 'other' | 'prefer not to say';

export interface IGoal {
  userId: string;
  goalId: string;
  type: 'distance' | 'workoutCount';
  startDate: string;
  endDate: string;
  name: string;
  notes?: string;
  isCompleted: boolean;
}

export interface IStandardResponse {
  statusCode: number;
  message: string;
  error?: string;
}

export interface IStatsRequest {
  startDate?: string;
  endDate?: string;
  discipline?: Discipline;
}

export interface IStatsResponse {
  request: IStatsRequest;
  stats: {
    top: {
      avgSpeed: number;
      distance: number;
      duration: number;
      favoriteSport?: {
        name: string;
        total: number;
      };
    };
    avg: {
      avgSpeed: number;
      distance: number;
      duration: number;
    };
    total: {
      distance: number;
      duration: number;
      sport: [
        {
          name: string;
          total: number;
        },
      ];
    };
  };
}

export type Discipline = 'biking' | 'swimming' | 'running';

export interface IPartialWorkout {
  discipline: Discipline;
  distance: number;
  duration: number;
}

export interface IWorkout {
  workoutId: string;
  userId: string;
  date: string;
  parts: IPartialWorkout[];
  notes?: string;
}

export interface ITrainingReturn {
  userId: string;
  date: string;
  parts: Part[];
  id: string | number;
  notes: string;
}

export interface Part {
  discipline: string;
  distance: number;
  duration: number;
  id: string | number;
}
