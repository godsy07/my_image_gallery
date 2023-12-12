import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Settings from './pages/settings/Settings';
import MainPage from "./pages/main-page/MainPage";
import Dashboard from './pages/dashboard/Dashboard';
import LoginPage from './pages/login-page/LoginPage';
import { AuthProvider } from './components/auth/AuthContext';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import PendingImages from './pages/pending-images/PendingImages';
import ToastContainerDiv from './components/wrapper/ToastContainerDiv';

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <ToastContainerDiv />
      <BrowserRouter future={{ v7_startTransition: true }}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>

              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path='/' element={<ProtectedRoutes accessible_to={['admin','user']} />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='pending-images' element={<PendingImages />} />
                <Route path='settings' element={<Settings />} />
              </Route>

            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
