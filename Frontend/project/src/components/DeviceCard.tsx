import React from 'react';
import { Power, Lock, Video, Droplet } from 'lucide-react';
import { Device } from '../types';

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string) => void;
}

const iconMap = {
  light: Power,
  door: Lock,
  camera: Video,
  sprinkler: Droplet,
  sensor: Power,
};

const getStatusText = (device: Device): string => {
  switch (device.type) {
    case 'door':
      return device.status === 'locked' ? 'Locked' : 'Unlocked';
    case 'camera':
      return device.status === 'active' ? 'Active' : 'Inactive';
    default:
      return device.status === 'on' ? 'On' : 'Off';
  }
};

export default function DeviceCard({ device, onToggle }: DeviceCardProps) {
  const Icon = iconMap[device.type];
  const isActive = device.status === 'on' || device.status === 'unlocked' || device.status === 'active';
  const statusText = getStatusText(device);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{device.name}</h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">{device.room}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {statusText}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onToggle(device.id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isActive ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
              isActive ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}