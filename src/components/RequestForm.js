'use client';

import { useState } from 'react';
import { Send, Plus, Trash2 } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

const RequestForm = ({ onResponse, isLoading, setIsLoading, initialRequest }) => {
  const [method, setMethod] = useState(initialRequest?.method || 'GET');
  const [url, setUrl] = useState(initialRequest?.url || '');
  const [headers, setHeaders] = useState(
    initialRequest?.headers 
      ? Object.entries(initialRequest.headers).map(([key, value]) => ({ key, value }))
      : [{ key: '', value: '' }]
  );
  const [body, setBody] = useState(initialRequest?.body || '');

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index) => {
    if (headers.length > 1) {
      setHeaders(headers.filter((_, i) => i !== index));
    }
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }

    setIsLoading(true);

    try {
      // Filter out empty headers
      const filteredHeaders = headers
        .filter(header => header.key.trim() && header.value.trim())
        .reduce((acc, header) => {
          acc[header.key.trim()] = header.value.trim();
          return acc;
        }, {});

      const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method,
          url: url.trim(),
          headers: filteredHeaders,
          body: body.trim() || null,
        }),
      });

      const data = await response.json();
      onResponse(data);
    } catch (error) {
      console.error('Request failed:', error);
      onResponse({
        status: 500,
        data: { error: 'Request failed: ' + error.message },
        responseTime: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>HTTP Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Method and URL */}
          <div className="flex gap-2">
            <Select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-32"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </Select>
            <Input
              type="url"
              placeholder="Enter URL (e.g., https://api.example.com/users)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="w-4 h-4 mr-2" />
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>

          {/* Headers */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Headers</label>
            {headers.map((header, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Header name"
                  value={header.key}
                  onChange={(e) => updateHeader(index, 'key', e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Header value"
                  value={header.value}
                  onChange={(e) => updateHeader(index, 'value', e.target.value)}
                  className="flex-1"
                />
                {headers.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeHeader(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addHeader}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Header
            </Button>
          </div>

          {/* Body */}
          {['POST', 'PUT', 'PATCH'].includes(method) && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Request Body</label>
              <Textarea
                placeholder="Enter JSON or text data..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                className="font-mono text-sm"
              />
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestForm;
