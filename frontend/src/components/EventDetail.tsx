import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Event {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  creatorName: string;
  rsvps: Array<{
    id: string;
    userId: string;
    userName: string;
    status: 'YES' | 'NO' | 'MAYBE';
  }>;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  // For demo purposes, we'll use user2 as the current user
  const currentUserId = 'user2';

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (status: 'YES' | 'NO' | 'MAYBE') => {
    if (!event) return;
    
    setRsvpLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/events/${event.id}/rsvp`, {
        userId: currentUserId,
        status
      });
      
      // Refresh the event data
      await fetchEvent();
    } catch (error) {
      console.error('Error updating RSVP:', error);
      alert('Error updating RSVP. Please try again.');
    } finally {
      setRsvpLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getCurrentUserRSVP = () => {
    if (!event) return null;
    return event.rsvps.find(rsvp => rsvp.userId === currentUserId);
  };

  const groupRSVPsByStatus = () => {
    if (!event) return { YES: [], MAYBE: [], NO: [] };
    
    return event.rsvps.reduce((acc, rsvp) => {
      if (!acc[rsvp.status]) acc[rsvp.status] = [];
      acc[rsvp.status].push(rsvp);
      return acc;
    }, { YES: [], MAYBE: [], NO: [] } as Record<string, typeof event.rsvps>);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Event not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const currentRSVP = getCurrentUserRSVP();
  const rsvpGroups = groupRSVPsByStatus();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Events
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
          <p className="text-gray-600 mt-2">{event.description}</p>
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Details</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">📅 Date:</span> {formatDate(event.dateTime)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">📍 Location:</span> {event.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">👤 Created by:</span> {event.creatorName}
                </p>
              </div>
            </div>

            {/* RSVP Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Response</h3>
              <div className="space-y-3">
                {currentRSVP && (
                  <p className="text-sm text-gray-600 mb-2">
                    Current response: <span className="font-medium">{currentRSVP.status}</span>
                  </p>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRSVP('YES')}
                    disabled={rsvpLoading}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentRSVP?.status === 'YES' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    ✅ Going
                  </button>
                  <button
                    onClick={() => handleRSVP('MAYBE')}
                    disabled={rsvpLoading}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentRSVP?.status === 'MAYBE' 
                        ? 'bg-yellow-600 text-white' 
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    ❓ Maybe
                  </button>
                  <button
                    onClick={() => handleRSVP('NO')}
                    disabled={rsvpLoading}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentRSVP?.status === 'NO' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    ❌ Can't Go
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Guest List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest List</h3>
            <div className="space-y-4">
              {rsvpGroups.YES.length > 0 && (
                <div>
                  <h4 className="font-medium text-green-700 mb-2">✅ Going ({rsvpGroups.YES.length})</h4>
                  <div className="space-y-1">
                    {rsvpGroups.YES.map((rsvp) => (
                      <p key={rsvp.id} className="text-sm text-gray-600">
                        {rsvp.userName}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {rsvpGroups.MAYBE.length > 0 && (
                <div>
                  <h4 className="font-medium text-yellow-700 mb-2">❓ Maybe ({rsvpGroups.MAYBE.length})</h4>
                  <div className="space-y-1">
                    {rsvpGroups.MAYBE.map((rsvp) => (
                      <p key={rsvp.id} className="text-sm text-gray-600">
                        {rsvp.userName}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {rsvpGroups.NO.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-700 mb-2">❌ Can't Go ({rsvpGroups.NO.length})</h4>
                  <div className="space-y-1">
                    {rsvpGroups.NO.map((rsvp) => (
                      <p key={rsvp.id} className="text-sm text-gray-600">
                        {rsvp.userName}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {event.rsvps.length === 0 && (
                <p className="text-gray-500 text-sm">No responses yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;