import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const tickets = [
  { id: '#78342', title: 'Problem with document upload', user: 'Aisha Al-Fulan', status: 'Open', priority: 'High', updated: '2h ago' },
  { id: '#78339', title: 'Question about billing', user: 'Khalid Al-Saud', status: 'Closed', priority: 'Medium', updated: '1d ago' },
  { id: '#78335', title: 'AI Co-Pilot feature request', user: 'John Doe', status: 'In Progress', priority: 'Low', updated: '3d ago' },
];

const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'success';
      case 'In Progress': return 'warning';
      case 'Closed': return 'secondary';
      default: return 'secondary';
    }
};

const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'warning';
      case 'Low': return 'secondary';
      default: return 'secondary';
    }
};

const AdminSupport = () => {
  return (
    <>
      <Helmet>
        <title>Support & Ticketing - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Support & Ticketing Management</CardTitle>
                <CardDescription>View and manage all user support tickets.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>{ticket.user}</TableCell>
                        <TableCell><Badge variant={getStatusColor(ticket.status)}>{ticket.status}</Badge></TableCell>
                        <TableCell><Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge></TableCell>
                        <TableCell>{ticket.updated}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Assign to...</DropdownMenuItem>
                              <DropdownMenuItem>Close Ticket</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

export default AdminSupport;