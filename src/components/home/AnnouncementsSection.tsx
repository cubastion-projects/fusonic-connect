import { Bell, AlertCircle, Info, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const announcements = [
  {
    id: 1,
    type: 'urgent',
    title: 'System Maintenance Scheduled',
    titleJp: 'システムメンテナンス予定',
    description: 'IT systems will undergo maintenance on Dec 15, 2024 from 2:00 AM - 6:00 AM JST.',
    descriptionJp: '2024年12月15日午前2時〜午前6時（日本時間）にITシステムのメンテナンスを実施します。',
    date: 'Dec 10, 2024',
    dateJp: '2024年12月10日',
  },
  {
    id: 2,
    type: 'info',
    title: 'Holiday Schedule Announced',
    titleJp: '休日スケジュールのお知らせ',
    description: 'Please review the updated holiday calendar for 2025. Submit PTO requests early.',
    descriptionJp: '2025年の更新された休日カレンダーをご確認ください。早めに有給休暇申請を提出してください。',
    date: 'Dec 8, 2024',
    dateJp: '2024年12月8日',
  },
  {
    id: 3,
    type: 'success',
    title: 'New Benefits Program Launch',
    titleJp: '新しい福利厚生プログラムの開始',
    description: 'Enhanced wellness benefits now available. Check HR portal for details.',
    descriptionJp: '強化されたウェルネス特典がご利用可能になりました。詳細は人事ポータルをご確認ください。',
    date: 'Dec 5, 2024',
    dateJp: '2024年12月5日',
  },
  {
    id: 4,
    type: 'info',
    title: 'Office Relocation Update',
    titleJp: 'オフィス移転のお知らせ',
    description: 'Tokyo HQ renovation progress and temporary workspace arrangements.',
    descriptionJp: '東京本社の改装進捗状況と一時的なワークスペースの手配について。',
    date: 'Dec 3, 2024',
    dateJp: '2024年12月3日',
  },
];

const typeConfig = {
  urgent: {
    icon: AlertCircle,
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    iconColor: 'text-destructive',
    badge: 'bg-destructive',
  },
  info: {
    icon: Info,
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    iconColor: 'text-primary',
    badge: 'bg-primary',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-500',
    badge: 'bg-emerald-500',
  },
};

const AnnouncementsSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-secondary/30 relative">
      {/* Parallax Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/3 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <Bell className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Stay Informed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t('announcements.title')}
          </h2>
        </div>

        {/* Announcements List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {announcements.map((announcement, index) => {
            const config = typeConfig[announcement.type as keyof typeof typeConfig];
            const Icon = config.icon;

            return (
              <Link
                key={announcement.id}
                to={`/news/${announcement.id}`}
                className={cn(
                  "block glass-card p-5 sm:p-6 border hover-lift group",
                  config.border,
                  "animate-fade-up"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={cn("p-2.5 rounded-lg flex-shrink-0", config.bg)}>
                    <Icon className={cn("w-5 h-5", config.iconColor)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {language === 'jp' ? announcement.titleJp : announcement.title}
                      </h3>
                      {announcement.type === 'urgent' && (
                        <span className={cn("px-2 py-0.5 rounded text-xs font-medium text-primary-foreground", config.badge)}>
                          {language === 'jp' ? '緊急' : 'Urgent'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {language === 'jp' ? announcement.descriptionJp : announcement.description}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {language === 'jp' ? announcement.dateJp : announcement.date}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
