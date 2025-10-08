import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('sharkvest-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const calculateTrustScore = (profileComplete, verified, engagementQuality, aiProfileStrength) => {
    const completenessScore = (profileComplete / 100) * 25;
    const verificationScore = verified ? 30 : 0;
    const engagementScore = (engagementQuality / 100) * 20; // Mock value
    const aiProfileStrengthScore = (aiProfileStrength / 100) * 25; // Mock value
    return Math.min(Math.round(completenessScore + verificationScore + engagementScore + aiProfileStrengthScore), 100);
  };

  const login = async (email, password) => {
    // Mock login - in real app, this would call an API
    let mockUser;
    
    // Simple logic to log in as different user types
    if (email.startsWith('founder')) {
      mockUser = { userType: 'founder', firstName: 'Aisha', lastName: 'Al-Fulan' };
    } else if (email.startsWith('investor')) {
      mockUser = { userType: 'investor', firstName: 'Khalid', lastName: 'Al-Saud' };
    } else if (email.startsWith('provider')) {
        mockUser = { userType: 'serviceProvider', firstName: 'Fatima', lastName: 'Consulting' };
    } else if (email.startsWith('admin')) {
        mockUser = { userType: 'admin', firstName: 'Admin', lastName: 'User' };
    } else {
        mockUser = { userType: 'founder', firstName: 'Ahmed', lastName: 'Al-Rashid' };
    }

    const fullUser = {
      id: '1',
      email,
      ...mockUser,
      verified: true,
      profileComplete: 75,
      engagementQuality: 80, // on a scale of 0-100
      aiProfileStrength: 85, // on a scale of 0-100,
      linkedInConnected: false,
    };
    fullUser.trustScore = calculateTrustScore(fullUser.profileComplete, fullUser.verified, fullUser.engagementQuality, fullUser.aiProfileStrength);
    
    setUser(fullUser);
    localStorage.setItem('sharkvest-user', JSON.stringify(fullUser));
    return fullUser;
  };

  const register = async (userData) => {
    // Mock registration - in real app, this would call an API
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      verified: false,
      profileComplete: 30,
      engagementQuality: 20,
      aiProfileStrength: 30,
      linkedInConnected: false,
    };
    newUser.trustScore = calculateTrustScore(newUser.profileComplete, newUser.verified, newUser.engagementQuality, newUser.aiProfileStrength);
    
    setUser(newUser);
    localStorage.setItem('sharkvest-user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sharkvest-user');
  };

  const deleteAccount = () => {
    setUser(null);
    localStorage.removeItem('sharkvest-user');
    // In a real app, you would also make an API call to delete the user from the backend.
  };

  const updateUser = (updates) => {
    const baseUser = user || {};
    const updatedUser = { ...baseUser, ...updates };
    
    // Recalculate trust score if relevant fields change
    updatedUser.trustScore = calculateTrustScore(
        updatedUser.profileComplete, 
        updatedUser.verified, 
        updatedUser.engagementQuality, 
        updatedUser.aiProfileStrength
    );

    setUser(updatedUser);
    localStorage.setItem('sharkvest-user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      deleteAccount,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};