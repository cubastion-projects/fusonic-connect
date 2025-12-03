import { useState } from 'react';
import { Search, Send, Paperclip, Smile, Phone, Video, MoreVertical, Check, CheckCheck } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const conversations = [
  {
    id: 1,
    name: 'Yuki Tanaka',
    nameJp: '田中 由紀',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format',
    lastMessage: 'The report looks great! Just one small revision...',
    lastMessageJp: 'レポートは素晴らしいですね！少しだけ修正を...',
    time: '2m ago',
    timeJp: '2分前',
    unread: 3,
    online: true,
  },
  {
    id: 2,
    name: 'Engineering Team',
    nameJp: 'エンジニアリングチーム',
    avatar: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&auto=format',
    lastMessage: 'Sprint planning starts in 30 minutes',
    lastMessageJp: 'スプリントプランニングが30分後に開始',
    time: '15m ago',
    timeJp: '15分前',
    unread: 0,
    online: false,
    isGroup: true,
  },
  {
    id: 3,
    name: 'Takeshi Yamamoto',
    nameJp: '山本 武',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format',
    lastMessage: 'Thanks for the quick turnaround!',
    lastMessageJp: '迅速な対応ありがとうございます！',
    time: '1h ago',
    timeJp: '1時間前',
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: 'HR Announcements',
    nameJp: '人事からのお知らせ',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format',
    lastMessage: 'New benefits enrollment period starts next week',
    lastMessageJp: '新しい福利厚生の登録期間が来週から開始',
    time: '3h ago',
    timeJp: '3時間前',
    unread: 1,
    online: false,
    isGroup: true,
  },
];

const messages = [
  {
    id: 1,
    sender: 'Yuki Tanaka',
    senderJp: '田中 由紀',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format',
    content: 'Hi! I reviewed the quarterly report you sent over.',
    contentJp: 'こんにちは！送っていただいた四半期レポートを確認しました。',
    time: '10:30 AM',
    isMe: false,
    status: 'read',
  },
  {
    id: 2,
    sender: 'Me',
    senderJp: '自分',
    content: 'Great! What do you think about the projections?',
    contentJp: '良かったです！予測についてどう思いますか？',
    time: '10:32 AM',
    isMe: true,
    status: 'read',
  },
  {
    id: 3,
    sender: 'Yuki Tanaka',
    senderJp: '田中 由紀',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format',
    content: 'The report looks great! Just one small revision needed on page 12. Can we adjust the Q2 forecast slightly?',
    contentJp: 'レポートは素晴らしいですね！12ページに少しだけ修正が必要です。Q2の予測を少し調整できますか？',
    time: '10:35 AM',
    isMe: false,
    status: 'read',
  },
];

const ChatPage = () => {
  const { language } = useLanguage();
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [showConversations, setShowConversations] = useState(true);

  return (
    <Layout>
      <div className="h-[calc(100vh-5rem)] lg:h-[calc(100vh-6rem)] flex">
        {/* Conversations Sidebar */}
        <aside className={cn(
          "w-full lg:w-80 flex-shrink-0 glass-panel border-r border-border flex flex-col",
          showConversations ? "block" : "hidden lg:flex"
        )}>
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-bold text-foreground mb-3">
              {language === 'jp' ? 'メッセージ' : 'Messages'}
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={language === 'jp' ? '会話を検索...' : 'Search conversations...'}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveConversation(conv);
                  setShowConversations(false);
                }}
                className={cn(
                  "w-full p-4 flex items-start gap-3 hover:bg-accent/50 transition-colors border-b border-border/50",
                  activeConversation.id === conv.id && "bg-accent"
                )}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.avatar}
                    alt={language === 'jp' ? conv.nameJp : conv.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conv.online && !conv.isGroup && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-foreground truncate">
                      {language === 'jp' ? conv.nameJp : conv.name}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {language === 'jp' ? conv.timeJp : conv.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {language === 'jp' ? conv.lastMessageJp : conv.lastMessage}
                    </p>
                    {conv.unread > 0 && (
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground flex-shrink-0">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <div className={cn(
          "flex-1 flex flex-col",
          !showConversations ? "block" : "hidden lg:flex"
        )}>
          {/* Chat Header */}
          <div className="glass-panel px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConversations(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-accent text-muted-foreground"
              >
                ←
              </button>
              <img
                src={activeConversation.avatar}
                alt={language === 'jp' ? activeConversation.nameJp : activeConversation.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-foreground">
                  {language === 'jp' ? activeConversation.nameJp : activeConversation.name}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {activeConversation.online 
                    ? (language === 'jp' ? 'オンライン' : 'Online') 
                    : (language === 'jp' ? 'オフライン' : 'Offline')
                  }
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-end gap-2",
                  msg.isMe ? "flex-row-reverse" : ""
                )}
              >
                {!msg.isMe && (
                  <img
                    src={msg.avatar}
                    alt={language === 'jp' ? msg.senderJp : msg.sender}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2.5",
                  msg.isMe 
                    ? "bg-primary text-primary-foreground rounded-br-md" 
                    : "glass-card rounded-bl-md"
                )}>
                  <p className="text-sm">
                    {language === 'jp' ? msg.contentJp : msg.content}
                  </p>
                  <div className={cn(
                    "flex items-center justify-end gap-1 mt-1",
                    msg.isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    <span className="text-xs">{msg.time}</span>
                    {msg.isMe && (
                      msg.status === 'read' 
                        ? <CheckCheck className="w-3.5 h-3.5" />
                        : <Check className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="glass-panel p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5" />
              </Button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={language === 'jp' ? 'メッセージを入力...' : 'Type a message...'}
                  className="w-full px-4 py-2.5 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <Button variant="fuso" size="icon" className="rounded-full w-10 h-10">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
