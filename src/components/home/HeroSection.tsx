import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Suspense, lazy } from 'react';

const ThreeScene = lazy(() => import('@/components/ThreeScene'));

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* 3D Scene */}
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Red Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 gradient-red" />
        
        {/* Floating Shapes for parallax effect */}
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl animate-float" />
        <div className="absolute top-1/3 right-20 w-32 h-32 rounded-full bg-primary/5 blur-2xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full bg-primary/10 blur-lg animate-parallax" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 animate-fade-up">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Welcome to your connected workplace</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up delay-100">
              {t('hero.welcome')}
              <span className="block mt-2 text-gradient-red">Intranet</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 animate-fade-up delay-200">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up delay-300">
              <Button variant="hero" asChild>
                <Link to="/news">
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" asChild>
                <Link to="/spaces">
                  <Play className="w-5 h-5" />
                  {t('hero.secondary')}
                </Link>
              </Button>
            </div>
          </div>

          {/* 3D Visual Area - Right Side (for visual balance) */}
          <div className="hidden lg:block relative h-[400px]">
            {/* This space is for the 3D scene to show through */}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 animate-fade-up delay-400">
          {[
            { value: '2,500+', label: 'Employees' },
            { value: '150+', label: 'Teams' },
            { value: '12', label: 'Locations' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, index) => (
            <div key={index} className="glass-card p-4 sm:p-6 hover-lift card-3d">
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-2.5 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
