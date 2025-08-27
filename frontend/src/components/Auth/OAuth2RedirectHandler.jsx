import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { setUser, setAdmin } from "../../store/slices/authSlice";
import api from "../../services/api";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    const handleOAuth2Redirect = async () => {
      try {
        const response = await api.get('/auth/user');
        const userData = response.data;
        
        // Dispatch user data to Redux store
        dispatch(setUser(userData));

        if (userData.roles && userData.roles.includes("ROLE_ADMIN")) {
          dispatch(setAdmin(true));
        } else {
          dispatch(setAdmin(false));
        }
        
        navigate('/dashboard');
      } catch (error) {
        console.error('OAuth2 redirect error:', error);
        setError('Authentication failed. Please try again.');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    handleOAuth2Redirect();
  }, [navigate, dispatch, isAuthenticated]);

  if (loading) {
    return <div>Completing authentication...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Redirecting...</div>;
};

export default OAuth2RedirectHandler;