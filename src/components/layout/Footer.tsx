import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-red flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-foreground">FUSO</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              Connecting teams, empowering collaboration, and building a stronger workplace community together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link to="/spaces" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.spaces')}
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.documents')}
                </Link>
              </li>
              <li>
                <Link to="/directory" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.directory')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Made with care for FUSO employees</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
