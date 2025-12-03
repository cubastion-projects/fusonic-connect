import { useState } from 'react';
import { Search, FileText, Download, ExternalLink, Folder, Clock, Eye } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'All Documents', labelJp: 'すべてのドキュメント', icon: FileText },
  { id: 'hr', label: 'HR Documents', labelJp: '人事ドキュメント', icon: Folder },
  { id: 'it', label: 'IT Resources', labelJp: 'ITリソース', icon: Folder },
  { id: 'policies', label: 'Policies', labelJp: 'ポリシー', icon: Folder },
  { id: 'guides', label: 'Guides & Tutorials', labelJp: 'ガイド・チュートリアル', icon: Folder },
];

const documents = [
  {
    id: 1,
    title: 'How to Install Microsoft Teams',
    titleJp: 'Microsoft Teamsのインストール方法',
    description: 'Step-by-step guide to install and configure Microsoft Teams on your device.',
    descriptionJp: 'デバイスにMicrosoft Teamsをインストールして設定するためのステップバイステップガイド。',
    category: 'it',
    type: 'PDF',
    size: '2.4 MB',
    updated: 'Dec 5, 2024',
    updatedJp: '2024年12月5日',
    views: 1234,
    downloads: 456,
  },
  {
    id: 2,
    title: 'Remote Work Policy 2024',
    titleJp: 'リモートワークポリシー 2024',
    description: 'Complete guidelines for remote and hybrid working arrangements.',
    descriptionJp: 'リモートおよびハイブリッド勤務の完全なガイドライン。',
    category: 'hr',
    type: 'PDF',
    size: '1.8 MB',
    updated: 'Nov 28, 2024',
    updatedJp: '2024年11月28日',
    views: 2890,
    downloads: 1023,
  },
  {
    id: 3,
    title: 'Employee Benefits Guide',
    titleJp: '従業員福利厚生ガイド',
    description: 'Comprehensive overview of all employee benefits and how to access them.',
    descriptionJp: 'すべての従業員福利厚生とアクセス方法の包括的な概要。',
    category: 'hr',
    type: 'PDF',
    size: '4.2 MB',
    updated: 'Dec 1, 2024',
    updatedJp: '2024年12月1日',
    views: 3456,
    downloads: 1567,
  },
  {
    id: 4,
    title: 'VPN Setup Instructions',
    titleJp: 'VPN設定手順',
    description: 'How to configure VPN access for secure remote connection.',
    descriptionJp: 'セキュアなリモート接続のためのVPNアクセスの設定方法。',
    category: 'it',
    type: 'PDF',
    size: '1.2 MB',
    updated: 'Nov 20, 2024',
    updatedJp: '2024年11月20日',
    views: 890,
    downloads: 345,
  },
  {
    id: 5,
    title: 'Code of Conduct',
    titleJp: '行動規範',
    description: 'Company-wide standards for professional behavior and ethics.',
    descriptionJp: '会社全体のプロフェッショナルな行動と倫理の基準。',
    category: 'policies',
    type: 'PDF',
    size: '3.1 MB',
    updated: 'Oct 15, 2024',
    updatedJp: '2024年10月15日',
    views: 4567,
    downloads: 2134,
  },
  {
    id: 6,
    title: 'Expense Report Guide',
    titleJp: '経費報告ガイド',
    description: 'How to submit and process expense reports through the system.',
    descriptionJp: 'システムを通じて経費報告を提出および処理する方法。',
    category: 'guides',
    type: 'PDF',
    size: '0.8 MB',
    updated: 'Nov 10, 2024',
    updatedJp: '2024年11月10日',
    views: 1678,
    downloads: 789,
  },
];

const DocumentsPage = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = documents.filter((doc) => {
    const categoryMatch = activeCategory === 'all' || doc.category === activeCategory;
    const searchMatch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.titleJp.includes(searchQuery);
    return categoryMatch && searchMatch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-0 right-0 h-1 gradient-red" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-up">
            {t('docs.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-100">
            {language === 'jp' 
              ? '人事、IT、ポリシーなどの重要なドキュメントを検索'
              : 'Find important documents for HR, IT, policies, and more'
            }
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={language === 'jp' ? 'ドキュメントを検索...' : 'Search documents...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Categories */}
              <div className="glass-card p-4">
                <h3 className="font-semibold text-foreground mb-4">{t('docs.categories')}</h3>
                <nav className="space-y-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const count = cat.id === 'all' 
                      ? documents.length 
                      : documents.filter(d => d.category === cat.id).length;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                          activeCategory === cat.id
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{language === 'jp' ? cat.labelJp : cat.label}</span>
                        </div>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs",
                          activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-accent"
                        )}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Documents Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDocuments.map((doc, index) => (
                  <div
                    key={doc.id}
                    className="glass-card p-5 hover-lift group animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {language === 'jp' ? doc.titleJp : doc.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {language === 'jp' ? doc.descriptionJp : doc.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="px-2 py-0.5 rounded bg-accent">{doc.type}</span>
                          <span>{doc.size}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {language === 'jp' ? doc.updatedJp : doc.updated}
                          </div>
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              {doc.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-3.5 h-3.5" />
                              {doc.downloads}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button variant="fuso" size="sm">
                              <Download className="w-4 h-4" />
                              <span className="hidden sm:inline">
                                {language === 'jp' ? 'ダウンロード' : 'Download'}
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-20 glass-card">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'jp' ? '該当するドキュメントが見つかりません' : 'No documents found matching your criteria'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DocumentsPage;
