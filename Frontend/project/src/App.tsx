import React, { useState } from 'react';
import Layout from './components/Layout';
import DeviceCard from './components/DeviceCard';
import SecurityLog from './components/SecurityLog';
import { Device, SecurityLog as SecurityLogType } from './types';
import { Camera, ShieldAlert } from 'lucide-react';

function App() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Living Room Light',
      type: 'light',
      status: 'on',
      room: 'Living Room',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Front Door',
      type: 'door',
      status: 'locked',
      room: 'Entrance',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Garden Camera',
      type: 'camera',
      status: 'active',
      room: 'Garden',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Garden Sprinkler',
      type: 'sprinkler',
      status: 'off',
      room: 'Garden',
      lastUpdated: new Date().toISOString(),
    },
  ]);

  const [securityLogs] = useState<SecurityLogType[]>([
    {
      id: '1',
      type: 'motion',
      location: 'Front Door',
      timestamp: new Date().toISOString(),
      description: 'Motion detected at front door',
    },
    {
      id: '2',
      type: 'smoke',
      location: 'Kitchen',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      description: 'Smoke detected in kitchen',
    },
  ]);

  const handleDeviceToggle = (id: string) => {
    setDevices(prevDevices =>
      prevDevices.map(device => {
        if (device.id === id) {
          const newStatus = (() => {
            switch (device.type) {
              case 'light':
              case 'sprinkler':
                return device.status === 'on' ? 'off' : 'on';
              case 'door':
                return device.status === 'locked' ? 'unlocked' : 'locked';
              case 'camera':
                return device.status === 'active' ? 'inactive' : 'active';
              default:
                return device.status;
            }
          })();

          return {
            ...device,
            status: newStatus,
            lastUpdated: new Date().toISOString(),
          };
        }
        return device;
      })
    );
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Devices Section */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Connected Devices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {devices.map((device) => (
                <DeviceCard 
                  key={device.id} 
                  device={device} 
                  onToggle={handleDeviceToggle}
                />
              ))}
            </div>
          </div>

          {/* Camera Feed */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
              <Camera className="mr-2" /> Live Camera Feed
            </h2>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Camera Feed"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Security Logs Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
              <ShieldAlert className="mr-2" /> Security Alerts
            </h2>
            <div className="space-y-3">
              {securityLogs.map((log) => (
                <SecurityLog key={log.id} log={log} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;