import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { FileSignature, Send, GitCommit, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const TermSheetPage = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { startup } = location.state || { startup: { name: 'a Startup', logo: 'S' } };

  const [terms, setTerms] = useState([
    { id: 1, key: 'Investment Amount', value: '$500,000' },
    { id: 2, key: 'Valuation Cap', value: '$5,000,000' },
    { id: 3, key: 'Discount Rate', value: '20%' },
    { id: 4, key: 'Pro-rata Rights', value: 'Standard' },
  ]);
  const [comments, setComments] = useState([
    { id: 1, user: 'Founder', text: 'Can we discuss the valuation cap? We were hoping for something closer to $6M.', termId: 2 },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleSendOffer = () => {
    toast({
      title: "Term Sheet Sent!",
      description: `Your offer has been formally delivered to ${startup.name}.`,
    });
    navigate('/investor-dashboard');
  };

  const handleAddTerm = () => {
    setTerms([...terms, { id: Date.now(), key: '', value: '' }]);
  };

  const handleRemoveTerm = (id) => {
    setTerms(terms.filter(term => term.id !== id));
  };

  const handleAddComment = () => {
    if (!newComment) return;
    setComments([...comments, { id: Date.now(), user: 'Investor', text: newComment, termId: null }]);
    setNewComment('');
  };

  return (
    <>
      <Helmet>
        <title>Term Sheet Negotiation - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <FileSignature className="w-10 h-10 text-purple-400" />
              <div>
                <h1 className="text-3xl font-bold">Term Sheet Negotiation</h1>
                <p className="text-gray-400">Managing offer for: {startup.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Term Sheet Builder */}
              <div className="lg:col-span-2">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Term Sheet Builder</CardTitle>
                    <CardDescription>Create and edit the terms of your offer.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {terms.map((term, index) => (
                      <div key={term.id} className="flex items-center gap-2">
                        <Input placeholder="Term Key" defaultValue={term.key} className="font-semibold" />
                        <Input placeholder="Term Value" defaultValue={term.value} />
                        <Button variant="destructive" size="icon" onClick={() => handleRemoveTerm(term.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={handleAddTerm} className="w-full">
                      <Plus className="w-4 h-4 mr-2" /> Add Term
                    </Button>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="ai-gradient" onClick={handleSendOffer}>
                      <Send className="w-4 h-4 mr-2" /> Send Offer
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Versioning & Comments */}
              <div className="space-y-6">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center"><GitCommit className="w-5 h-5 mr-2"/> Version History</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="secondary" className="w-full justify-start">Version 2 (Current)</Button>
                    <Button variant="ghost" className="w-full justify-start">Version 1 (Initial Offer)</Button>
                  </CardContent>
                </Card>
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center"><MessageSquare className="w-5 h-5 mr-2"/> Comments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-60 overflow-y-auto">
                    {comments.map(comment => (
                      <div key={comment.id} className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={comment.user === 'Founder' ? 'bg-blue-500' : 'bg-purple-500'}>
                            {comment.user[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 p-3 rounded-lg bg-gray-800/50">
                          <p className="text-sm">{comment.text}</p>
                          {comment.termId && <p className="text-xs text-blue-400 mt-1">Re: {terms.find(t => t.id === comment.termId)?.key}</p>}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex-col items-stretch space-y-2 pt-4">
                    <Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." />
                    <Button onClick={handleAddComment} className="w-full">Add Comment</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default TermSheetPage;