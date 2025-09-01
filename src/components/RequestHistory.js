'use client';

import { useState, useEffect, useCallback } from 'react';
import { History, Trash2, RotateCcw, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import Button from './ui/Button';
import { formatResponseTime, getStatusColor, getMethodColor } from '../lib/utils';

const RequestHistory = ({ onSelectRequest }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const fetchHistory = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/history?page=${page}&limit=${pagination.limit}`);
      const data = await response.json();
      
      if (data.data) {
        setHistory(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchHistory(newPage);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      const response = await fetch(`/api/history?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove from local state
        setHistory(history.filter(item => item.id !== id));
        setPagination(prev => ({
          ...prev,
          total: prev.total - 1,
          totalPages: Math.ceil((prev.total - 1) / prev.limit),
        }));
      }
    } catch (error) {
      console.error('Failed to delete request:', error);
    }
  };

  const handleClearHistory = async () => {
    if (!confirm('Are you sure you want to clear all history?')) {
      return;
    }

    try {
      const response = await fetch('/api/history/clear', {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setHistory([]);
        setPagination(prev => ({
          ...prev,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        }));
      }
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  const handleSelectRequest = (request) => {
    if (onSelectRequest) {
      onSelectRequest({
        method: request.method,
        url: request.url,
        headers: request.headers || {},
        body: request.body,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Request History
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchHistory(pagination.page)}
              disabled={loading}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearHistory}
              disabled={history.length === 0}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && history.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2">Loading history...</span>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No request history yet.</p>
            <p className="text-sm">Send some requests to see them here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* History List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleSelectRequest(request)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(request.method)}`}
                    >
                      {request.method}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{request.url}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className={`${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        <span>{formatResponseTime(request.responseTime)}</span>
                        <span>
                          {new Date(request.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRequest(request.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} requests
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={!pagination.hasPrev || loading}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={!pagination.hasNext || loading}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestHistory;
