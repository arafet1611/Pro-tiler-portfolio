import { 
  Home, 
  User, 
  Bell, 
  LogOut, 
  Edit3,
  Plus
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAdminDashboard = location.pathname === '/admin/dashboard';

  
  // Determine active states based on current path
  const isAnnoncesActive = location.pathname === '/admin/dashboard' || 
                          location.pathname.startsWith('/admin/dashboard/project-update/');
  const isAnnoncerActive = location.pathname === '/admin/dashboard/project-form';
  
  const sidebarItems = [
    { 
      icon: Home, 
      label: 'Mes annonces', 
      active: isAnnoncesActive,
      onClick: () => navigate('/admin/dashboard')
    },
    ...(isAdminDashboard ? [{
      icon: Plus, 
      label: 'Annoncer', 
      active: isAnnoncerActive,
      isAddButton: true,
      onClick: () => navigate('/admin/dashboard/project-form')
    }] : []),
    { 
      icon: Bell, 
      label: 'Mes alertes', 
      active: false,
      onClick: () => {} // Add appropriate navigation
    },
  ];

  // Bottom navigation items for mobile
  const mobileSidebarItems = [
    { 
      icon: Home, 
      label: 'Mes annonces', 
      active: isAnnoncesActive,
      onClick: () => navigate('/admin/dashboard')
    },
    ...(isAdminDashboard ? [{
      icon: Plus, 
      label: 'Annoncer', 
      active: isAnnoncerActive,
      isAddButton: true,
      onClick: () => navigate('/admin/dashboard/project-form')
    }] : []),
    { 
      icon: Bell, 
      label: 'Mes alertes', 
      active: false,
      onClick: () => {navigate('/admin/alerts')} 
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden sm:flex w-64 bg-white shadow-sm min-h-screen flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b flex-shrink-0">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 flex items-center justify-center">
                <Edit3 className="h-3 w-3 mr-1" />
                Admin@exemple.com
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-sm transition-colors ${
                    item.active
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 flex-shrink-0">
          <button
            onClick={() => {/* Add logout logic here */}}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {mobileSidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative ${
                item.isAddButton
                  ? 'bg-red-500 text-white rounded-full w-12 h-12 shadow-lg'
                  : item.active
                    ? 'text-red-500'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.isAddButton ? (
                <>
                  <item.icon className="h-6 w-6" />
                </>
              ) : (
                <>
                  <item.icon className={`h-5 w-5 mb-1 ${item.active ? 'text-red-500' : ''}`} />
                  <span className={`text-xs font-medium ${item.active ? 'text-red-500' : ''}`}>
                    {item.label}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;