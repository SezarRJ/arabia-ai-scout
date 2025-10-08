import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

const flaggedContent = [
  { id: 1, user: 'John Doe', type: 'Profile Bio', content: 'Inappropriate language used.', date: '2023-10-25' },
  { id: 2, user: 'StartupX', type: 'Pitch Deck', content: 'Misleading financial claims.', date: '2023-10-24' },
  { id: 3, user: 'InvestorY', type: 'Message', content: 'Spam link sent to founder.', date: '2023-10-23' },
];

const AdminContentControl = () => {
  return (
    <>
      <Helmet>
        <title>Content Control - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Content & Data Control</CardTitle>
                <CardDescription>Review and moderate user-submitted content.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Content Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flaggedContent.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.user}</TableCell>
                        <TableCell><Badge>{item.type}</Badge></TableCell>
                        <TableCell>{item.content}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="icon"><Check className="h-4 w-4 text-green-500" /></Button>
                          <Button variant="outline" size="icon"><X className="h-4 w-4 text-red-500" /></Button>
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
    </>
  );
};

export default AdminContentControl;