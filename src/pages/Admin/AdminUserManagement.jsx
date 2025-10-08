import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, FileUp, FileDown, ShieldAlert, Check, X, Eye, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const AdminUserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const { data: { users: authUsers }, error } = await supabase.auth.admin.listUsers();

    if (error) {
      toast({
        title: 'Error fetching users',
        description: error.message,
        variant: 'destructive',
      });
      setUsers([]);
    } else {
      const formattedUsers = authUsers.map(user => ({
        id: user.id,
        name: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() || 'N/A',
        email: user.email,
        role: user.user_metadata?.role || 'N/A',
        status: user.email_confirmed_at ? 'Active' : 'Pending',
        trustScore: user.user_metadata?.trust_score || 0,
        joined: new Date(user.created_at).toLocaleDateString(),
        documents: [], // Placeholder for documents
      }));
      setUsers(formattedUsers);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openDocsModal = (user) => {
    setSelectedUser(user);
    setIsDocsModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setIsEditModalOpen(true);
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser || !selectedRole) return;

    const { data: { user }, error } = await supabase.auth.admin.updateUserById(
      selectedUser.id,
      { user_metadata: { ...selectedUser.user_metadata, role: selectedRole } }
    );

    if (error) {
      toast({
        title: 'Error updating role',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Role Updated',
        description: `${selectedUser.name}'s role has been updated to ${selectedRole}.`,
      });
      setIsEditModalOpen(false);
      fetchUsers(); // Refresh the user list
    }
  };

  const handleDocStatusChange = (docName, newStatus) => {
    toast({
      title: `🚧 Feature not implemented`,
      description: `Document status change is not yet available.`,
    });
    setIsDocsModalOpen(false);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>User Management - Admin Panel</title>
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
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all users on the platform.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><FileDown className="mr-2 h-4 w-4" /> Export</Button>
                    <Button variant="outline" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><FileUp className="mr-2 h-4 w-4" /> Import</Button>
                    <Button onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}><PlusCircle className="mr-2 h-4 w-4" /> Add User</Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Input
                    placeholder="Search users by name, email, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'Active' ? 'success' : 'destructive'}>{user.status}</Badge>
                          </TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => openEditModal(user)}>Edit Role</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openDocsModal(user)}>View Documents</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}>Suspend</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500" onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role for {selectedUser?.name}</DialogTitle>
            <DialogDescription>Select a new role for this user.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Label htmlFor="role-select">User Role</Label>
            <Select id="role-select" value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="founder">Founder</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleRoleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDocsModalOpen} onOpenChange={setIsDocsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Documents for {selectedUser?.name}</DialogTitle>
            <DialogDescription>Review, approve, or refuse uploaded documents.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {selectedUser?.documents && selectedUser.documents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedUser.documents.map((doc) => (
                    <TableRow key={doc.name}>
                      <TableCell className="flex items-center">
                        {doc.name}
                        {doc.flagged && <ShieldAlert className="w-4 h-4 ml-2 text-red-500" title="Flagged by AI" />}
                      </TableCell>
                      <TableCell>
                        <Badge variant={doc.status === 'Approved' ? 'success' : doc.status === 'Refused' ? 'destructive' : 'secondary'}>
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDocStatusChange(doc.name, 'Approved')}><Check className="h-4 w-4 text-green-500" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDocStatusChange(doc.name, 'Refused')}><X className="h-4 w-4 text-red-500" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-muted-foreground">No documents uploaded.</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDocsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminUserManagement;