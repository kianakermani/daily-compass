import { Link, Outlet, useLocation } from "react-router-dom";
import { Compass } from "lucide-react";
import { Toaster } from "sonner";

import { navItems } from "../constants/navItems";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-sm">
              <Compass className="w-5 h-5 text-white" />
            </div>

            <h1 className="text-2xl font-medium text-slate-800 tracking-tight">
              Daily Compass
            </h1>
          </div>

          <nav className="flex gap-1.5 bg-white/60 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm border border-white/80">
            {navItems.map(({ path, label, icon: Icon }) => {
              const active =
                path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(path);

              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>
        </header>

        <main>
          <Outlet />
        </main>
      </div>

      <Toaster position="bottom-center" richColors />
    </div>
  );
}
