import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Lock, Download, Eye, MessageCircle, Shield, MoreVertical, FileLock, Link as LinkIcon, UserPlus, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const initialStartupData = {
  'TechFlow Solutions': {
    logo: 'TF',
    description: 'Pioneering FinTech solutions for emerging markets.',
    connectionStatus: 'Due Diligence',
    documents: [
      { id: 1, name: "Pitch Deck.pdf", type: 'file', folder: 'Pitches', modified: '2 days ago', size: '5.8MB', ndaStatus: 'signed' },
      { id: 2, name: "Q3 Financials.xlsx", type: 'file', folder: 'Financials', modified: '3 days ago', size: '1.2MB', ndaStatus: 'signed' },
    ]
  },
  'GreenEnergy Co': {
    logo: 'GE',
    description: 'Developing sustainable energy sources for a greener tomorrow.',
    connectionStatus: 'Initial Contact',
    documents: [
      { id: 3, name: "Business Plan.docx", type: 'file', folder: 'Business Docs', modified: '1 week ago', size: '2.1MB', ndaStatus: 'required' },
      { id: 4, name: "Patent Application.pdf", type: 'file', folder: 'Legal', modified: '2 weeks ago', size: '300KB', ndaStatus: 'required' },
    ]
  }
};

const teamMembers = [
  { id: 1, name: 'Alice Johnson', role: 'Analyst', avatar: 'AJ' },
  { id: 2, name: 'Bob Williams', role: 'Partner', avatar: 'BW' },
  { id: 3, name: 'Charlie Brown', role: 'Associate', avatar: 'CB' },
];

const DataRoomPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isNdaModalOpen, setIsNdaModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState('TechFlow Solutions');
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [permissionType, setPermissionType] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');
  const [startupData, setStartupData] = useState(initialStartupData);
  const [permissions, setPermissions] = useState({
    Viewers: [1],
    Downloaders: [2],
    Commenters: [],
  });

  const handleAction = (featureName, action) => {
    toast({ title: `${featureName} clicked`, description: `The "${action}" action was triggered.` });
  };

  const handleNdaRequest = (doc) => {
    setSelectedDoc(doc);
    setIsNdaModalOpen(true);
  };

  const sendNdaRequest = () => {
    toast({
      title: "NDA Request Sent",
      description: `Your request to access "${selectedDoc.name}" has been sent to the founder.`,
    });
    setIsNdaModalOpen(false);
    setSelectedDoc(null);
  };

  const getDocBadge = (status) => {
    switch (status) {
      case 'signed':
        return <Badge variant="success" className="flex items-center space-x-1 rtl:space-x-reverse"><Shield className="w-3 h-3"/>NDA Signed</Badge>;
      case 'required':
        return <Badge variant="warning" className="flex items-center space-x-1 rtl:space-x-reverse"><FileLock className="w-3 h-3"/>NDA Required</Badge>;
      default:
        return null;
    }
  };

  const handleManagePermissions = (type) => {
    setPermissionType(type);
    setIsPermissionsModalOpen(true);
  };

  const handleUploadFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFileName(e.target.files[0].name);
    }
  };

  const handleUploadSubmit = () => {
    if (!uploadFileName) {
      toast({ variant: 'destructive', title: 'No file selected', description: 'Please choose a file to upload.' });
      return;
    }
    const newDoc = {
      id: Date.now(),
      name: uploadFileName,
      type: 'file',
      folder: 'General',
      modified: 'Just now',
      size: 'N/A',
      ndaStatus: 'signed'
    };
    setStartupData(prevData => ({
      ...prevData,
      [selectedStartup]: {
        ...prevData[selectedStartup],
        documents: [...prevData[selectedStartup].documents, newDoc]
      }
    }));
    toast({ title: 'Upload Successful', description: `${uploadFileName} has been added to the data room.` });
    setIsUploadModalOpen(false);
    setUploadFileName('');
  };

  const togglePermission = (memberId) => {
    setPermissions(prev => {
      const currentList = prev[permissionType] || [];
      if (currentList.includes(memberId)) {
        return { ...prev, [permissionType]: currentList.filter(id => id !== memberId) };
      } else {
        return { ...prev, [permissionType]: [...currentList, memberId] };
      }
    });
  };

  const currentStartup = startupData[selectedStartup];

  return (
    <>
      <Helmet>
        <title>{t('dataRoom')} - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{t('dataRoom')}</h1>
              <div className="flex items-center space-x-4">
                <Select value={selectedStartup} onValueChange={setSelectedStartup}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select a startup" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(startupData).map(name => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => setIsUploadModalOpen(true)}>
                  <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  Upload Document
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-effect">
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                        {currentStartup.logo}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{selectedStartup}</CardTitle>
                      <CardDescription>{currentStartup.description}</CardDescription>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">{currentStartup.connectionStatus}</Badge>
                        <LinkIcon className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Document Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {currentStartup.documents.map(doc => (
                        <div key={doc.id} className="flex items-center p-2 rounded-lg hover:bg-gray-800/50">
                          <FileText className="w-5 h-5 mr-3 rtl:mr-0 rtl:ml-3 text-blue-400" />
                          <div className="flex-1">
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-gray-400">
                              Modified {doc.modified} • {doc.size}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {getDocBadge(doc.ndaStatus)}
                            {doc.ndaStatus === 'required' && (
                              <Button size="sm" variant="outline" onClick={() => handleNdaRequest(doc)}>
                                <FileLock className="w-4 h-4 mr-2" /> Request NDA
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleAction('Document', 'View')} disabled={doc.ndaStatus === 'required'}><Eye className="w-4 h-4 mr-2"/>View</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction('Document', 'Download')} disabled={doc.ndaStatus === 'required'}><Download className="w-4 h-4 mr-2"/>Download</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Lock className="w-5 h-5" />
                      <span>Permissions Panel</span>
                    </CardTitle>
                    <CardDescription>Manage access for {selectedStartup}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Eye className="w-4 h-4 mr-2"/> View Access</span>
                      <Button variant="outline" size="sm" onClick={() => handleManagePermissions('Viewers')}>Manage</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Download className="w-4 h-4 mr-2"/> Download Rights</span>
                      <Button variant="outline" size="sm" onClick={() => handleManagePermissions('Downloaders')}>Manage</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-2"/> Commenting</span>
                      <Button variant="outline" size="sm" onClick={() => handleManagePermissions('Commenters')}>Manage</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Dialog open={isNdaModalOpen} onOpenChange={setIsNdaModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request NDA for Document Access</DialogTitle>
                  <DialogDescription>
                    You are requesting access to "{selectedDoc?.name}". Please add a personal message to the founder.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="nda-message">Personal Message (Optional)</Label>
                  <Textarea id="nda-message" placeholder="e.g., 'Hi, we are very interested in your financials to proceed with our evaluation. Looking forward to reviewing the document.'" />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNdaModalOpen(false)}>Cancel</Button>
                  <Button onClick={sendNdaRequest}>Send Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isPermissionsModalOpen} onOpenChange={setIsPermissionsModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manage {permissionType}</DialogTitle>
                  <DialogDescription>
                    Grant or revoke access for your team members for {selectedStartup}.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Add user by email..." />
                    <Button><UserPlus className="w-4 h-4 mr-2"/> Invite</Button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {teamMembers.map(member => (
                      <div key={member.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-gray-400">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {(permissions[permissionType] || []).includes(member.id) ? (
                            <Button size="sm" variant="secondary" onClick={() => togglePermission(member.id)}>
                              <Trash2 className="w-4 h-4 mr-2"/> Remove
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => togglePermission(member.id)}>
                              <UserPlus className="w-4 h-4 mr-2"/> Add
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPermissionsModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => {
                    toast({ title: 'Permissions Updated!' });
                    setIsPermissionsModalOpen(false);
                  }}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                  <DialogDescription>Upload a business or personal document to the data room for {selectedStartup}.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="docType" className="text-right">Document Type</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Business Document</SelectItem>
                        <SelectItem value="personal">Personal Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="docUpload" className="text-right">File</Label>
                    <div className="col-span-3">
                      <Button asChild variant="outline">
                        <label htmlFor="docUpload" className="cursor-pointer w-full">
                          <Upload className="mr-2 h-4 w-4" />
                          {uploadFileName || 'Choose a file'}
                          <Input id="docUpload" type="file" className="hidden" onChange={handleUploadFileChange} />
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleUploadSubmit}>Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </main>
        </div>
      </div>
    </>
  );
};

export default DataRoomPage;