import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "CornFrontend",
  webDir: "build",
  server: {
    androidScheme: "http", // Use 'http' during development
    iosScheme: "https",
    cleartext: true, // Allow HTTP on Android (for development)
  },
};

export default config;
