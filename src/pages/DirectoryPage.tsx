import { useState } from 'react';
import { Search, MapPin, Mail, Phone, UserPlus, Filter, Grid, List } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const departments = ['All', 'Engineering', 'HR', 'Marketing', 'Sales', 'Finance', 'IT'];
const departmentsJp = ['すべて', 'エンジニアリング', '人事', 'マーケティング', '営業', '財務', 'IT'];

const employees = [
  {
    id: 1,
    name: 'Takeshi Yamamoto',
    nameJp: '山本 武',
    role: 'Engineering Director',
    roleJp: 'エンジニアリングディレクター',
    department: 'Engineering',
    departmentJp: 'エンジニアリング',
    location: 'Tokyo HQ',
    locationJp: '東京本社',
    email: 'takeshi.y@fuso.com',
    phone: '+81 3-1234-5678',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format',
    status: 'online',
  },
  {
    id: 2,
    name: 'Yuki Tanaka',
    nameJp: '田中 由紀',
    role: 'HR Manager',
    roleJp: '人事マネージャー',
    department: 'HR',
    departmentJp: '人事',
    location: 'Osaka Office',
    locationJp: '大阪オフィス',
    email: 'yuki.t@fuso.com',
    phone: '+81 6-1234-5678',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format',
    status: 'online',
  },
  {
    id: 3,
    name: 'Kenji Suzuki',
    nameJp: '鈴木 健二',
    role: 'Senior Developer',
    roleJp: 'シニアデベロッパー',
    department: 'Engineering',
    departmentJp: 'エンジニアリング',
    location: 'Tokyo HQ',
    locationJp: '東京本社',
    email: 'kenji.s@fuso.com',
    phone: '+81 3-2345-6789',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format',
    status: 'away',
  },
  {
    id: 4,
    name: 'Sakura Watanabe',
    nameJp: '渡辺 さくら',
    role: 'Marketing Lead',
    roleJp: 'マーケティングリード',
    department: 'Marketing',
    departmentJp: 'マーケティング',
    location: 'Tokyo HQ',
    locationJp: '東京本社',
    email: 'sakura.w@fuso.com',
    phone: '+81 3-3456-7890',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format',
    status: 'online',
  },
  {
    id: 5,
    name: 'Hiroshi Nakamura',
    nameJp: '中村 浩',
    role: 'IT Specialist',
    roleJp: 'ITスペシャリスト',
    department: 'IT',
    departmentJp: 'IT',
    location: 'Nagoya Office',
    locationJp: '名古屋オフィス',
    email: 'hiroshi.n@fuso.com',
    phone: '+81 52-1234-5678',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format',
    status: 'offline',
  },
  {
    id: 6,
    name: 'Mei Kobayashi',
    nameJp: '小林 芽衣',
    role: 'Sales Manager',
    roleJp: '営業マネージャー',
    department: 'Sales',
    departmentJp: '営業',
    location: 'Osaka Office',
    locationJp: '大阪オフィス',
    email: 'mei.k@fuso.com',
    phone: '+81 6-2345-6789',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format',
    status: 'online',
  },
];

const statusColors = {
  online: 'bg-emerald-500',
  away: 'bg-amber-500',
  offline: 'bg-muted-foreground',
};

const DirectoryPage = () => {
  const { t, language } = useLanguage();
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const displayDepartments = language === 'jp' ? departmentsJp : departments;

  const filteredEmployees = employees.filter((employee) => {
    const departmentMatch = activeDepartment === 'All' || 
      employee.department === activeDepartment || 
      employee.departmentJp === activeDepartment;
    const searchMatch = searchQuery === '' || 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.nameJp.includes(searchQuery) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    return departmentMatch && searchMatch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-0 right-0 h-1 gradient-red" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-up">
            {t('directory.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-100">
            {language === 'jp' 
              ? '同僚を見つけて、つながりましょう'
              : 'Find and connect with your colleagues across the organization'
            }
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-40 glass-panel py-4 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('directory.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Departments */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 flex-1">
              {displayDepartments.map((dept, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDepartment(departments[index])}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                    activeDepartment === departments[index]
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === 'grid' ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === 'list' ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Grid/List */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee, index) => (
                <div
                  key={employee.id}
                  className="glass-card p-6 hover-lift group animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={employee.image}
                        alt={language === 'jp' ? employee.nameJp : employee.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <span className={cn(
                        "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
                        statusColors[employee.status as keyof typeof statusColors]
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {language === 'jp' ? employee.nameJp : employee.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {language === 'jp' ? employee.roleJp : employee.role}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-accent text-foreground">
                        {language === 'jp' ? employee.departmentJp : employee.department}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{language === 'jp' ? employee.locationJp : employee.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="w-4 h-4" />
                      <span className="hidden sm:inline">{language === 'jp' ? 'メール' : 'Email'}</span>
                    </Button>
                    <Button variant="fuso" size="sm" className="flex-1">
                      <UserPlus className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('action.connect')}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEmployees.map((employee, index) => (
                <div
                  key={employee.id}
                  className="glass-card p-4 hover-lift group animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={employee.image}
                        alt={language === 'jp' ? employee.nameJp : employee.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className={cn(
                        "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card",
                        statusColors[employee.status as keyof typeof statusColors]
                      )} />
                    </div>
                    <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {language === 'jp' ? employee.nameJp : employee.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {language === 'jp' ? employee.roleJp : employee.role}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <span className="text-sm text-muted-foreground">{t('directory.department')}</span>
                        <p className="text-sm text-foreground">{language === 'jp' ? employee.departmentJp : employee.department}</p>
                      </div>
                      <div className="hidden sm:block">
                        <span className="text-sm text-muted-foreground">{t('directory.location')}</span>
                        <p className="text-sm text-foreground">{language === 'jp' ? employee.locationJp : employee.location}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 justify-end">
                        <Button variant="ghost" size="icon">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="fuso" size="sm">
                          {t('action.connect')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredEmployees.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                {language === 'jp' ? '該当する社員が見つかりません' : 'No employees found matching your criteria'}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DirectoryPage;
