import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ParallaxSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight && sectionTop > -rect.height) {
          setScrollY((windowHeight - sectionTop) / (windowHeight + rect.height));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Parallax Background Layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
        style={{ transform: `translateY(${scrollY * 50}px)` }}
      />
      
      <div 
        className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
        style={{ transform: `translateY(${scrollY * 100}px) translateX(${scrollY * 30}px)` }}
      />
      
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]"
        style={{ transform: `translateY(${-scrollY * 80}px)` }}
      />

      {/* Floating 3D Elements */}
      <div 
        className="absolute top-1/4 left-[10%] w-24 h-24 glass-card rotate-12"
        style={{ 
          transform: `translateY(${scrollY * 150}px) rotate(${12 + scrollY * 20}deg)`,
          opacity: 0.6
        }}
      />
      
      <div 
        className="absolute top-1/3 right-[15%] w-16 h-16 gradient-red rounded-xl rotate-45"
        style={{ 
          transform: `translateY(${scrollY * 200}px) rotate(${45 + scrollY * -30}deg)`,
          opacity: 0.4
        }}
      />
      
      <div 
        className="absolute bottom-1/4 left-[20%] w-20 h-20 border-2 border-primary/30 rounded-full"
        style={{ 
          transform: `translateY(${-scrollY * 120}px) scale(${1 + scrollY * 0.2})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          style={{ transform: `translateY(${scrollY * -30}px)` }}
        >
          {language === 'jp' ? '一緒に成長しましょう' : 'Growing Together'}
        </h2>
        
        <p 
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
          style={{ transform: `translateY(${scrollY * -20}px)` }}
        >
          {language === 'jp' 
            ? 'FUSOの社員として、私たちは革新、協力、卓越性への共有された取り組みによって結ばれています。'
            : 'As FUSO employees, we are united by our shared commitment to innovation, collaboration, and excellence.'
          }
        </p>

        {/* Parallax Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: language === 'jp' ? 'イノベーション' : 'Innovation',
              description: language === 'jp' 
                ? '最先端の技術とソリューション' 
                : 'Cutting-edge technology and solutions',
              delay: 0,
            },
            {
              title: language === 'jp' ? 'コラボレーション' : 'Collaboration',
              description: language === 'jp' 
                ? 'チームワークで達成する成功' 
                : 'Success through teamwork',
              delay: 0.1,
            },
            {
              title: language === 'jp' ? '卓越性' : 'Excellence',
              description: language === 'jp' 
                ? '品質への揺るぎないコミットメント' 
                : 'Unwavering commitment to quality',
              delay: 0.2,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="glass-card p-8 hover-lift card-3d"
              style={{ 
                transform: `translateY(${scrollY * (40 - index * 20)}px)`,
                animationDelay: `${item.delay}s`
              }}
            >
              <div className="w-16 h-16 gradient-red rounded-xl flex items-center justify-center mx-auto mb-6 fuso-glow">
                <span className="text-2xl font-bold text-primary-foreground">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
