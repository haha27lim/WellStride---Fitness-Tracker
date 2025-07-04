import React from 'react';
import Sidebar from './Sidebar';
import { Sun, Moon } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { useTheme } from './theme-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { logout } from '@/store/slices/authSlice';

const getTitle = (pathname) => {
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  if (pathname.startsWith('/workouts')) return 'Workouts';
  if (pathname.startsWith('/goals')) return 'Goals';
  if (pathname.startsWith('/profile')) return 'Profile';
  return '';
};

const Layout = ({ children }) => {
  const location = useLocation();
  const title = getTitle(location.pathname);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const initial = user?.username ? user.username.charAt(0).toUpperCase() : 'U';
  const { theme, setTheme } = useTheme();


  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-60 min-h-screen">
        <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-white dark:bg-card sticky top-0 z-20">
          <div className="text-2xl font-bold tracking-tight">{title}</div>
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-full hover:bg-muted/40"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full w-9 h-9 flex items-center justify-center font-bold">
                      {initial}
                    </div>
                    <span className="hidden md:inline">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => dispatch(logout())}>
                    <b>
                      LOGOUT
                    </b>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>
        <main className="flex-1 p-8 bg-muted/10 overflow-y-auto">
          {children ? children : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout; 