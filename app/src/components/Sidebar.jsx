import React from 'react';
import { 
  Home, 
  User, 
  Bell, 
  CreditCard, 
  Info, 
  Shield, 
  LogOut, 
  Edit3 
} from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Mes annonces', active: true },
  { icon: Bell, label: 'Mes alertes', active: false },
  { icon: CreditCard, label: 'Mes transactions', active: false },
  { icon: Info, label: 'Mes informations', active: false },
  { icon: Shield, label: 'Sécurité', active: false },
];

const Sidebar = () => (
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
              Arafetalaya@Gmail.Com
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center px-4 py-3 rounded-lg text-sm transition-colors ${
                  item.active
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 flex-shrink-0">
        <a
          href="#"
          className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Se déconnecter</span>
        </a>
      </div>
    </div>

    {/* Mobile Topbar */}
    <div className="sm:hidden absolute button-0 left-0 right-0 z-50 bg-transparent bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Profile Icon */}
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <User className="h-3 w-3 text-red-500" />
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-4">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`p-2 rounded-lg transition-colors ${
                item.active
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </a>
          ))}
          
          {/* Logout Icon */}
          <a
            href="#"
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Se déconnecter"
          >
            <LogOut className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </>
);

export default Sidebar;