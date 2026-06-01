import { Lead } from "@/features/dashboard/pages/leads/types/lead";

export const mockLeads: Lead[] = [
  {
    id: "a1b2c3d4-1234-5678-9012-abcdef123456",
    leadNumber: "RDV-2026-001",
    fullName: "Yasmin Belkacem",
    email: "y.belkacem@equilibre.dz",
    phone: "+213 550 12 34 56",
    company: "Stress & Baby Blues",
    value: 3500,
    status: "qualified",
    date: "2026-06-12T14:00:00Z",
    source: "website",
  },
  {
    id: "b2c3d4e5-2345-6789-0123-bcdef234567",
    leadNumber: "RDV-2026-002",
    fullName: "Sofiane Merah",
    email: "s.merah@equilibre.dz",
    phone: "+213 661 23 45 67",
    company: "Couple (Compatibilité)",
    value: 5000,
    status: "contacted",
    date: "2026-06-15T11:30:00Z",
    source: "referral",
  },
  {
    id: "c3d4e5f6-3456-7890-1234-cdef345678",
    leadNumber: "RDV-2026-003",
    fullName: "Ryma Khelifi",
    email: "r.khelifi@equilibre.dz",
    phone: "+213 770 34 56 78",
    company: "Anxiété (Étudiante)",
    value: 2500,
    status: "new",
    date: "2026-06-18T10:30:00Z",
    source: "website",
  }
];