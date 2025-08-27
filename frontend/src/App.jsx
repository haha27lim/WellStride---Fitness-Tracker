import { Provider } from 'react-redux';
import { store } from '@/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import Layout from '@/components/Layout';


import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

import DashboardPage from '@/pages/DashboardPage';
import WorkoutsPage from '@/pages/WorkoutsPage';
import GoalsPage from '@/pages/GoalsPage';
import ProfilePage from '@/pages/ProfilePage';
import HomePage from '@/pages/HomePage';
import PrivateRoute from '@/components/PrivateRoute';
import NotFound from './pages/NotFound';
import OAuth2RedirectHandler from '@/components/Auth/OAuth2RedirectHandler';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <div className="container mx-auto p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/workouts" element={<WorkoutsPage />} />
                  <Route path="/goals" element={<GoalsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Route>

              <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

              {/* Add 404 Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;