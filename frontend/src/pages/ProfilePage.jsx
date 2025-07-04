import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const ProfilePage = () => {

    const { user } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState(user?.email || '');
    const [isEditing, setIsEditing] = useState(false);
    const [updateError, setUpdateError] = useState('');

    useEffect(() => {

        if (user) {
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setUpdateError('');
        // Basic validation
        if (!email.includes('@')) {
            setUpdateError('Please enter a valid email address.');
            return;
        }

       console.log("Update profile logic needs backend endpoint and userSlice implementation.");
       setUpdateError("Profile update functionality is not fully implemented yet.");

    };

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <Card>
                <CardHeader>
                    <CardTitle>{user.username}</CardTitle>
                    <CardDescription>Manage your account details.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="grid gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" value={user.username} disabled />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {updateError && <p className="text-red-500 text-sm">{updateError}</p>}
                            <div className="flex gap-2">
                                <Button type="submit">Save Changes</Button>
                                <Button variant="outline" onClick={() => { setIsEditing(false); setUpdateError(''); setEmail(user.email); }}>Cancel</Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-2">
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
                            <Button onClick={() => setIsEditing(true)} className="mt-4">Edit Profile</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;