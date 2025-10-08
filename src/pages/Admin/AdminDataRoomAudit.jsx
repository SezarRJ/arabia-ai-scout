import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileKey, Download, Trash2, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const auditLogs = [
  { id: 5, user: 'Aisha Al-Fulan', startup: 'TechFlow Solutions', document: 'ID_Card.jpg', action: 'Uploaded', timestamp: '2025-10-26 14:00' },
  { id: 1, user: 'Khalid Al-Saud', startup: 'TechFlow Solutions', document: 'Pitch Deck.pdf', action: 'Viewed', timestamp: '2025-10-26 10:00' },
  { id: 2, user: 'Alice Johnson', startup: 'TechFlow Solutions', document: 'Q3 Financials.xlsx', action: 'Downloaded', timestamp: '2025-10-26 10:05' },
  { id: 3, user: 'Khalid Al-Saud', startup: 'GreenEnergy Co', document: 'Business Plan.docx', action: 'NDA Requested', timestamp: '2025-10-26 11:30' },
  { id: 4, user: 'Admin', startup: 'Old Startup', document: 'Expired Deck.pdf', action: 'Deleted (Expired)', timestamp: '2025-10-25 09:00' },
];

const AdminDataRoomAudit = () => {
  const { toast } = useToast();

  const handleApproval = (log, status) => {
    toast({
      title: `Document ${status}`,
      description: `${log.document} for ${log.startup} has been ${status.toLowerCase()}.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Data Room Audit - Admin Panel</title>
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
                    <CardTitle>Data Room Audit</CardTitle>
                    <CardDescription>Monitor all activities within startup data rooms.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete Expired Docs</Button>
                    <Button><Download className="mr-2 h-4 w-4" /> Export Logs</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Startup</TableHead>
                      <TableHead>Document</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Manage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.startup}</TableCell>
                        <TableCell>{log.document}</TableCell>
                        <TableCell>
                          <Badge variant={
                            log.action === 'Downloaded' ? 'warning' 
                            : log.action === 'Uploaded' ? 'default' 
                            : 'secondary'
                          }>
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>
                          {log.action === 'Uploaded' ? (
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => handleApproval(log, 'Approved')}>
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleApproval(log, 'Declined')}>
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ) : '-'}
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

export default AdminDataRoomAudit;