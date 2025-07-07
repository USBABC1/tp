import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../lib/utils";
import { FileText, Users, Calendar, Settings } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: createPageUrl("Dashboard"), icon: FileText },
    { name: "Nova Ficha", href: createPageUrl("NovaFicha"), icon: Users },
    { name: "Consultas", href: createPageUrl("Consultas"), icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600">
      <nav className="glass-card border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to={createPageUrl("Dashboard")} className="flex items-center space-x-2">
                <img src="/src/assets/LOGOTIOPAULO.png" alt="Tio Paulo" className="h-8 w-8" />
                <span className="text-white font-bold text-xl">Tio Paulo</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}