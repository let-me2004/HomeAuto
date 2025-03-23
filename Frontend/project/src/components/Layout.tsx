import React from 'react';
import { Sun, Moon, Home, Shield, Sliders, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <aside 
          className={`
            ${isSidebarOpen ? 'w-64' : 'w-20'} 
            transition-all duration-300 
            bg-white dark:bg-gray-800 
            border-r border-gray-200 dark:border-gray-700
            fixed md:relative
            h-full
            z-30
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              <h1 className={`text-xl font-bold text-blue-600 ${!isSidebarOpen && 'hidden'}`}>SmartHome</h1>
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Menu size={20} />
              </button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <NavItem icon={<Home size={20} />} label="Dashboard" isOpen={isSidebarOpen} isActive={true} />
                <NavItem icon={<Shield size={20} />} label="Security" isOpen={isSidebarOpen} />
                <NavItem icon={<Sliders size={20} />} label="Automation" isOpen={isSidebarOpen} />
                <NavItem icon={<Settings size={20} />} label="Settings" isOpen={isSidebarOpen} />
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto relative">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
            <div className="flex items-center justify-between px-4 md:px-6 py-4">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
                >
                  <Menu size={20} />
                </button>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white ml-2">Dashboard</h2>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  isActive?: boolean;
}

function NavItem({ icon, label, isOpen, isActive }: NavItemProps) {
  return (
    <li>
      <a
        href="#"
        className={`
          flex items-center p-2 rounded-lg
          transition-colors duration-200
          ${isActive 
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }
        `}
      >
        {icon}
        {isOpen && <span className="ml-3">{label}</span>}
      </a>
    </li>
  );
}