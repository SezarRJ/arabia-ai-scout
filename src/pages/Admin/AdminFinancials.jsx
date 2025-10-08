import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Download, TrendingDown, PieChart as PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 4000, profit: 2400, costs: 1600 },
  { name: 'Feb', revenue: 3000, profit: 1398, costs: 1602 },
  { name: 'Mar', revenue: 5000, profit: 3800, costs: 1200 },
  { name: 'Apr', revenue: 4500, profit: 3000, costs: 1500 },
  { name: 'May', revenue: 6000, profit: 4800, costs: 1200 },
  { name: 'Jun', revenue: 5500, profit: 4300, costs: 1200 },
];

const revenueStreamData = [
    { name: 'Founder Pro', value: 40000 },
    { name: 'Founder Premium', value: 30000 },
    { name: 'Investor Pro', value: 50000 },
    { name: 'Investor Elite', value: 25000 },
    { name: 'Success Fees', value: 15000 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const recentTransactions = [
  { id: 'txn_1', user: 'Khalid Al-Saud', type: 'Subscription', amount: '$299.00', status: 'Paid', date: '2023-10-26' },
  { id: 'txn_2', user: 'Aisha Al-Fulan', type: 'Success Fee', amount: '$1,500.00', status: 'Paid', date: '2023-10-25' },
  { id: 'txn_3', user: 'New Investor', type: 'Subscription', amount: '$149.00', status: 'Pending', date: '2023-10-26' },
];

const AdminFinancials = () => {
  return (
    <>
      <Helmet>
        <title>Financials - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Financials</h1>
                <Button><Download className="ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2" /> Export Transactions</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle className="flex items-center"><DollarSign className="ml-2 rtl:ml-0 rtl:mr-2" /> Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">$125,340.50</p>
                        <p className="text-sm text-green-400 flex items-center"><TrendingUp className="mr-1 h-4 w-4 rtl:mr-0 rtl:ml-1" /> +15.2% this month</p>
                    </CardContent>
                </Card>
                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle className="flex items-center"><TrendingDown className="ml-2 rtl:ml-0 rtl:mr-2" /> Total Costs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">$25,120.80</p>
                        <p className="text-xs text-muted-foreground">AI: $15k, Marketing: $5k</p>
                    </CardContent>
                </Card>
                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle className="flex items-center"><DollarSign className="ml-2 rtl:ml-0 rtl:mr-2" /> Net Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">$100,219.70</p>
                        <p className="text-sm text-green-400 flex items-center"><TrendingUp className="mr-1 h-4 w-4 rtl:mr-0 rtl:ml-1" /> +12.8% this month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                <Card className="glass-effect lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Revenue, Profit & Costs Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/><stop offset="95%" stopColor="#8884d8" stopOpacity={0}/></linearGradient>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/><stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/></linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                                <YAxis stroke="rgba(255,255,255,0.5)" />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }} />
                                <Legend />
                                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                                <Area type="monotone" dataKey="profit" stroke="#82ca9d" fillOpacity={1} fill="url(#colorProfit)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="glass-effect lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center"><PieChartIcon className="ml-2 rtl:ml-0 rtl:mr-2" /> Revenue Streams</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={revenueStreamData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                    {revenueStreamData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-effect">
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentTransactions.map(txn => (
                                <TableRow key={txn.id}>
                                    <TableCell>{txn.user}</TableCell>
                                    <TableCell>{txn.type}</TableCell>
                                    <TableCell>{txn.amount}</TableCell>
                                    <TableCell><Badge variant={txn.status === 'Paid' ? 'success' : 'warning'}>{txn.status}</Badge></TableCell>
                                    <TableCell>{txn.date}</TableCell>
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

export default AdminFinancials;