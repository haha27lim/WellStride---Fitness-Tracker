import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, Dumbbell, Target, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { logout } from '@/store/slices/authSlice';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
  { to: '/workouts', label: 'Workouts', icon: <Activity className="w-5 h-5" /> },
  { to: '/goals', label: 'Goals', icon: <Target className="w-5 h-5" /> },
  { to: '/profile', label: 'Profile', icon: <User className="w-5 h-5" /> }
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const initial = user?.username ? user.username.charAt(0).toUpperCase() : 'U';
  const displayName = user?.username || 'User';

  
  return (
    <aside className="h-screen w-60 bg-white dark:bg-sidebar flex flex-col justify-between border-r border-border fixed left-0 top-0 z-30">
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <span className="bg-primary text-primary-foreground rounded-full p-2"><Dumbbell className="w-6 h-6" /></span>
          <span className="text-xl font-bold">WellStride</span>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-base ${location.pathname.startsWith(link.to) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/40'}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-6 py-4 border-t border-border flex items-center gap-3">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground rounded-full w-9 h-9 flex items-center justify-center font-bold">
                  {initial}
                </div>
                <div>
                  <div className="font-semibold leading-tight">{displayName}</div>
                  <div className="text-xs text-muted-foreground">user</div>
                </div>
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
    </aside>
  );
};

export default Sidebar; 