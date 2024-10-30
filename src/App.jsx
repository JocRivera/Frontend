import { useState } from 'react';
import Navbar from './layouts/Navbar.jsx'
import Sidebar from './layouts/Sidebar.jsx'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <main className="pt-16 p-4">
        {/* Aquí va el contenido principal */}
      </main>
    </div>
  )
}

export default App