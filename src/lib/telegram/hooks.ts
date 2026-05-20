'use client';

// Dummy hooks for Telegram WebApp to bypass build errors
// We rely on window.Telegram?.WebApp directly when needed

export const useHaptic = () => ({
  impactOccurred: (style: string) => {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.HapticFeedback) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred(style);
    }
  }
});

export const useThemeParams = () => {
  if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.themeParams) {
    return (window as any).Telegram.WebApp.themeParams;
  }
  return {};
};

export const useBackButton = () => {
  return {
    show: () => { if (typeof window !== 'undefined') (window as any).Telegram?.WebApp?.BackButton?.show(); },
    hide: () => { if (typeof window !== 'undefined') (window as any).Telegram?.WebApp?.BackButton?.hide(); },
    on: (event: string, callback: any) => {
      if (typeof window !== 'undefined') (window as any).Telegram?.WebApp?.BackButton?.onClick(callback);
    },
    off: (event: string, callback: any) => {
      if (typeof window !== 'undefined') (window as any).Telegram?.WebApp?.BackButton?.offClick(callback);
    }
  };
};

export const useMainButton = () => ({
  show: () => {},
  hide: () => {},
  setText: () => {},
  onClick: () => {},
  offClick: () => {},
  showProgress: () => {},
  hideProgress: () => {},
  enable: () => {},
  disable: () => {},
});

export const useInitData = () => {
  if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initData) {
    return (window as any).Telegram.WebApp.initData;
  }
  return null;
};

export const useLaunchParams = () => ({});

export const useMiniApp = () => ({
  close: () => {
    if (typeof window !== 'undefined') (window as any).Telegram?.WebApp?.close();
  }
});
