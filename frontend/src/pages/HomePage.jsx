import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAppDispatch } from '@/hooks/redux';
import { logout } from '@/store/slices/authSlice';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    useEffect(() => {

        dispatch(logout());
    }, [dispatch]);

    const handleSignUp = () => {
        navigate('/register');
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    const features = [
        {
            title: "Workout Tracking",
            description: "Log and track your workouts with detailed exercises, sets, and reps",
            icon: "💪"
        },
        {
            title: "Goal Setting",
            description: "Set and monitor your fitness goals with progress tracking",
            icon: "🎯"
        },
        {
            title: "Progress Analytics",
            description: "Visualize your fitness journey with detailed charts and insights",
            icon: "📊"
        },
        {
            title: "Community Support",
            description: "Connect with like-minded fitness enthusiasts",
            icon: "👥"
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Transform Your Fitness Journey
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Track your workouts, set goals, and achieve your fitness dreams with our comprehensive fitness tracking platform.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button size="lg" onClick={handleSignUp}>
                            Get Started Free
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            onClick={handleSignIn}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-secondary/10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Succeed</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-primary/5">
                            <CardContent className="pt-6">
                                <p className="italic mb-4">"This app has completely transformed how I track my fitness progress. The interface is intuitive and the analytics are incredibly helpful."</p>
                                <div className="font-semibold">Sarah M.</div>
                                <div className="text-sm text-muted-foreground">Fitness Enthusiast</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary/5">
                            <CardContent className="pt-6">
                                <p className="italic mb-4">"The goal tracking feature keeps me motivated and accountable. I've never been more consistent with my workouts!"</p>
                                <div className="font-semibold">Mike R.</div>
                                <div className="text-sm text-muted-foreground">Personal Trainer</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary/5">
                            <CardContent className="pt-6">
                                <p className="italic mb-4">"Finally, a fitness app that combines all the features I need in one place. The community support is amazing!"</p>
                                <div className="font-semibold">Lisa K.</div>
                                <div className="text-sm text-muted-foreground">Marathon Runner</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
                    <p className="text-xl mb-8 opacity-90">Join thousands of users who have already transformed their lives</p>
                    <Button
                        size="lg"
                        variant="secondary"
                        onClick={handleSignUp}
                        className="text-primary hover:text-primary"
                    >
                        Start Your Free Account
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;