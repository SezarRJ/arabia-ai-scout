import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const allFeatures = [
    { id: 'profile', label: 'Profile Creation' },
    { id: 'ai_reports', label: 'Full AI Reports' },
    { id: 'data_room', label: 'Data Room Access' },
    { id: 'unlimited_browse', label: 'Unlimited Browsing' },
    { id: 'events', label: 'Event Access' },
    { id: 'featured_badge', label: 'Featured Badge' },
    { id: 'success_coach', label: 'Success Coach' },
    { id: 'priority_flow', label: 'Priority Deal Flow' },
    { id: 'account_manager', label: 'Account Manager' },
];

const initialFounderPlans = [
    { name: 'Free', price: '$0/mo', features: ['profile'] },
    { name: 'Pro', price: '$49/mo', features: ['profile', 'ai_reports', 'data_room'] },
    { name: 'Premium', price: '$99/mo', features: ['profile', 'ai_reports', 'data_room', 'featured_badge', 'success_coach'] },
];

const initialInvestorPlans = [
    { name: 'Free', price: '$0/mo', features: ['profile'] },
    { name: 'Pro', price: '$149/mo', features: ['profile', 'unlimited_browse', 'data_room', 'events', 'ai_reports'] },
    { name: 'Elite', price: '$299/mo', features: ['profile', 'unlimited_browse', 'data_room', 'events', 'ai_reports', 'priority_flow', 'account_manager'] },
];

const PlanCard = ({ name, price, features, onEdit }) => {
    return (
        <Card className="glass-effect flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={onEdit}>
                        <Edit className="h-4 w-4" />
                    </Button>
                </div>
                <CardDescription className="text-3xl font-bold">{price}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <ul className="space-y-2">
                    {allFeatures.map((feature) => (
                        <li key={feature.id} className={`flex items-start ${features.includes(feature.id) ? '' : 'text-muted-foreground line-through'}`}>
                            <CheckCircle className={`h-5 w-5 mr-2 mt-1 flex-shrink-0 ${features.includes(feature.id) ? 'text-green-400' : 'text-gray-600'}`} />
                            <span>{feature.label}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

const AdminSubscriptionPlans = () => {
    const { toast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [founderPlans, setFounderPlans] = useState(initialFounderPlans);
    const [investorPlans, setInvestorPlans] = useState(initialInvestorPlans);

    const handleEdit = (plan, type) => {
        setSelectedPlan({ ...plan, type });
        setIsModalOpen(true);
    };

    const handleSaveChanges = () => {
        if (!selectedPlan) return;

        const plans = selectedPlan.type === 'founder' ? founderPlans : investorPlans;
        const setPlans = selectedPlan.type === 'founder' ? setFounderPlans : setInvestorPlans;

        const updatedPlans = plans.map(p => p.name === selectedPlan.name ? selectedPlan : p);
        setPlans(updatedPlans);

        toast({ title: "Plan Updated", description: `${selectedPlan.name} plan has been successfully updated.` });
        setIsModalOpen(false);
        setSelectedPlan(null);
    };

    const handleFeatureToggle = (featureId) => {
        setSelectedPlan(prev => {
            const newFeatures = prev.features.includes(featureId)
                ? prev.features.filter(id => id !== featureId)
                : [...prev.features, featureId];
            return { ...prev, features: newFeatures };
        });
    };

    return (
        <>
            <Helmet>
                <title>Subscription Plans - Admin Panel</title>
            </Helmet>
            <div className="min-h-screen flex">
                <Sidebar />
                <div className="flex-1">
                    <Header />
                    <main className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold">Subscription Plans Management</h1>
                            <Button onClick={() => toast({ title: "Feature not implemented" })}><PlusCircle className="mr-2 h-4 w-4" /> Add New Plan</Button>
                        </div>
                        <Tabs defaultValue="founders">
                            <TabsList className="mb-4">
                                <TabsTrigger value="founders">Founder Plans</TabsTrigger>
                                <TabsTrigger value="investors">Investor Plans</TabsTrigger>
                            </TabsList>
                            <TabsContent value="founders">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {founderPlans.map(plan => <PlanCard key={plan.name} {...plan} onEdit={() => handleEdit(plan, 'founder')} />)}
                                </div>
                            </TabsContent>
                            <TabsContent value="investors">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {investorPlans.map(plan => <PlanCard key={plan.name} {...plan} onEdit={() => handleEdit(plan, 'investor')} />)}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Plan: {selectedPlan?.name}</DialogTitle>
                        <DialogDescription>Customize the features available in this plan.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 grid grid-cols-2 gap-4">
                        {allFeatures.map(feature => (
                            <div key={feature.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`feature-${feature.id}`}
                                    checked={selectedPlan?.features.includes(feature.id)}
                                    onCheckedChange={() => handleFeatureToggle(feature.id)}
                                />
                                <Label htmlFor={`feature-${feature.id}`}>{feature.label}</Label>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AdminSubscriptionPlans;