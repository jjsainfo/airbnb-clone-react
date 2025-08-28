import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import HomePage  from '../pages/HomePage';
import PropertyDetailsPage from '../pages/PropertyDetailsPage';

import NotFoundPage from '../pages/NotFounPage';
//import NoteSaver from './NoteSaver';
import { Suspense,lazy } from 'react';
import LoadingSpinner from '../shared/ui/LoadingSpinner';
import ProfilePage from '../pages/ProfilePage';
import PrivateRoute from '../shared/ui/PrivateRoute';
import { AuthProvider } from '../shared/hooks/AuthContext';
import SilentCallback from '../shared/ui/SilentCallback';
import AuthCallback from '../shared/ui/AuthCallback';
function App() {

  const HomePage = lazy(() => import('../pages/HomePage'));
  const PropertyDetailsPage = lazy(() => import('../pages/PropertyDetailsPage'));
  const NotFoundPage = lazy(() => import('../pages/NotFounPage'));
  const ProfilePage = lazy(() => import('../pages/ProfilePage'));
  const ChatPage = lazy(() => import('../pages/ChatPage'))
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/callback" element={<AuthCallback />} />
          <Route path="/silent-callback" element={<SilentCallback />} />

          <Route path="/chat" element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
            } />


          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFoundPage />} /> 


        </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
    
    )
}

export default App
