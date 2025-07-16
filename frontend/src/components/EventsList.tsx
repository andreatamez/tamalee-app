import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getRSVPCounts = (rsvps: Event['rsvps']) => {
    return {
      yes: rsvps.filter(r => r.status === 'YES').length,
      maybe: rsvps.filter(r => r.status === 'MAYBE').length,
      no: rsvps.filter(r => r.status === 'NO').length,
    };
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div>Loading events...</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Upcoming Events</h2>
      </div>

      {events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>No events yet. Create your first event!</p>
          <Link to="/create" className="btn">
            Create Event
          </Link>
        </div>
      ) : (
        <div className="grid">
          {events.map((event) => {
            const counts = getRSVPCounts(event.rsvps);
            return (
              <div key={event.id} className="card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                
                <div style={{ marginBottom: '15px' }}>
                  <p><strong>📅 Date:</strong> {formatDate(event.dateTime)}</p>
                  <p><strong>📍 Location:</strong> {event.location}</p>
                  <p><strong>👤 Created by:</strong> {event.creatorName}</p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px' }}>
                  <span style={{ color: '#059669' }}>✅ {counts.yes} going</span>
                  <span style={{ color: '#d97706' }}>❓ {counts.maybe} maybe</span>
                  <span style={{ color: '#dc2626' }}>❌ {counts.no} not going</span>
                </div>
                
                <Link to={`/event/${event.id}`} className="btn" style={{ width: '100%', textAlign: 'center' }}>
                  View Details
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventsList;