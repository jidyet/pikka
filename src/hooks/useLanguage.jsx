import { useState, useEffect } from 'react';

// Define the translation dictionary
const translations = {
  en: {
    dashboard: "Dashboard",
    myAccount: "My Account",
    usage: "Usage",
    linkedAccounts: "Accounts",
    upgrade: "Upgrade",
    selectPlan: "Select Plan",
    continue: "Continue",
    billingInfo: "Billing Information",
    manageBilling: "Manage Billing",
    settings: "Settings",
    emailNotifications: "Email Notifications",
    language: "Language",
  },
  es: {
    dashboard: "Tablero",
    myAccount: "Mi Cuenta",
    usage: "Uso",
    linkedAccounts: "Cuentas",
    upgrade: "Actualizar",
    selectPlan: "Seleccionar Plan",
    continue: "Continuar",
    billingInfo: "Información de Facturación",
    manageBilling: "Administrar Facturación",
    settings: "Configuraciones",
    emailNotifications: "Notificaciones por Correo",
    language: "Idioma",
  },
  de: {
    dashboard: "Übersicht",
    myAccount: "Mein Konto",
    usage: "Nutzung",
    linkedAccounts: "Konten",
    upgrade: "Aktualisieren",
    selectPlan: "Plan auswählen",
    continue: "Fortsetzen",
    billingInfo: "Abrechnungsinformationen",
    manageBilling: "Abrechnung verwalten",
    settings: "Einstellungen",
    emailNotifications: "E-Mail-Benachrichtigungen",
    language: "Sprache",
  },
  zh: {
    dashboard: "仪表盘",
    myAccount: "我的账户",
    usage: "使用情况",
    linkedAccounts: "账户",
    upgrade: "升级",
    selectPlan: "选择计划",
    continue: "继续",
    billingInfo: "账单信息",
    manageBilling: "管理账单",
    settings: "设置",
    emailNotifications: "电子邮件通知",
    language: "语言",
  },
  fr: {
    dashboard: "Tableau de bord",
    myAccount: "Mon Compte",
    usage: "Utilisation",
    linkedAccounts: "Comptes",
    upgrade: "Améliorer",
    selectPlan: "Sélectionner un Plan",
    continue: "Continuer",
    billingInfo: "Informations de Facturation",
    manageBilling: "Gérer la Facturation",
    settings: "Paramètres",
    emailNotifications: "Notifications par E-mail",
    language: "Langue",
  }
};

// Create a custom hook
export function useLanguage() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('language');
    if (stored) setLanguage(stored);
  }, []);

  const changeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  const t = translations[language] || translations.en;

  return { language, changeLanguage, t };
}
