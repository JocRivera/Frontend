import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './routes/Public.routes.jsx';
import AdminLayout from './layouts/Admin.jsx';
import AdminRoutes from './routes/Admin.routes.jsx';
import HomeLayout from './layouts/Home.jsx';
import ClientLayout from './client/layouts/Client.jsx';
import ClientRoutes from './routes/Client.routes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoutes from './routes/Protected.routes.jsx';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<HomeLayout />}>
            <Route path="*" element={<PublicRoutes />} />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="*" element={<AdminRoutes />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={['user']} />}>
            <Route path="/client" element={<ClientLayout />}>
              <Route path="*" element={<ClientRoutes />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App