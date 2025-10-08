import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Star, Video, Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const VirtualPitchEventsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const upcomingEvents = [
    {
      id: 1,
      title: "MENA FinTech Innovators Pitch Day",
      date: "2025-10-25",
      time: "14:00 GMT+4",
      attendees: 45,
      status: 'upcoming',
      description: "A curated event for the most promising FinTech startups in the region to pitch to leading VCs and angel investors.",
      tags: ["FinTech", "Seed Stage", "AI"]
    },
    {
      id: 2,
      title: "SaaS & Enterprise Tech Showcase",
      date: "2025-11-10",
      time: "16:00 GMT+4",
      attendees: 30,
      status: 'upcoming',
      description: "Discover the next generation of B2B SaaS solutions disrupting industries from logistics to HR tech.",
      tags: ["SaaS", "Series A", "B2B"]
    }
  ];

  const pastEvents = [
    {
      id: 3,
      title: "CleanTech & Sustainability Demo Day",
      date: "2025-09-15",
      time: "15:00 GMT+4",
      attendees: 62,
      status: 'past',
      description: "Featured startups tackling climate change with innovative solutions in renewable energy, waste management, and sustainable agriculture.",
      tags: ["CleanTech", "ESG", "Impact"],
      recordingUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  const handleRegister = (event) => {
    if (registeredEvents.includes(event.id)) return;
    setRegisteredEvents(prev => [...prev, event.id]);
    toast({
      title: "Registration Successful!",
      description: `You have registered for "${event.title}". A calendar invite has been sent.`,
    });
  };
  
  const handleViewRecording = (event) => {
    setSelectedEvent(event);
    setIsRecordingModalOpen(true);
  };

  const EventCard = ({ event }) => {
    const isRegistered = registeredEvents.includes(event.id);
    return (
      <Card className="glass-effect card-hover flex flex-col">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription className="flex items-center text-sm text-gray-400 pt-2">
            <Calendar className="w-4 h-4 mr-2" /> {event.date}
            <Clock className="w-4 h-4 ml-4 mr-2" /> {event.time}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-300 mb-4">{event.description}</p>
          <div className="flex flex-wrap gap-2">
            {event.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-400">
            <Users className="w-4 h-4 mr-2" />
            {event.attendees} {event.status === 'upcoming' ? t('registered') : t('attended')}
          </div>
          {event.status === 'upcoming' ? (
            <Button onClick={() => handleRegister(event)} disabled={isRegistered}>
              {isRegistered ? <CheckCircle className="w-4 h-4 mr-2" /> : <Video className="w-4 h-4 mr-2" />}
              {isRegistered ? t('registered') : t('registerNow')}
            </Button>
          ) : (
            <Button variant="outline" onClick={() => handleViewRecording(event)}>
              <Video className="w-4 h-4 mr-2" /> {t('viewRecording')}
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <Helmet>
        <title>{t('virtualPitchEvents')} - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <Star className="w-10 h-10 ai-gradient rounded-lg p-2" />
              <h1 className="text-3xl font-bold">{t('virtualPitchEvents')}</h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">{t('upcomingEvents')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">{t('pastEvents')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pastEvents.map(event => <EventCard key={event.id} event={event} />)}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>{t('yourEventCalendar')}</span>
                    </CardTitle>
                    <CardDescription>{t('yourUpcomingRegisteredEvents')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {registeredEvents.length > 0 ? (
                      <ul className="space-y-3">
                        {upcomingEvents.filter(e => registeredEvents.includes(e.id)).map(event => (
                          <li key={event.id} className="p-3 rounded-lg bg-gray-800/50">
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-gray-400">{event.date} at {event.time}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400 text-center py-4">{t('noUpcomingEvents')}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Dialog open={isRecordingModalOpen} onOpenChange={setIsRecordingModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t('recording')}: {selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {t('reviewPitchEvent')} {selectedEvent?.date}.
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video mt-4">
            {selectedEvent?.recordingUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={selectedEvent.recordingUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-lg">
                <p>Recording not available.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VirtualPitchEventsPage;