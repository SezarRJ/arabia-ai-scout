import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, Video, Bot, Lock, ShieldCheck, Mic, Sparkles, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const MessagesPage = ({ setMobileSidebarOpen }) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleFeatureClick = (featureName) => {
    toast({ title: t('notImplementedYet'), description: `The ${featureName} feature is under construction.` });
  };
  
  const conversations = [];

  const [activeConversation, setActiveConversation] = useState(null);
  
  const messages = [];

  return (
    <>
      <Helmet>
        <title>{t('messages')} - SharkVest</title>
      </Helmet>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header setMobileSidebarOpen={setMobileSidebarOpen} />
          <main className="flex-1 flex overflow-hidden">
            <div className="w-full md:w-1/3 border-r glass-effect overflow-y-auto">
              <div className="p-4 border-b">
                <h1 className="text-2xl font-bold">{t('messages')}</h1>
                <Input placeholder={t('search')} className="mt-2" />
              </div>
              <div>
                {conversations.length > 0 ? conversations.map(convo => (
                  <div key={convo.id} 
                    className={cn(
                        "flex items-center p-4 cursor-pointer hover:bg-secondary",
                        activeConversation?.id === convo.id && "bg-secondary"
                    )}
                    onClick={() => setActiveConversation(convo)}
                  >
                    <Avatar className="h-12 w-12 mr-4 rtl:mr-0 rtl:ml-4">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">{convo.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{convo.name}</h3>
                        <p className="text-xs text-muted-foreground">{convo.time}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate w-48">{convo.lastMessage}</p>
                        {convo.unread > 0 && <Badge className="bg-primary text-primary-foreground">{convo.unread}</Badge>}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <MessageCircle className="mx-auto h-12 w-12" />
                    <p className="mt-4 text-sm">No conversations yet.</p>
                    <p className="text-xs">Start matching to begin a conversation.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:flex w-2/3 flex-col glass-effect">
              {activeConversation ? (
                <>
                  <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center">
                       <Avatar className="h-10 w-10 mr-3 rtl:mr-0 rtl:ml-3">
                         <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">{activeConversation.avatar}</AvatarFallback>
                       </Avatar>
                       <div>
                         <h2 className="text-xl font-bold">{activeConversation.name}</h2>
                         <p className="text-sm text-blue-400">Online</p>
                       </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button variant="ghost" size="icon" onClick={() => handleFeatureClick('Video Call')}><Video /></Button>
                      <Badge variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse border-blue-500/50 text-blue-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span>E2E Encrypted</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                      <div key={index} className={cn("flex", msg.sender === 'me' ? "justify-end" : "justify-start")}>
                        <div className={cn("max-w-md p-3 rounded-lg", msg.sender === 'me' ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t bg-background/50">
                     <div className="bg-secondary p-2 rounded-md mb-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <Bot className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 ai-gradient p-0.5 rounded"/>
                          <p className="text-sm">AI Suggestion: Ask about their traction metrics.</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => handleFeatureClick('AI Suggestion')}>Use Suggestion</Button>
                    </div>
                    <div className="relative flex items-center">
                      <Input placeholder="Type your message or use voice input..." className="pr-40 rtl:pr-4 rtl:pl-40" />
                      <div className="absolute right-2 rtl:right-auto rtl:left-2 flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => handleFeatureClick('Communication Coach')}>
                          <Sparkles className="w-5 h-5 text-yellow-400" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleFeatureClick('Voice Input')}><Mic className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleFeatureClick('Attachment')}><Paperclip className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleFeatureClick('Send Message')}><Send className="w-5 h-5" /></Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleFeatureClick('NDA Request')}>
                            <Lock className="w-3 h-3 mr-2"/> Request NDA for Document Access
                        </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
                  <div>
                    <MessageCircle className="mx-auto h-16 w-16" />
                    <p className="mt-4 text-lg">Select a conversation</p>
                    <p className="text-sm">Or start a new one from the Matches page.</p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MessagesPage;