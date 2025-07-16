// Simple in-memory database
let events = [
  {
    id: '1',
    title: 'Coffee Meetup',
    description: 'Casual coffee at the local cafe',
    dateTime: '2025-07-20T10:00:00',
    location: 'Starbucks Downtown',
    creatorId: 'user1',
    creatorName: 'John Doe',
    rsvps: [
      { id: '1', userId: 'user1', userName: 'John Doe', status: 'YES' },
      { id: '2', userId: 'user2', userName: 'Jane Smith', status: 'MAYBE' }
    ]
  },
  {
    id: '2',
    title: 'Movie Night',
    description: 'Watching the latest Marvel movie',
    dateTime: '2025-07-22T19:00:00',
    location: 'AMC Theater',
    creatorId: 'user2',
    creatorName: 'Jane Smith',
    rsvps: [
      { id: '3', userId: 'user2', userName: 'Jane Smith', status: 'YES' }
    ]
  }
];

let users = [
  { id: 'user1', name: 'John Doe', email: 'john@example.com' },
  { id: 'user2', name: 'Jane Smith', email: 'jane@example.com' }
];

module.exports = { events, users };