import {
  SquareTerminal,
  Users,
  FileText,
  BarChart,
  Settings2,
  LifeBuoy,
  Send,
  Frame,
  PieChart,
  Map,
  HandCoins,
} from "lucide-react";

export const sidebarMenus = {
  user: {
    name: "Dr. Sophie Martin",
    email: "sophie.martin@equilibre.fr",
    avatar: "/avatars/avatar.png",
  },
  navMain: [
    {
      title: "Tableau de Bord",
      url: "/dashboard/overview",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Vue d'ensemble",
          url: "/dashboard/overview",
        },
        {
          title: "Journaux d'activité",
          url: "/dashboard/activity-logs",
        },
      ],
    },
    {
      title: "Rendez-vous",
      url: "/dashboard/leads",
      icon: HandCoins,
      items: [
        {
          title: "Tous les RDV",
          url: "/dashboard/leads",
        },
        {
          title: "Calendrier Interactif",
          url: "/dashboard/leads/calendar",
        },
        {
          title: "Consultations en attente",
          url: "/dashboard/leads/pending",
        },
      ],
    },
    {
      title: "Patients (Dossiers)",
      url: "/dashboard/customers",
      icon: Users,
      items: [
        {
          title: "Dossiers Codés",
          url: "/dashboard/customers",
        },
        {
          title: "Partages (Médecin)",
          url: "/dashboard/customers/segments",
        },
        {
          title: "Tests Psychométriques",
          url: "/dashboard/customers/tests",
        },
      ],
    },
    {
      title: "Facturation",
      url: "/dashboard/invoices",
      icon: FileText,
      items: [
        {
          title: "Toutes les Factures",
          url: "/dashboard/invoices",
        },
        {
          title: "Paiements en attente",
          url: "/dashboard/invoices/pending",
        },
        {
          title: "Séances Réglées",
          url: "/dashboard/invoices/paid",
        },
      ],
    },
    {
      title: "Analyses & Suivi",
      url: "/dashboard/reports/sales",
      icon: BarChart,
      items: [
        {
          title: "Statistiques de consultation",
          url: "/dashboard/reports/sales",
        },
        {
          title: "Suivi d'Humeur",
          url: "/dashboard/reports/moods",
        },
        {
          title: "Objectifs Patients",
          url: "/dashboard/reports/goals",
        },
      ],
    },
    {
      title: "Configuration",
      url: "/dashboard/settings/general",
      icon: Settings2,
      items: [
        {
          title: "Général",
          url: "/dashboard/settings/general",
        },
        {
          title: "Accès & 2FA",
          url: "/dashboard/settings/users",
        },
        {
          title: "Intégrations (HDS/HIPAA)",
          url: "/dashboard/settings/integrations",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Aide & Urgence (Chatbot)",
      url: "/dashboard/support",
      icon: LifeBuoy,
    },
    {
      title: "Retours d'expérience",
      url: "/dashboard/feedback",
      icon: Send,
    },
  ],
  workspaces: [
    {
      name: "Espace Professionnel",
      url: "/dashboard/customers",
      icon: Frame,
    },
    {
      name: "Espace Patient",
      url: "/dashboard/overview",
      icon: PieChart,
    },
  ],
};
