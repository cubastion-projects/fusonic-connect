import { Users, Cpu, Megaphone, Wrench, ArrowRight, FileText, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const spaces = [
  {
    id: 'hr',
    key: 'spaces.hr',
    icon: Users,
    description: 'Policies, benefits, onboarding resources, and team updates.',
    descriptionJp: 'ポリシー、福利厚生、オンボーディングリソース、チームアップデート。',
    members: 450,
    posts: 234,
    color: 'from-emerald-500/20 to-emerald-500/5',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'it',
    key: 'spaces.it',
    icon: Cpu,
    description: 'Tech support, system guides, and IT announcements.',
    descriptionJp: 'テクニカルサポート、システムガイド、ITからのお知らせ。',
    members: 380,
    posts: 567,
    color: 'from-blue-500/20 to-blue-500/5',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-500',
  },
  {
    id: 'marketing',
    key: 'spaces.marketing',
    icon: Megaphone,
    description: 'Brand guidelines, campaign updates, and creative assets.',
    descriptionJp: 'ブランドガイドライン、キャンペーン更新、クリエイティブアセット。',
    members: 220,
    posts: 189,
    color: 'from-purple-500/20 to-purple-500/5',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-500',
  },
  {
    id: 'engineering',
    key: 'spaces.engineering',
    icon: Wrench,
    description: 'Technical documentation, project updates, and engineering culture.',
    descriptionJp: '技術ドキュメント、プロジェクト更新、エンジニアリング文化。',
    members: 340,
    posts: 892,
    color: 'from-orange-500/20 to-orange-500/5',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-500',
  },
];

const SpacesSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Communities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('spaces.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'jp' 
              ? '部門別コミュニティに参加して、つながりを深め、コラボレーションしましょう'
              : 'Join department communities to connect, collaborate, and stay updated'
            }
          </p>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaces.map((space, index) => {
            const Icon = space.icon;

            return (
              <Link
                key={space.id}
                to={`/spaces/${space.id}`}
                className={cn(
                  "glass-card p-6 hover-lift group relative overflow-hidden animate-fade-up"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Background */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  space.color
                )} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                    space.iconBg
                  )}>
                    <Icon className={cn("w-6 h-6", space.iconColor)} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(space.key)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {language === 'jp' ? space.descriptionJp : space.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{space.members}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{space.posts}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpacesSection;
