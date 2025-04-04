import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './routes/Public.routes.jsx';
import AdminLayout from './layouts/Admin.jsx';
import AdminRoutes from './routes/Admin.routes.jsx';
import HomeLayout from './layouts/Home.jsx';
import ClientLayout from './client/layouts/Client.jsx';
import ClientRoutes from './routes/Client.routes.jsx';
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <main className="p-4 pt-16">
          <Routes >
            <Route path="/" element={<HomeLayout />} >
              <Route index element={<PublicRoutes />} />
            </Route>
            <Route path="/*" element={<AdminLayout />}>
              <Route path="*" element={<AdminRoutes />} />
            </Route>
            <Route path="/client/*" element={<ClientLayout />}>
              <Route path="*" element={<ClientRoutes />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App