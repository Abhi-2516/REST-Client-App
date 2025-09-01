'use client';

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import RequestForm from '../components/RequestForm';
import ResponseDisplay from '../components/ResponseDisplay';
import RequestHistory from '../components/RequestHistory';

export default function Home() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleResponse = (responseData) => {
    setResponse(responseData);
  };

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    // Clear previous response when selecting a new request
    setResponse(null);
  };

  // Clear selected request after it's been used
  useEffect(() => {
    if (selectedRequest && !isLoading) {
      setSelectedRequest(null);
    }
  }, [selectedRequest, isLoading]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">REST Client</h1>
        </div>
        <p className="text-muted-foreground">
          Test HTTP APIs with ease. Send requests, view responses, and manage your request history.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Request Form */}
        <div className="lg:col-span-2 space-y-6">
          <RequestForm 
            onResponse={handleResponse}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            initialRequest={selectedRequest}
          />
          <ResponseDisplay response={response} />
        </div>

        {/* Right Column - History */}
        <div className="lg:col-span-1">
          <RequestHistory onSelectRequest={handleSelectRequest} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>
          Built with Next.js, MikroORM, and Tailwind CSS. 
          Store and manage your HTTP request history efficiently.
        </p>
      </footer>
    </div>
  );
}
