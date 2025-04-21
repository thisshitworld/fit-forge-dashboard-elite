
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.50706edffee74973b3931c91d7e50bb8',
  appName: 'fit-forge-dashboard-elite',
  webDir: 'dist',
  server: {
    url: 'https://50706edf-fee7-4973-b393-1c91d7e50bb8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      releaseType: 'APK'
    }
  }
};

export default config;
