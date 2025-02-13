import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileData {
  Authorized: boolean;
  UserGUID: string;
  User: string;
  OrganizationGUID: string;
  Organization: string;
  PointOfSaleGUID: string;
  PointOfSale: string;
  CashRegisterGUID: string;
  CashRegister: string;
  Description: string;
}

interface ProfileContextType {
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData) => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType>({
  profileData: null,
  setProfileData: () => {},
  clearProfile: () => {},
});

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const clearProfile = () => setProfileData(null);

  return (
    <ProfileContext.Provider value={{ 
      profileData,
      setProfileData: (data: ProfileData) => setProfileData(data),
      clearProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
}
export default ProfileProvider;

export const useProfile = () => useContext(ProfileContext);
