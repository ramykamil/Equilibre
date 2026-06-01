export type CustomerStatus = 'active' | 'inactive' | 'pending' | 'blocked';

export interface Customer {
  id: string;
  dossierNumber: string;
  fullName: string;
  email: string;
  phone: string;
  secureHash: string; // Encoded unique verification code
  doctorSharingAuthorized: boolean; // Permission to share dossier with doctor
  problemType: string; // e.g. "Anxiété", "Couple/Futurs Mariés", "Stress Post-Partum"
  psychometricScore: string; // e.g. "Élevé (82/100)", "Modéré"
  status: CustomerStatus;
  dateJoined: string;
  lastSession: string; // Last consultation date
  location: string;
}

export interface CustomerFilters {
  status: CustomerStatus | 'all';
  search: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}