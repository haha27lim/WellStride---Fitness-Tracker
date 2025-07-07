const mockWorkouts = [
  {
    id: 1,
    exerciseType: "Running",
    durationMinutes: 30,
    intensity: 7,
    notes: "Morning run around the park",
    workoutTime: new Date().toISOString()
  },
  {
    id: 2,
    exerciseType: "Weight Training",
    durationMinutes: 45,
    intensity: 8,
    notes: "Focused on upper body",
    workoutTime: new Date(Date.now() - 86400000).toISOString() // Yesterday
  }
];

const mockGoals = [
  {
    id: 1,
    goalType: "Run 5km",
    targetValue: 5,
    currentValue: 3.2,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 86400000).toISOString(), // 30 days from now
    status: "IN_PROGRESS"
  },
  {
    id: 2,
    goalType: "Lose Weight",
    targetValue: 10,
    currentValue: 3,
    startDate: new Date(Date.now() - 15 * 86400000).toISOString(), // 15 days ago
    endDate: new Date(Date.now() + 15 * 86400000).toISOString(), // 15 days from now
    status: "IN_PROGRESS"
  }
];

const mockDashboard = {
  totalWorkouts: 12,
  totalDurationMinutes: 360,
  activeGoals: 3,
  completedGoals: 2
};

// Mock API functions
export const fetchWorkouts = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...mockWorkouts]), 500);
  });
};

export const createWorkout = (workout) => {
  return new Promise(resolve => {
    const newWorkout = {
      id: Math.floor(Math.random() * 1000) + 10,
      workoutTime: new Date().toISOString(),
      ...workout
    };
    mockWorkouts.unshift(newWorkout);
    setTimeout(() => resolve(newWorkout), 500);
  });
};

export const deleteWorkout = (id) => {
  return new Promise(resolve => {
    const index = mockWorkouts.findIndex(w => w.id === id);
    if (index !== -1) {
      mockWorkouts.splice(index, 1);
    }
    setTimeout(() => resolve(), 500);
  });
};

export const fetchGoals = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...mockGoals]), 500);
  });
};

export const createGoal = (goal) => {
  return new Promise(resolve => {
    const newGoal = {
      id: Math.floor(Math.random() * 1000) + 10,
      currentValue: 0,
      ...goal
    };
    mockGoals.push(newGoal);
    setTimeout(() => resolve(newGoal), 500);
  });
};

export const updateGoal = (id, update) => {
  return new Promise((resolve, reject) => {
    const index = mockGoals.findIndex(g => g.id === id);
    if (index !== -1) {
      mockGoals[index] = { ...mockGoals[index], ...update };
      if (update.status === 'COMPLETED' && !mockGoals[index].completedDate) {
        mockGoals[index].completedDate = new Date().toISOString();
      }
      setTimeout(() => resolve(mockGoals[index]), 500);
    } else {
      setTimeout(() => reject(new Error('Goal not found')), 500);
    }
  });
};

export const deleteGoal = (id) => {
  return new Promise(resolve => {
    const index = mockGoals.findIndex(g => g.id === id);
    if (index !== -1) {
      mockGoals.splice(index, 1);
    }
    setTimeout(() => resolve(), 500);
  });
};

export const fetchDashboard = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ ...mockDashboard }), 500);
  });
};

// Export all mock API functions
export const mockApi = {
  workouts: {
    fetch: fetchWorkouts,
    create: createWorkout,
    delete: deleteWorkout
  },
  goals: {
    fetch: fetchGoals,
    create: createGoal,
    update: updateGoal,
    delete: deleteGoal
  },
  progress: {
    dashboard: fetchDashboard
  }
};
