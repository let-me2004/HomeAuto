export interface Device {
  id: string;
  name: string;
  type: 'light' | 'door' | 'camera' | 'sprinkler' | 'sensor';
  status: 'on' | 'off' | 'locked' | 'unlocked' | 'active' | 'inactive';
  room: string;
  lastUpdated: string;
}

export interface SecurityLog {
  id: string;
  type: 'motion' | 'smoke' | 'door';
  location: string;
  timestamp: string;
  description: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
  preferences: {
    darkMode: boolean;
  };
}