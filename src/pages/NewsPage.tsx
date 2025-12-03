import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Download, Filter, Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = ['All', 'Company News', 'HR Updates', 'IT', 'Events', 'Achievements'];
const categoriesJp = ['すべて', '会社ニュース', '人事更新', 'IT', 'イベント', '達成'];

const newsArticles = [
  {
    id: 1,
    title: 'Q4 Company-Wide Town Hall Highlights',
    titleJp: '第4四半期全社タウンホールのハイライト',
    excerpt: 'Key takeaways from our latest all-hands meeting including 2024 achievements and 2025 roadmap. CEO shares vision for the upcoming year with exciting new initiatives.',
    excerptJp: '2024年の成果と2025年のロードマップを含む最新の全社ミーティングの主なポイント。CEOが来年のビジョンと新しいイニシアチブを発表。',
    content: 'Full article content here...',
    category: 'Company News',
    categoryJp: '会社ニュース',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format',
    author: 'Communications Team',
    authorJp: 'コミュニケーションチーム',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format',
    date: 'Dec 10, 2024',
    dateJp: '2024年12月10日',
    readTime: '5 min read',
    readTimeJp: '5分で読める',
    likes: 342,
    comments: 56,
    hasPdf: true,
  },
  {
    id: 2,
    title: 'New Remote Work Policy Update',
    titleJp: '新しいリモートワークポリシーの更新',
    excerpt: 'Flexible working arrangements expanded for all departments starting January 2024. Learn about the new guidelines and how to apply.',
    excerptJp: '2024年1月からすべての部門でフレキシブルな勤務形態が拡大されます。新しいガイドラインと申請方法について。',
    category: 'HR Updates',
    categoryJp: '人事更新',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format',
    author: 'HR Department',
    authorJp: '人事部',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format',
    date: 'Dec 8, 2024',
    dateJp: '2024年12月8日',
    readTime: '3 min read',
    readTimeJp: '3分で読める',
    likes: 189,
    comments: 34,
    hasPdf: true,
  },
  {
    id: 3,
    title: 'Engineering Team Wins Innovation Award',
    titleJp: 'エンジニアリングチームがイノベーション賞を受賞',
    excerpt: 'Our R&D team recognized for breakthrough development in sustainable technology. This marks our third consecutive year of innovation excellence.',
    excerptJp: '持続可能な技術における画期的な開発で研究開発チームが表彰されました。これで3年連続のイノベーション受賞。',
    category: 'Achievements',
    categoryJp: '達成',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format',
    author: 'Corporate PR',
    authorJp: '広報部',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format',
    date: 'Dec 5, 2024',
    dateJp: '2024年12月5日',
    readTime: '4 min read',
    readTimeJp: '4分で読める',
    likes: 521,
    comments: 89,
    hasPdf: false,
  },
  {
    id: 4,
    title: 'IT Security Best Practices Update',
    titleJp: 'ITセキュリティベストプラクティスの更新',
    excerpt: 'New security protocols and password policies effective immediately. Complete training required by all employees.',
    excerptJp: '新しいセキュリティプロトコルとパスワードポリシーが即時発効。全従業員にトレーニング完了が必要。',
    category: 'IT',
    categoryJp: 'IT',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format',
    author: 'IT Security',
    authorJp: 'ITセキュリティ',
    authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format',
    date: 'Dec 3, 2024',
    dateJp: '2024年12月3日',
    readTime: '6 min read',
    readTimeJp: '6分で読める',
    likes: 145,
    comments: 23,
    hasPdf: true,
  },
];

const NewsPage = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const displayCategories = language === 'jp' ? categoriesJp : categories;

  const filteredArticles = newsArticles.filter((article) => {
    const categoryMatch = activeCategory === 'All' || 
      article.category === activeCategory || 
      article.categoryJp === activeCategory;
    const searchMatch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.titleJp.includes(searchQuery);
    return categoryMatch && searchMatch;
  });

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative py-20 lg:py-32 overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-0 right-0 h-1 gradient-red" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-up">
            {t('news.latest')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-100">
            {language === 'jp' 
              ? '会社の最新情報、ポリシー変更、チームの成果をお届けします'
              : 'Stay informed with company updates, policy changes, and team achievements'
            }
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-40 glass-panel py-4 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={language === 'jp' ? 'ニュースを検索...' : 'Search news...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {displayCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(categories[index])}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === categories[index]
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArticles.map((article, index) => (
              <article
                key={article.id}
                className="glass-card overflow-hidden hover-lift group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-56 lg:h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={language === 'jp' ? article.titleJp : article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-foreground">
                      {language === 'jp' ? article.categoryJp : article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Author & Date */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={article.authorImage}
                      alt={language === 'jp' ? article.authorJp : article.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {language === 'jp' ? article.authorJp : article.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {language === 'jp' ? article.dateJp : article.date} • {language === 'jp' ? article.readTimeJp : article.readTime}
                      </div>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {language === 'jp' ? article.titleJp : article.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {language === 'jp' ? article.excerptJp : article.excerpt}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{article.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{article.comments}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                    {article.hasPdf && (
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline ml-1">PDF</span>
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                {language === 'jp' ? '該当する記事が見つかりません' : 'No articles found matching your criteria'}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default NewsPage;
