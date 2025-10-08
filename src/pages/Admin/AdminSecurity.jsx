import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const auditLogs = [
  { id: 1, admin: 'Admin User', action: 'Suspended user "John Doe"', ip: '192.168.1.1', timestamp: '2023-10-26 10:05:12' },
  { id: 2, admin: 'Admin User', action: 'Changed pricing for Premium plan', ip: '192.168.1.1', timestamp: '2023-10-26 09:45:30' },
  { id: 3, admin: 'Super Admin', action: 'Granted admin rights to "Admin User"', ip: '203.0.113.25', timestamp: '2023-10-25 15:20:00' },
];

const AdminSecurity = () => {
  const { toast } = useToast();

  const handleExport = (type) => {
    toast({
      title: `Exporting ${type} Data`,
      description: `A ${type} data export has been initiated and will be downloaded shortly.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Security & Compliance - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <Card className="glass-effect">
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                    <CardTitle>Security & Compliance</CardTitle>
                    <CardDescription>Monitor admin actions and manage compliance.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => handleExport('GDPR')}><Download className="mr-2 h-4 w-4" /> Export GDPR Data</Button>
                    <Button onClick={() => handleExport('AML')}><Download className="mr-2 h-4 w-4" /> Export AML Report</Button>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Audit Log</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admin</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.admin}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.ip}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
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

export default AdminSecurity;