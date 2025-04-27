import React, { createContext, useContext, useState, useEffect } from 'react';

// Full updated translation dictionary
const translations = {
  en: {
    dashboard: "Dashboard",
    myAccount: "My Account",
    usage: "Usage",
    linkedAccounts: "Accounts",
    upgrade: "Upgrade",
    selectPlan: "Select Plan",
    billingInfo: "Billing Information",
    manageBilling: "Manage Billing",
    settings: "Settings",
    emailNotifications: "Email Notifications",
    language: "Language",
    continue: "Continue",
    enabled: "Enabled",
    disabled: "Disabled",
    logout: "Logout",
    toggleTheme: "Toggle Theme",
    goToDashboard: "Go to Dashboard",
    checkingAccount: "Checking your account...",
    welcomeMessage: "Let's get started managing your account!",
    connected: "Connected",
    disconnected: "Disconnected",
    choosePlan: "Choose Plan",
    upgradePlan: "Upgrade Your Plan",
    loading: "Loading...",
    yourCurrentPlan: "Your current plan:",
    noSubscription: "You have no active subscription.",
    weeklyUsage: "Weekly Usage Chart",
    dailyActions: "Daily Actions",
    recentActivity: "Recent Activity",
    time: "Time",
    action: "Action",
    status: "Status",
    success: "Success",
    pending: "Pending",
    userName: "Kristina Davis",
    userEmail: "kristina@email.com"
  },
  es: {
    dashboard: "Tablero",
    myAccount: "Mi Cuenta",
    usage: "Uso",
    linkedAccounts: "Cuentas",
    upgrade: "Actualizar",
    selectPlan: "Seleccionar Plan",
    billingInfo: "Información de Facturación",
    manageBilling: "Administrar Facturación",
    settings: "Configuraciones",
    emailNotifications: "Notificaciones por Correo",
    language: "Idioma",
    continue: "Continuar",
    enabled: "Habilitado",
    disabled: "Deshabilitado",
    logout: "Cerrar sesión",
    toggleTheme: "Cambiar Tema",
    goToDashboard: "Ir al Tablero",
    checkingAccount: "Verificando tu cuenta...",
    welcomeMessage: "¡Comencemos a administrar tu cuenta!",
    connected: "Conectado",
    disconnected: "Desconectado",
    choosePlan: "Elegir Plan",
    upgradePlan: "Actualizar tu Plan",
    loading: "Cargando...",
    yourCurrentPlan: "Tu plan actual:",
    noSubscription: "No tienes una suscripción activa.",
    weeklyUsage: "Gráfico de Uso Semanal",
    dailyActions: "Acciones Diarias",
    recentActivity: "Actividad Reciente",
    time: "Hora",
    action: "Acción",
    status: "Estado",
    success: "Éxito",
    pending: "Pendiente",
    userName: "Kristina Davis",
    userEmail: "kristina@email.com"
  },
  fr: {
    dashboard: "Tableau de bord",
    myAccount: "Mon Compte",
    usage: "Utilisation",
    linkedAccounts: "Comptes",
    upgrade: "Améliorer",
    selectPlan: "Sélectionner un Plan",
    billingInfo: "Informations de Facturation",
    manageBilling: "Gérer la Facturation",
    settings: "Paramètres",
    emailNotifications: "Notifications par E-mail",
    language: "Langue",
    continue: "Continuer",
    enabled: "Activé",
    disabled: "Désactivé",
    logout: "Se Déconnecter",
    toggleTheme: "Changer le Thème",
    goToDashboard: "Aller au Tableau",
    checkingAccount: "Vérification de votre compte...",
    welcomeMessage: "Commençons à gérer votre compte!",
    connected: "Connecté",
    disconnected: "Déconnecté",
    choosePlan: "Choisir le Plan",
    upgradePlan: "Améliorer votre Plan",
    loading: "Chargement...",
    yourCurrentPlan: "Votre plan actuel:",
    noSubscription: "Vous n'avez pas d'abonnement actif.",
    weeklyUsage: "Graphique d'Utilisation Hebdomadaire",
    dailyActions: "Actions Quotidiennes",
    recentActivity: "Activité Récente",
    time: "Temps",
    action: "Action",
    status: "Statut",
    success: "Succès",
    pending: "En attente",
    userName: "Kristina Davis",
    userEmail: "kristina@email.com"
  },
  de: {
    dashboard: "Übersicht",
    myAccount: "Mein Konto",
    usage: "Nutzung",
    linkedAccounts: "Konten",
    upgrade: "Aktualisieren",
    selectPlan: "Plan auswählen",
    billingInfo: "Abrechnungsinformationen",
    manageBilling: "Abrechnung verwalten",
    settings: "Einstellungen",
    emailNotifications: "E-Mail-Benachrichtigungen",
    language: "Sprache",
    continue: "Fortsetzen",
    enabled: "Aktiviert",
    disabled: "Deaktiviert",
    logout: "Abmelden",
    toggleTheme: "Thema wechseln",
    goToDashboard: "Zum Dashboard",
    checkingAccount: "Überprüfe dein Konto...",
    welcomeMessage: "Lass uns anfangen, dein Konto zu verwalten!",
    connected: "Verbunden",
    disconnected: "Getrennt",
    choosePlan: "Plan wählen",
    upgradePlan: "Plan aktualisieren",
    loading: "Laden...",
    yourCurrentPlan: "Dein aktueller Plan:",
    noSubscription: "Du hast kein aktives Abonnement.",
    weeklyUsage: "Wöchentliche Nutzungsstatistik",
    dailyActions: "Tägliche Aktionen",
    recentActivity: "Letzte Aktivität",
    time: "Zeit",
    action: "Aktion",
    status: "Status",
    success: "Erfolg",
    pending: "Ausstehend",
    userName: "Kristina Davis",
    userEmail: "kristina@email.com"
  },
  zh: {
    dashboard: "仪表盘",
    myAccount: "我的账户",
    usage: "使用情况",
    linkedAccounts: "账户",
    upgrade: "升级",
    selectPlan: "选择计划",
    billingInfo: "账单信息",
    manageBilling: "管理账单",
    settings: "设置",
    emailNotifications: "电子邮件通知",
    language: "语言",
    continue: "继续",
    enabled: "启用",
    disabled: "禁用",
    logout: "登出",
    toggleTheme: "切换主题",
    goToDashboard: "转到仪表盘",
    checkingAccount: "正在验证您的账户...",
    welcomeMessage: "让我们开始管理您的账户！",
    connected: "已连接",
    disconnected: "已断开",
    choosePlan: "选择计划",
    upgradePlan: "升级您的计划",
    loading: "加载中...",
    yourCurrentPlan: "您当前的计划：",
    noSubscription: "您没有有效的订阅。",
    weeklyUsage: "每周使用图表",
    dailyActions: "每日操作",
    recentActivity: "最近活动",
    time: "时间",
    action: "操作",
    status: "状态",
    success: "成功",
    pending: "待定",
    userName: "Kristina Davis",
    userEmail: "kristina@email.com"
  }
};

// Create Language Context
const LanguageContext = createContext();

// Language Provider
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('language');
    if (stored) {
      setLanguage(stored);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (['en', 'es', 'fr', 'de', 'zh'].includes(browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);

  const changeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom Hook to use language
export function useLanguage() {
  return useContext(LanguageContext);
}
