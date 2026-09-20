import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '../types/api.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.srikara-dialysis.internal';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Injects auth token if patient session is active
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('srikara_patient_token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Normalizes errors into clean, patient-safe ApiError
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string; code?: string; errors?: Record<string, string[]> }>) => {
    const status = error.response?.status;
    const responseData = error.response?.data;

    let patientMessage = 'We could not connect to the Srikara network right now. Please check your connection and try again.';

    if (status === 400) {
      patientMessage = responseData?.message || 'Please check the information you entered and try again.';
    } else if (status === 401) {
      patientMessage = 'Your session has expired. Please sign in with your mobile number.';
      if (typeof window !== 'undefined') {
        localStorage.removeItem('srikara_patient_token');
      }
    } else if (status === 404) {
      patientMessage = responseData?.message || 'The requested information could not be found.';
    } else if (status === 409) {
      patientMessage = responseData?.message || 'This dialysis slot is no longer available. Please choose another time.';
    } else if (status && status >= 500) {
      patientMessage = 'The hospital network is temporarily undergoing maintenance. Please try again shortly or contact support.';
    }

    const normalizedError: ApiError = {
      message: patientMessage,
      statusCode: status,
      code: responseData?.code || error.code,
      errors: responseData?.errors,
    };

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
