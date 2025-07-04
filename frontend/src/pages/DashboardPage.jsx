import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchProgressDashboard } from '@/store/slices/progressSlice';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const { dashboardData, status, error } = useAppSelector((state) => state.progress);
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        // Fetch dashboard data when the component mounts or when status is idle
        dispatch(fetchProgressDashboard());
    }, [dispatch]); // Remove status dependency to allow manual refreshes

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            
            {status === 'loading' && <p>Loading dashboard data...</p>}
            {error && <p className="text-red-500">Error loading data: {error}</p>}
            {status === 'succeeded' && dashboardData && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Workouts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{dashboardData.totalWorkouts}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Duration</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{dashboardData.totalDurationMinutes} min</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Goals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{dashboardData.activeGoals}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Goals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{dashboardData.completedGoals}</p>
                        </CardContent>
                    </Card>
                    {/* Add more cards for workout types etc. later */}
                </div>
            )}
             {status === 'succeeded' && !dashboardData && <p>No dashboard data available.</p>}
        </div>
    );
};

export default DashboardPage;