import { useLocation, Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function TopNavigation() {
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-3">
      <div className="flex items-center text-sm text-gray-500">
          <Home className="h-4 w-4 mr-1" />
          

        {pathParts.map((part, index) => {
          const link = "/" + pathParts.slice(0, index + 1).join("/");
          const isLast = index === pathParts.length - 1;
          return (
            <span key={link} className="flex items-center">
              <span className="mx-2">›</span>
              {isLast ? (
                <span className="capitalize">{part}</span>
              ) : (
                <Link to={link} className="capitalize hover:underline">
                  {part}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
