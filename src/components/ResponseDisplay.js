'use client';

import { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import Button from './ui/Button';
import { formatResponseTime, getStatusColor } from '../lib/utils';

const ResponseDisplay = ({ response }) => {
  const [activeTab, setActiveTab] = useState('body');

  if (!response) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No response yet. Send a request to see the response here.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status) => {
    if (status >= 200 && status < 300) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (status >= 400) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    } else {
      return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const formatHeaders = (headers) => {
    if (!headers || typeof headers !== 'object') return '';
    return Object.entries(headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  };

  const formatResponseData = (data) => {
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return data;
      }
    }
    return JSON.stringify(data, null, 2);
  };

  const tabs = [
    { id: 'body', label: 'Body' },
    { id: 'headers', label: 'Headers' },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Response</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              {getStatusIcon(response.status)}
              <span className={`font-medium ${getStatusColor(response.status)}`}>
                {response.status}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{formatResponseTime(response.responseTime)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Tabs */}
        <div className="flex border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          {activeTab === 'body' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Response Body
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(formatResponseData(response.data));
                  }}
                >
                  Copy
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono max-h-96">
                {formatResponseData(response.data)}
              </pre>
            </div>
          )}

          {activeTab === 'headers' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Response Headers
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(formatHeaders(response.headers));
                  }}
                >
                  Copy
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono max-h-96">
                {formatHeaders(response.headers)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;
