import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';
import { SecurityLog as SecurityLogType } from '../types';

interface SecurityLogProps {
  log: SecurityLogType;
}

export default function SecurityLog({ log }: SecurityLogProps) {
  return (
    <div className="flex items-center space-x-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0">
        <AlertCircle className="h-5 w-5 text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {log.description}
        </p>
        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>{new Date(log.timestamp).toLocaleString()}</span>
        </div>
      </div>
      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
        {log.type}
      </div>
    </div>
  );
}