import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Activity, User, Sun, Search, ChevronDown, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const navLinks = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    items: [
      { label: 'Overview', path: '/dashboard' },
      { label: 'Algorithm Performance', path: '/dashboard/performance' },
      { label: 'Algorithm Comparison', path: '/dashboard/comparison' },
      { label: 'Recent Results', path: '/dashboard/recent' },
    ],
  },
  {
    label: 'Datasets',
    path: '/datasets',
    items: [
      { label: 'All Datasets', path: '/datasets' },
      { label: 'Dataset Search', path: '/datasets/search' },
      { label: 'Dataset Metadata', path: '/datasets/metadata' },
      { label: 'Upload Dataset', path: '/upload' },
    ],
  },
  {
    label: 'Compare',
    path: '/compare',
    items: [
      { label: 'Algorithm Comparison', path: '/compare' },
      { label: 'Algorithm Selection', path: '/compare/select' },
      { label: 'Metric Explorer', path: '/compare/metrics' },
      { label: 'PR/ROC Overlay', path: '/compare/roc' },
      // { label: 'Performance Comparison', path: '/compare/performance' },
      { label: 'Top Motif Enrichment', path: '/compare/enrichment' },
    ],
  },
  {
    label: 'Explorer',
    path: '/explorer',
    items: [
      { label: 'Network Explorer', path: '/explorer' },
      { label: 'Gene Search', path: '/explorer/search' },
      { label: 'Network Visualization', path: '/explorer/visualization' },
      { label: 'Gene Details', path: '/explorer/details' },
    ],
  },
  {
    label: 'Upload',
    path: '/upload',
    items: [
      { label: 'Upload Overview', path: '/upload' },
      { label: 'Upload File', path: '/upload/file' },
      { label: 'Job Configuration', path: '/upload/config' },
      { label: 'File Formats', path: '/upload/formats' },
      { label: 'Recent Jobs', path: '/upload/recent' },
      { label: 'Validation Reports', path: '/upload/report' },
    ],
  },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // -----------------------------------------------------
  // Handle dashboard section navigation
  // -----------------------------------------------------
  const handleNavClick = (path: string) => {
    if (path.startsWith('/dashboard') && location.pathname === '/dashboard') {
      const id = path.replace('/dashboard', '') || '/';
      const target = id === '/' ? 'overview' : id.substring(1);

      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    } else if (path.startsWith('/datasets') && location.pathname === '/datasets') {
      const id = path.replace('/datasets', '') || '/';
      const target = id === '/' ? 'datasets' : id.substring(1);

      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    } else if (path.startsWith('/compare') && location.pathname === '/compare') {
      const id = path.replace('/compare', '') || '/';
      const target = id === '/' ? 'compare' : id.substring(1);

      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    } else if (path.startsWith('/explorer') && location.pathname === '/explorer') {
      const id = path.replace('/explorer', '') || '/';
      const target = id === '/' ? 'explorer' : id.substring(1);

      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    } else if (path.startsWith('/upload') && location.pathname === '/upload') {
      const id = path.replace('/upload', '') || '/';
      const target = id === '/' ? 'upload' : id.substring(1);

      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Normal navigation for other paths
    navigate(path);
  };

  // -----------------------------------------------------

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="max-w-full w-full flex items-center justify-between h-16 px-4">

        {/* Left: Logo + Mobile Hamburger */}
        <div className="flex items-center gap-4">

          <button
            className="p-2 rounded-md hover:bg-accent lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              {/* <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg> */}
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-none">WebGenie</span>
              <span className="text-xs text-muted-foreground leading-none">
                Benchmarking
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 flex-1 ml-8">
          {navLinks.map((link) => (
            <DropdownMenu
              key={link.path}
              open={openDropdown === link.label}
              onOpenChange={(open) => setOpenDropdown(open ? link.label : null)}
            >
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                    isActive(link.path)
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-48">
                {link.items.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.path);
                      }}
                      className={`w-full text-left px-2 py-1 ${
                        location.pathname === item.path ? 'bg-accent' : ''
                      }`}
                    >
                      {item.label}
                    </button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search datasets, algorithms..."
              className="pl-10 w-64 px-3 py-1.5 text-sm bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <Sun className="absolute w-5 h-5 transition-all duration-300 dark:opacity-0 dark:scale-75 opacity-100 scale-100" />
              <Moon className="absolute w-5 h-5 transition-all duration-300 opacity-0 scale-75 dark:opacity-100 dark:scale-100" />
            </div>
          </button>

          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bg-card/95 backdrop-blur border-t z-40 px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <div key={link.label}>
              <div className="font-semibold text-sm mb-2">{link.label}</div>
              <div className="flex flex-col space-y-1 pl-2">
                {link.items.map((item) => (
                  <button
                    key={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      handleNavClick(item.path);
                    }}
                    className={`text-sm text-left py-1 ${
                      location.pathname === item.path
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}
    </nav>
  );
}
