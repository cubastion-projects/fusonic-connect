import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'jp';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.blogs': 'Blogs',
    'nav.spaces': 'Spaces',
    'nav.documents': 'Documents',
    'nav.directory': 'Directory',
    'nav.events': 'Events',
    'nav.chat': 'Chat',
    
    // Hero
    'hero.welcome': 'Welcome to FUSO',
    'hero.subtitle': 'Your connected workplace for collaboration, communication, and growth.',
    'hero.cta': 'Explore Platform',
    'hero.secondary': 'Learn More',
    
    // Sections
    'trending.title': 'Trending Stories',
    'trending.viewAll': 'View All',
    'announcements.title': 'Announcements',
    'events.title': 'Upcoming Events',
    'events.register': 'Register',
    'spaces.title': 'Explore Spaces',
    'spaces.hr': 'Human Resources',
    'spaces.it': 'IT & Technology',
    'spaces.marketing': 'Marketing',
    'spaces.engineering': 'Engineering',
    
    // Actions
    'action.like': 'Like',
    'action.comment': 'Comment',
    'action.share': 'Share',
    'action.bookmark': 'Bookmark',
    'action.download': 'Download PDF',
    'action.follow': 'Follow',
    'action.connect': 'Connect',
    
    // News
    'news.latest': 'Latest News',
    'news.featured': 'Featured',
    'news.readMore': 'Read More',
    
    // Directory
    'directory.title': 'Employee Directory',
    'directory.search': 'Search employees...',
    'directory.department': 'Department',
    'directory.location': 'Location',
    
    // Documents
    'docs.title': 'Document Repository',
    'docs.hr': 'HR Documents',
    'docs.it': 'IT Resources',
    'docs.categories': 'Categories',
    
    // Footer
    'footer.copyright': '© 2024 FUSO. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  jp: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.news': 'ニュース',
    'nav.blogs': 'ブログ',
    'nav.spaces': 'スペース',
    'nav.documents': 'ドキュメント',
    'nav.directory': '社員名簿',
    'nav.events': 'イベント',
    'nav.chat': 'チャット',
    
    // Hero
    'hero.welcome': 'FUSOへようこそ',
    'hero.subtitle': 'コラボレーション、コミュニケーション、成長のための職場プラットフォーム',
    'hero.cta': 'プラットフォームを探索',
    'hero.secondary': '詳細を見る',
    
    // Sections
    'trending.title': 'トレンドストーリー',
    'trending.viewAll': 'すべて見る',
    'announcements.title': 'お知らせ',
    'events.title': '今後のイベント',
    'events.register': '登録する',
    'spaces.title': 'スペースを探索',
    'spaces.hr': '人事部',
    'spaces.it': 'IT・テクノロジー',
    'spaces.marketing': 'マーケティング',
    'spaces.engineering': 'エンジニアリング',
    
    // Actions
    'action.like': 'いいね',
    'action.comment': 'コメント',
    'action.share': '共有',
    'action.bookmark': 'ブックマーク',
    'action.download': 'PDFをダウンロード',
    'action.follow': 'フォロー',
    'action.connect': 'つながる',
    
    // News
    'news.latest': '最新ニュース',
    'news.featured': '注目',
    'news.readMore': '続きを読む',
    
    // Directory
    'directory.title': '社員名簿',
    'directory.search': '社員を検索...',
    'directory.department': '部署',
    'directory.location': '所在地',
    
    // Documents
    'docs.title': 'ドキュメントリポジトリ',
    'docs.hr': '人事ドキュメント',
    'docs.it': 'ITリソース',
    'docs.categories': 'カテゴリー',
    
    // Footer
    'footer.copyright': '© 2024 FUSO. 全著作権所有。',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
