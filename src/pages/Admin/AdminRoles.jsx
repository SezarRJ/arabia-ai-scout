import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialRoles = [
  { id: 1, name: 'Super Admin', permissions: ['all'] },
  { id: 2, name: 'Founder', permissions: ['edit_own_profile', 'view_matches'] },
  { id: 3, name: 'Investor', permissions: ['view_startups', 'access_data_room'] },
  { id: 4, name: 'Moderator', permissions: ['edit_content', 'suspend_users'] },
];

const allPermissions = [
  'all', 'edit_own_profile', 'view_matches', 'view_startups', 'access_data_room', 'edit_content', 'suspend_users', 'manage_roles', 'view_analytics'
];

const AdminRoles = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState(initialRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleEdit = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedRole.name) {
      const updatedRoles = roles.map(r => r.id === selectedRole.id ? selectedRole : r);
      setRoles(updatedRoles);
      toast({ title: 'Role Updated' });
      setIsModalOpen(false);
    }
  };

  const handlePermissionChange = (permission) => {
    setSelectedRole(prev => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions: newPermissions };
    });
  };

  return (
    <>
      <Helmet>
        <title>Role Management - Admin Panel</title>
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
                    <CardTitle>Role Management</CardTitle>
                    <CardDescription>Define user roles and their permissions.</CardDescription>
                  </div>
                  <Button onClick={() => toast({ title: "Feature not implemented" })}><PlusCircle className="mr-2 h-4 w-4" /> Add Role</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map(role => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell className="text-xs">{role.permissions.join(', ')}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(role)}><Edit className="h-4 w-4" /></Button>
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Role: {selectedRole?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="role-name">Role Name</Label>
            <Input id="role-name" value={selectedRole?.name || ''} onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })} />
            <h4 className="font-medium mt-4 mb-2">Permissions</h4>
            <div className="grid grid-cols-3 gap-2">
              {allPermissions.map(permission => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={`perm-${permission}`}
                    checked={selectedRole?.permissions.includes(permission)}
                    onCheckedChange={() => handlePermissionChange(permission)}
                  />
                  <Label htmlFor={`perm-${permission}`}>{permission}</Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminRoles;