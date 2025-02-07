import axios from 'axios';

const createClientApiClient = (contentType = 'application/json') => {
  // Get all cookies as a string
  const cookies = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .join('; ');

  return axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
      'Content-Type': contentType,
      Cookie: cookies, // Explicitly set cookies
    },
  });
};

const clientApi = {
  get: async (url, params) => {
    const apiClient = createClientApiClient();
    const response = await apiClient.get(url, {
      params,
      headers: {
        'X-Requested-With': 'XMLHttpRequest', // Help identify AJAX requests
      },
    });
    return response.data;
  },

  post: async (url, data, contentType) => {
    const apiClient = createClientApiClient(contentType);
    const response = await apiClient.post(url, data, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    return response.data;
  },

  put: async (url, data, contentType) => {
    const apiClient = createClientApiClient(contentType || 'application/json');
    const response = await apiClient.put(url, data, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    return response.data;
  },

  patch: async (url, data, contentType) => {
    const apiClient = createClientApiClient(contentType || 'application/json');
    const response = await apiClient.patch(url, data, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    return response.data;
  },

  delete: async (url) => {
    const apiClient = createClientApiClient();
    const response = await apiClient.delete(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    return response.data;
  },
};

export default clientApi;
