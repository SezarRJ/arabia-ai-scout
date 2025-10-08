import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { FileSearch, PlusCircle, Edit, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const generatedReports = [
  { id: 1, startup: 'TechFlow Solutions', type: 'Full Due Diligence', status: 'Published', generated: '2025-10-25' },
  { id: 2, startup: 'GreenEnergy Co', type: 'Market Analysis', status: 'Pending Approval', generated: '2025-10-26' },
  { id: 3, startup: 'HealthWell', type: 'Team Assessment', status: 'Draft', generated: '2025-10-26' },
];

const AdminReportGeneration = () => {
  const { toast } = useToast();
  const [startup, setStartup] = useState('');
  const [reportType, setReportType] = useState('');

  const handleGenerate = () => {
    if (startup && reportType) {
      toast({ title: 'Report Generation Started', description: `Generating ${reportType} report for ${startup}.` });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select a startup and report type.' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Report Generation - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Generated Reports</CardTitle>
                    <CardDescription>Manage and approve AI-generated reports.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Startup</TableHead>
                          <TableHead>Report Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generatedReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell>{report.startup}</TableCell>
                            <TableCell>{report.type}</TableCell>
                            <TableCell><Badge>{report.status}</Badge></TableCell>
                            <TableCell className="space-x-1">
                              <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                              {report.status === 'Pending Approval' && <Button variant="ghost" size="icon"><CheckCircle className="h-4 w-4 text-green-500" /></Button>}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Generate New Report</CardTitle>
                    <CardDescription>Manually trigger a new AI report.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select onValueChange={setStartup}>
                      <SelectTrigger><SelectValue placeholder="Select Startup" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TechFlow Solutions">TechFlow Solutions</SelectItem>
                        <SelectItem value="GreenEnergy Co">GreenEnergy Co</SelectItem>
                        <SelectItem value="HealthWell">HealthWell</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select onValueChange={setReportType}>
                      <SelectTrigger><SelectValue placeholder="Select Report Type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Due Diligence">Full Due Diligence</SelectItem>
                        <SelectItem value="Market Analysis">Market Analysis</SelectItem>
                        <SelectItem value="Team Assessment">Team Assessment</SelectItem>
                        <SelectItem value="Financial Projection">Financial Projection</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full" onClick={handleGenerate}><PlusCircle className="mr-2 h-4 w-4" /> Generate</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminReportGeneration;