export interface LoginRequest {
    username: string;
    password: string;
}

export interface SignupRequest {
    username: string;
    email: string;
    password: string;
    role?: string[];
}

export interface JwtResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
}

export interface UserProfileDto {
    id: number;
    username: string;
    email: string;
    roles: string[];

}

export interface UserProfileUpdateDto {
    email?: string;

}

export interface WorkoutDto {
    id: number;
    userId: number;
    exerciseType: string;
    durationMinutes: number;
    intensity: number;
    notes?: string;
    workoutTime: string;
}

export interface WorkoutCreateDto {
    exerciseType: string;
    durationMinutes: number;
    intensity: number;
    notes?: string;
    workoutTime?: string;
}

export enum GoalStatus {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}

export interface GoalDto {
    id: number;
    userId: number;
    goalType: string;
    targetValue: number;
    currentValue?: number;
    startDate: string;
    endDate?: string;
    status: GoalStatus;
}

export interface GoalCreateDto {
    goalType: string;
    targetValue: number;
    startDate: string;
    endDate?: string;
}

export interface GoalUpdateDto {
    targetValue?: number;
    currentValue?: number;
    endDate?: string;
    status?: GoalStatus;
}

export interface ProgressDashboardDto {
    totalWorkouts: number;
    totalDurationMinutes: number;
    workoutDurationByType: Record<string, number>;
    workoutCountByType: Record<string, number>;
    activeGoals: number;
    completedGoals: number;
}