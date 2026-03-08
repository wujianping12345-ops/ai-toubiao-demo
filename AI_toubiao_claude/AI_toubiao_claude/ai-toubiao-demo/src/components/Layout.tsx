import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  FileText,
  Settings,
  FileCheck,
  BarChart3,
  Zap,
  Bell,
  User,
  Compass,
  ChevronDown,
  Crown,
} from 'lucide-react';
import { useMembership, TIER_LABELS } from '../context/MembershipContext';

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: '首页' },
  { path: '/info-collect', icon: Search, label: '信息收集' },
  { path: '/opportunity-find', icon: Compass, label: '商机寻找' },
  { path: '/pre-layout', icon: Settings, label: '前置布局' },
  { path: '/plan-custom', icon: FileText, label: '投标文件生成' },
  { path: '/doc-generate', icon: FileCheck, label: '招标文件生成' },
  { path: '/review', icon: BarChart3, label: '投标项目复盘' },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { tier, setTier } = useMembership();
  const [membershipOpen, setMembershipOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMembershipOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                AI投标黑马
              </span>
            </div>

            {/* 导航菜单 - 桌面端 */}
            <nav className="hidden md:flex items-center gap-1 mx-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-transparent ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-primary-100 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* 右侧：通知 + 用户与会员等级 + 切换 */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all">
                <Bell className="w-5 h-5" />
              </button>
              <div className="h-8 w-px bg-gray-200 mx-1"></div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-transparent">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-gray-700 leading-tight">Admin</div>
                    <div className={`text-xs font-medium leading-tight mt-0.5 ${tier === 'free' ? 'text-gray-500' : tier === 'silver' ? 'text-slate-600' : tier === 'gold' ? 'text-amber-700' : 'text-indigo-600'}`}>
                      {TIER_LABELS[tier]}
                    </div>
                  </div>
                </div>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setMembershipOpen((v) => !v)}
                    className="flex items-center gap-1 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    title="切换会员等级"
                  >
                    <Crown className="w-4 h-4" />
                    <ChevronDown className={`w-4 h-4 transition-transform ${membershipOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {membershipOpen && (
                    <div className="absolute right-0 top-full mt-1 py-1 w-56 bg-white rounded-xl border border-gray-200 shadow-lg z-50">
                      <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">切换会员等级（演示）</div>
                      {(['free', 'silver', 'gold', 'diamond'] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => { setTier(t); setMembershipOpen(false); }}
                          className={`w-full text-left px-3 py-2.5 text-sm font-medium flex items-center gap-2 ${tier === t ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                          {tier === t && <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />}
                          <span>{TIER_LABELS[t]}</span>
                          {t === 'diamond' && <span className="text-xs text-indigo-500">(含短信推送)</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 - 类似网站的居中布局，改为全宽以支持着陆页风格 */}
      <main className="flex-1 w-full">
        <div className="animate-fade-in-up">
           {children}
        </div>
      </main>

      {/* 网站式页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                帮助中心
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                隐私政策
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                服务条款
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center md:text-left text-sm text-gray-400">
                &copy; 2026 AI投标黑马智能系统. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}