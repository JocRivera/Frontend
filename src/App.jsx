import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/user.routes.jsx';
import AdminLayout from './layouts/Admin.jsx';
import AdminRoutes from './routes/Admin.routes.jsx';
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <main className="p-4 pt-16">
          <Routes>
            <Route path="/" element={<UserRoutes />} />
            <Route path="/*" element={<AdminLayout />}>
              <Route path="*" element={<AdminRoutes />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App