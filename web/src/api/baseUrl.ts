declare global {
  interface Window {
    baseUrl?: string;
    apiHost?: string;
  }
}

export const baseUrl =
  window.apiHost ||
  `${window.location.protocol}//${window.location.host}${window.baseUrl || "/"}`;
