import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Trash2, Edit, BookOpen, Upload, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { translations as allTranslations } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';

const initialLanguages = [
  { id: 'en', name: 'English', flag: '🇺🇸', status: 'Active', translations: allTranslations.en },
  { id: 'ar', name: 'Arabic', flag: '🇸🇦', status: 'Active', translations: allTranslations.ar },
  { id: 'tr', name: 'Turkish', flag: '🇹🇷', status: 'Active', translations: allTranslations.tr },
  { id: 'ckb', name: 'Kurdish (Sorani)', flag: '🏴', status: 'Active', translations: allTranslations.ckb },
  { id: 'fr', name: 'French', flag: '🇫🇷', status: 'Inactive', translations: {} },
];

const AdminLanguages = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [languages, setLanguages] = useState(initialLanguages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTranslationsModalOpen, setIsTranslationsModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [translations, setTranslations] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef(null);

  const handleAddOrEdit = (lang) => {
    setCurrentLanguage(lang || { id: '', name: '', flag: '', status: 'Inactive', translations: {} });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setLanguages(languages.filter(lang => lang.id !== id));
    toast({ title: 'Language Removed' });
  };

  const handleSave = () => {
    if (currentLanguage.id && currentLanguage.name) {
      const isEditing = languages.some(l => l.id === currentLanguage.id);
      if (isEditing) {
        setLanguages(languages.map(l => l.id === currentLanguage.id ? currentLanguage : l));
        toast({ title: 'Language Updated' });
      } else {
        setLanguages([...languages, currentLanguage]);
        toast({ title: 'Language Added' });
      }
      setIsModalOpen(false);
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Language code and name are required.' });
    }
  };

  const openTranslationsModal = (lang) => {
    setCurrentLanguage(lang);
    setTranslations(lang.translations || {});
    setIsTranslationsModalOpen(true);
  };

  const handleTranslationChange = (key, value) => {
    setTranslations(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveTranslations = () => {
    setLanguages(languages.map(l => l.id === currentLanguage.id ? { ...l, translations } : l));
    toast({ title: t('saveTranslations') });
    setIsTranslationsModalOpen(false);
  };

  const handleDownloadJson = () => {
    if (!currentLanguage) return;
    const content = JSON.stringify(translations, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentLanguage.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: t('downloadJson'), description: `${currentLanguage.name} translations downloaded.` });
  };

  const handleUploadJson = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const newTranslations = JSON.parse(e.target.result);
          setTranslations(newTranslations);
          toast({ title: 'File loaded successfully!', description: 'Review the new translations and click Save.' });
        } catch (error) {
          toast({ variant: 'destructive', title: 'Invalid JSON File', description: 'The uploaded file could not be parsed.' });
        }
      };
      reader.onerror = () => {
        toast({ variant: 'destructive', title: 'File Read Error', description: 'There was an error reading the file.' });
      };
      reader.readAsText(file);
    }
    event.target.value = null;
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const masterTranslationKeys = Object.keys(allTranslations.en).filter(key => 
    key.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (allTranslations.en[key] || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>{t('languageManagement')} - {t('admin')}</title>
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
                    <CardTitle>{t('languageManagement')}</CardTitle>
                    <CardDescription>{t('addEditRemoveLanguages')}</CardDescription>
                  </div>
                  <Button onClick={() => handleAddOrEdit(null)}><PlusCircle className="mr-2 h-4 w-4" /> {t('addLanguage')}</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('language')}</TableHead>
                      <TableHead>{t('code')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {languages.map((lang) => (
                      <TableRow key={lang.id}>
                        <TableCell className="font-medium">{lang.flag} {lang.name}</TableCell>
                        <TableCell>{lang.id}</TableCell>
                        <TableCell>{t(lang.status.toLowerCase())}</TableCell>
                        <TableCell className="space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => openTranslationsModal(lang)}><BookOpen className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleAddOrEdit(lang)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(lang.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
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
            <DialogTitle>{currentLanguage?.id ? t('editLanguage') : t('addLanguage')}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div><Label htmlFor="lang-name">{t('languageName')}</Label><Input id="lang-name" value={currentLanguage?.name || ''} onChange={(e) => setCurrentLanguage({ ...currentLanguage, name: e.target.value })} /></div>
            <div><Label htmlFor="lang-id">{t('languageCode')}</Label><Input id="lang-id" value={currentLanguage?.id || ''} onChange={(e) => setCurrentLanguage({ ...currentLanguage, id: e.target.value })} disabled={!!currentLanguage?.name && currentLanguage.id !== ''} /></div>
            <div><Label htmlFor="lang-flag">{t('flagEmoji')}</Label><Input id="lang-flag" value={currentLanguage?.flag || ''} onChange={(e) => setCurrentLanguage({ ...currentLanguage, flag: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>{t('cancel')}</Button>
            <Button onClick={handleSave}>{t('save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTranslationsModalOpen} onOpenChange={setIsTranslationsModalOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{t('manageTranslationsFor')} {currentLanguage?.name}</DialogTitle>
            <div className="flex justify-between items-center pt-2">
              <Input 
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={handleDownloadJson}><Download className="mr-2 h-4 w-4" /> {t('downloadJson')}</Button>
                <Button variant="outline" onClick={triggerFileUpload}><Upload className="mr-2 h-4 w-4" /> {t('uploadJson')}</Button>
                <input type="file" ref={fileInputRef} onChange={handleUploadJson} accept=".json" className="hidden" />
              </div>
            </div>
          </DialogHeader>
          <div className="py-4 flex-grow overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">{t('translationKey')}</TableHead>
                  <TableHead className="w-2/3">{t('translationValue')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {masterTranslationKeys.map((key) => (
                  <TableRow key={key}>
                    <TableCell>
                      <Label htmlFor={`trans-${key}`} className="text-xs text-muted-foreground">{key}</Label>
                      <p className="font-mono text-sm">{allTranslations.en[key]}</p>
                    </TableCell>
                    <TableCell>
                      <Input id={`trans-${key}`} value={translations[key] || ''} onChange={(e) => handleTranslationChange(key, e.target.value)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTranslationsModalOpen(false)}>{t('cancel')}</Button>
            <Button onClick={handleSaveTranslations}>{t('saveTranslations')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminLanguages;