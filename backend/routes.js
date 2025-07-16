const express = require('express');
const router = express.Router();
const { events, users } = require('./data');

// Get all events
router.get('/events', (req, res) => {
  res.json(events);
});

// Get single event
router.get('/events/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
});

// Create new event
router.post('/events', (req, res) => {
  const { title, description, dateTime, location } = req.body;
  
  const newEvent = {
    id: Date.now().toString(), // Simple ID generation
    title,
    description,
    dateTime,
    location,
    creatorId: 'user1', // For now, always user1
    creatorName: 'John Doe',
    rsvps: [
      { id: Date.now().toString(), userId: 'user1', userName: 'John Doe', status: 'YES' }
    ]
  };
  
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Update RSVP
router.post('/events/:eventId/rsvp', (req, res) => {
  const { eventId } = req.params;
  const { userId, status } = req.body;
  
  const event = events.find(e => e.id === eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Find existing RSVP or create new one
  let rsvp = event.rsvps.find(r => r.userId === userId);
  if (rsvp) {
    rsvp.status = status;
  } else {
    rsvp = {
      id: Date.now().toString(),
      userId,
      userName: user.name,
      status
    };
    event.rsvps.push(rsvp);
  }
  
  res.json(rsvp);
});

module.exports = router;