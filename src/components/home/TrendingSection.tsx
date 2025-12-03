import { ArrowRight, Heart, MessageCircle, Share2, Bookmark, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const trendingStories = [
  {
    id: 1,
    title: 'Q4 Company-Wide Town Hall Highlights',
    titleJp: '第4四半期全社タウンホールのハイライト',
    excerpt: 'Key takeaways from our latest all-hands meeting including 2024 achievements and 2025 roadmap.',
    excerptJp: '2024年の成果と2025年のロードマップを含む最新の全社ミーティングの主なポイント。',
    category: 'Company News',
    categoryJp: '会社ニュース',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format',
    author: 'Communications Team',
    authorJp: 'コミュニケーションチーム',
    date: '2 hours ago',
    dateJp: '2時間前',
    likes: 342,
    comments: 56,
    featured: true,
  },
  {
    id: 2,
    title: 'New Remote Work Policy Update',
    titleJp: '新しいリモートワークポリシーの更新',
    excerpt: 'Flexible working arrangements expanded for all departments starting January 2024.',
    excerptJp: '2024年1月からすべての部門でフレキシブルな勤務形態が拡大されます。',
    category: 'HR Update',
    categoryJp: '人事アップデート',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format',
    author: 'HR Department',
    authorJp: '人事部',
    date: '5 hours ago',
    dateJp: '5時間前',
    likes: 189,
    comments: 34,
    featured: false,
  },
  {
    id: 3,
    title: 'Engineering Team Wins Innovation Award',
    titleJp: 'エンジニアリングチームがイノベーション賞を受賞',
    excerpt: 'Our R&D team recognized for breakthrough development in sustainable technology.',
    excerptJp: '持続可能な技術における画期的な開発で研究開発チームが表彰されました。',
    category: 'Achievement',
    categoryJp: '達成',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format',
    author: 'Corporate PR',
    authorJp: '広報部',
    date: '1 day ago',
    dateJp: '1日前',
    likes: 521,
    comments: 89,
    featured: false,
  },
];

const TrendingSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary mb-3">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Hot Topics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t('trending.title')}
            </h2>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link to="/news">
              {t('trending.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Story */}
          <div className="lg:row-span-2">
            <article className="glass-card overflow-hidden h-full hover-lift group">
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src={trendingStories[0].image}
                  alt={language === 'jp' ? trendingStories[0].titleJp : trendingStories[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    {t('news.featured')}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {language === 'jp' ? trendingStories[0].categoryJp : trendingStories[0].category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {language === 'jp' ? trendingStories[0].titleJp : trendingStories[0].title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {language === 'jp' ? trendingStories[0].excerptJp : trendingStories[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{language === 'jp' ? trendingStories[0].authorJp : trendingStories[0].author}</span>
                    <span>•</span>
                    <span>{language === 'jp' ? trendingStories[0].dateJp : trendingStories[0].date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{trendingStories[0].likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{trendingStories[0].comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Secondary Stories */}
          {trendingStories.slice(1).map((story) => (
            <article key={story.id} className="glass-card overflow-hidden hover-lift group">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={story.image}
                    alt={language === 'jp' ? story.titleJp : story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {language === 'jp' ? story.categoryJp : story.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {language === 'jp' ? story.titleJp : story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {language === 'jp' ? story.excerptJp : story.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">
                      {language === 'jp' ? story.dateJp : story.date}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 sm:hidden">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/news">
              {t('trending.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
