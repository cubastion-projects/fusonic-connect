import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const events = [
  {
    id: 1,
    title: 'Annual Year-End Party 2024',
    titleJp: '2024年忘年会',
    date: 'Dec 20, 2024',
    dateJp: '2024年12月20日',
    time: '6:00 PM - 10:00 PM',
    timeJp: '18:00 - 22:00',
    location: 'Tokyo Grand Ballroom',
    locationJp: '東京グランドボールルーム',
    attendees: 450,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format',
    category: 'Social',
    categoryJp: '社交',
  },
  {
    id: 2,
    title: 'Leadership Summit Q1 2025',
    titleJp: '2025年Q1リーダーシップサミット',
    date: 'Jan 15, 2025',
    dateJp: '2025年1月15日',
    time: '9:00 AM - 5:00 PM',
    timeJp: '9:00 - 17:00',
    location: 'Osaka Conference Center',
    locationJp: '大阪カンファレンスセンター',
    attendees: 120,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&auto=format',
    category: 'Business',
    categoryJp: 'ビジネス',
  },
  {
    id: 3,
    title: 'Tech Innovation Workshop',
    titleJp: 'テクノロジーイノベーションワークショップ',
    date: 'Jan 22, 2025',
    dateJp: '2025年1月22日',
    time: '2:00 PM - 6:00 PM',
    timeJp: '14:00 - 18:00',
    location: 'Online / Virtual',
    locationJp: 'オンライン / バーチャル',
    attendees: 280,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format',
    category: 'Training',
    categoryJp: 'トレーニング',
  },
];

const EventsSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary mb-3">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Mark Your Calendar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t('events.title')}
            </h2>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link to="/events">
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <article
              key={event.id}
              className="glass-card overflow-hidden hover-lift group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={language === 'jp' ? event.titleJp : event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-foreground">
                    {language === 'jp' ? event.categoryJp : event.category}
                  </span>
                </div>
                {/* Date Badge */}
                <div className="absolute bottom-4 left-4 glass-panel px-3 py-2 rounded-lg">
                  <div className="text-xs text-muted-foreground">
                    {language === 'jp' ? event.timeJp : event.time}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {language === 'jp' ? event.dateJp : event.date}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {language === 'jp' ? event.titleJp : event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{language === 'jp' ? event.locationJp : event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>{event.attendees} {language === 'jp' ? '名参加予定' : 'attending'}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  {t('events.register')}
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 sm:hidden">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/events">
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
