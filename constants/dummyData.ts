export type Visibility = 'PUBLIC' | 'FOLLOWERS' | 'ONLY_ME';
export type PostType = 'FREEWRITE' | 'PHOTO';

export type DummyPost = {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string | null;
  };
  content: string;
  postType: PostType;
  visibility: Visibility;
  mediaUrls: string[];
  echoes: Array<{
    text: string;
    count: number;
  }>;
  createdAt: string;
};

export const dummyPosts: DummyPost[] = [
  {
    id: '1',
    author: { name: 'Sara K.', username: 'saraak', avatar: null },
    content: 'There is something about rainy mornings that makes everything feel slower, softer, and more yours.',
    postType: 'FREEWRITE',
    visibility: 'PUBLIC',
    mediaUrls: [],
    echoes: [
      { text: 'this hit different', count: 4 },
      { text: 'sending warmth', count: 2 },
    ],
    createdAt: '2026-03-25T09:00:00Z',
  },
  {
    id: '2',
    author: { name: 'Zaid M.', username: 'zaidm', avatar: null },
    content: 'Weekend in the mountains. No signal. Just this.',
    postType: 'PHOTO',
    visibility: 'FOLLOWERS',
    mediaUrls: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
    echoes: [{ text: 'I felt this', count: 7 }],
    createdAt: '2026-03-24T16:30:00Z',
  },
  {
    id: '3',
    author: { name: 'You', username: 'sarmadcodes', avatar: null },
    content: 'Starting something new today. Not sure where it goes. That is the point.',
    postType: 'FREEWRITE',
    visibility: 'ONLY_ME',
    mediaUrls: [],
    echoes: [],
    createdAt: '2026-03-23T11:00:00Z',
  },
];

export const dummyNotifications = [
  'Maya started following you',
  'Noah reacted with "sending warmth"',
  'Ava reacted with "beautifully said"',
];
