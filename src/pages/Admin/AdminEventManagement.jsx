import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Calendar, Video, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const initialEvents = [
  { id: 1, title: "MENA FinTech Pitch Day", date: "2025-10-25", status: "Upcoming", attendees: 45, pitches: 8 },
  { id: 2, title: "SaaS Showcase", date: "2025-11-10", status: "Upcoming", attendees: 30, pitches: 6 },
  { id: 3, title: "CleanTech Demo Day", date: "2025-09-15", status: "Completed", attendees: 62, pitches: 10 },
];

const AdminEventManagement = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleAddOrEdit = (event) => {
    setCurrentEvent(event || { title: '', date: '', status: 'Upcoming', attendees: 0, pitches: 0 });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    toast({ title: 'Event Saved' });
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Event Management - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <Card className="glass-effect">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Event Management</CardTitle>
                    <CardDescription>Create, edit, and manage virtual pitch events.</CardDescription>
                  </div>
                  <Button onClick={() => handleAddOrEdit(null)}><PlusCircle className="mr-2 h-4 w-4" /> Create Event</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Attendees</TableHead>
                      <TableHead>Pitches</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell><Badge variant={event.status === 'Upcoming' ? 'default' : 'secondary'}>{event.status}</Badge></TableCell>
                        <TableCell>{event.attendees}</TableCell>
                        <TableCell>{event.pitches}</TableCell>
                        <TableCell className="space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => handleAddOrEdit(event)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                          {event.status === 'Completed' && <Button variant="ghost" size="icon"><Upload className="h-4 w-4 text-blue-400" /></Button>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentEvent?.id ? 'Edit' : 'Create'} Event</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div><Label htmlFor="event-title">Title</Label><Input id="event-title" value={currentEvent?.title} /></div>
            <div><Label htmlFor="event-date">Date</Label><Input id="event-date" type="date" value={currentEvent?.date} /></div>
            <div><Label htmlFor="event-desc">Description</Label><Textarea id="event-desc" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminEventManagement;