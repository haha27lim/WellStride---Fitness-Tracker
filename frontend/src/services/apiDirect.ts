interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}


const getToken = (): string | null => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    return user?.token || null;
  } catch (e) {
    console.error('Error getting token:', e);
    return null;
  }
};


export const debugToken = (): void => {
  const token = getToken();
  if (!token) {
    console.log('No token found in localStorage');
    return;
  }
  
  console.log('Token:', token.substring(0, 20) + '...');
  try {

    const payload = token.split('.')[1];
    if (payload) {
      const decoded = JSON.parse(atob(payload));
      console.log('Decoded token:', decoded);
      console.log('Roles:', decoded.roles || decoded.authorities || 'None found');
      console.log('Expiration:', new Date(decoded.exp * 1000).toLocaleString());
    }
  } catch (e) {
    console.log('Not a valid JWT token or cannot decode');
  }
};


export const request = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  try {
    const token = getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    });
    
    console.log(`API Response for ${url}:`, response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(errorText || response.statusText);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text() as unknown as T;
  } catch (error) {
    console.error('API Direct error:', error);
    throw error;
  }
};


export const get = <T>(url: string, headers?: Record<string, string>): Promise<T> => 
  request<T>(url, { headers });

export const post = <T>(url: string, data: any, headers?: Record<string, string>): Promise<T> => 
  request<T>(url, { method: 'POST', body: data, headers });

export const put = <T>(url: string, data: any, headers?: Record<string, string>): Promise<T> => 
  request<T>(url, { method: 'PUT', body: data, headers });

export const del = <T>(url: string, headers?: Record<string, string>): Promise<T> => 
  request<T>(url, { method: 'DELETE', headers });

export default {
  debugToken,
  request,
  get,
  post,
  put,
  delete: del
}; 