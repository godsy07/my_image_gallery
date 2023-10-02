import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/main-page/MainPage";
import LoginPage from './pages/login-page/LoginPage';

import { AuthProvider } from './components/auth/AuthContext';
import './App.css'
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import Dashboard from './pages/dashboard/Dashboard';

const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path='/' element={<ProtectedRoutes accessible_to={['admin']} />}>
              <Route path='dashboard' element={<Dashboard />} />
            </Route>

          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
