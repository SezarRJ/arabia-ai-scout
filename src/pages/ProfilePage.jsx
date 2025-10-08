import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Save, Upload, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const { user, updateUserMetadata, uploadAvatar } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    email: user?.email || '',
    avatar_url: user?.user_metadata?.avatar_url || '',
    country: user?.user_metadata?.country || '',
    city: user?.user_metadata?.city || '',
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { error } = await updateUserMetadata({ 
      first_name: formData.firstName, 
      last_name: formData.lastName,
      country: formData.country,
      city: formData.city,
    });
    
    if (error) {
      toast({
        title: t('error'),
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: t('success'),
        description: t('Profile updated successfully.'),
      });
      setIsEditing(false);
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const { data, error } = await uploadAvatar(file);

    if (error) {
      toast({
        title: 'Upload Error',
        description: error.message,
        variant: 'destructive',
      });
    } else if (data) {
      setFormData(prev => ({ ...prev, avatar_url: data.avatar_url }));
      toast({
        title: 'Avatar Updated!',
        description: 'Your new profile picture has been saved.',
      });
    }
    setUploading(false);
  };

  return (
    <>
      <Helmet>
        <title>{t('myProfile')} - SharkVest</title>
        <meta name="description" content={t('manageProfile')} />
      </Helmet>

      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <h1 className="text-3xl font-bold mb-6">{t('profile')}</h1>
            
            <Card className="glass-effect">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>{t('personalInformation')}</CardTitle>
                <Button variant="ghost" size="icon" onClick={isEditing ? handleSave : handleEditToggle}>
                  {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={formData.avatar_url} alt={formData.firstName} />
                      <AvatarFallback className="text-3xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {formData.firstName?.[0]}{formData.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarUpload}
                      className="hidden"
                      accept="image/*"
                      disabled={uploading}
                    />
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                      onClick={() => fileInputRef.current.click()}
                      disabled={uploading}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{formData.firstName} {formData.lastName}</h2>
                    <p className="text-gray-400">{formData.email}</p>
                    <p className="text-sm text-blue-400 capitalize">{t(user?.user_metadata?.role)}</p>
                    {(formData.city || formData.country) && (
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {formData.city}{formData.city && formData.country ? ', ' : ''}{formData.country}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-400">{t('firstName')}</label>
                    <Input name="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">{t('lastName')}</label>
                    <Input name="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">{t('email')}</label>
                    <Input name="email" type="email" value={formData.email} disabled />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Country</label>
                    <Input name="country" value={formData.country} onChange={handleChange} disabled={!isEditing} placeholder="e.g., UAE" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">City</label>
                    <Input name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} placeholder="e.g., Dubai" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;