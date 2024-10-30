import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './layouts/Navbar.jsx'
import Sidebar from './layouts/Sidebar.jsx'
import AdminRoutes from './routes/Admin.routes.jsx';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <main className="p-4 pt-16">
          <AdminRoutes />
        </main>
      </div>
    </Router>
  )
}

export default App