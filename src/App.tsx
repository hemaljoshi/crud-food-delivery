import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import VerificationController from './Components/VerificationController';
import ProductList from './View/ProductList';
import ProtectedRoute from './Components/ProtectedRoute';
import LoginController from './Components/LoginController';
import { UserAuthContextProvider } from './Context/UserAuthContext';

function App() {
  return (
    <div className='App'>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<LoginController />} />
          <Route path='/verification' element={<VerificationController />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
