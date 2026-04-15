export const EXPLORE_CHIPS = ['All', 'Moments', 'Writing', 'Travel', 'Art', 'Reflections'];

export const HERO_TOPICS = [
  { id: 'h1', title: 'Prem gali', author: 'shugufta', image: require('../assets/images/ADD7976A-C362-4FBF-AB02-E3150CD28BC0.jpg') },
  { id: 'h2', title: 'wifuu', author: 'sarmadd', image: require('../assets/images/wifuu.png') },
  { id: 'h3', title: 'kenchi gng', author: 'sarms', image: require('../assets/images/46555.jpg') },
];
  
export const MASONRY_COLUMNS = [
  [
    { id: 't1', title: 'Travel', query: 'travel', height: 220 },
    { id: 't2', title: 'F1', query: 'racecar', height: 180 },
    { id: 't3', title: 'Intellectual', query: 'books', height: 240 },
    { id: 't4', title: 'Religions', query: 'temple', height: 160 },
  ],
  [
    { id: 't5', title: 'Nature', query: 'nature', height: 180 },
    { id: 't6', title: 'Code', query: 'coding', height: 220 },
    { id: 't7', title: 'Kindness', query: 'hug', height: 160 },
    { id: 't8', title: 'Islamic Values', query: 'mosque', height: 240 },
  ]
];

export const RECAP_DATES = [
  { id: 1, day: 'Mon', date: '6' },
  { id: 2, day: 'Tue', date: '7' },
  { id: 3, day: 'Wed', date: '8' },
  { id: 4, day: 'Thu', date: '9' },
  { id: 5, day: 'Fri', date: '10' },
  { id: 6, day: 'Sat', date: '11' },
];

export const RECAP_MEMORIES = [
  {
    id: 'm1',
    type: 'photo',
    image: require('../assets/images/IMG_0389.jpg'),
    tag: 'Photo',
    timestamp: '10:24 AM',
    note: 'aaj mei aur shaheer went kuch khanay peene after gym. we had kfc and then in bhaisaab ko coffee peeni...'
  },
  {
    id: 'm2',
    type: 'text',
    tag: 'Note',
    timestamp: '2:15 PM',
    body: 'yaar yeh aik larka hai sarmad naam ka itna koi pyaara larka hai i toh love him itna ziada like mene isse zyada sweet aur cutie larka aaj tak nhi dekhaa bas khush rahe yeh hameshaa hahahaha.'
  }
];

export type Visibility = 'PUBLIC' | 'FOLLOWERS' | 'ONLY_ME';
export type PostType = 'FREEWRITE' | 'PHOTO' | 'VOICENOTE';

export type DummyPost = {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string | any | null;
  };
  content: string;
  postType: PostType;
  visibility: Visibility;
  mediaUrls: any[];
  echoes: Array<{
    text: string;
    count: number;
  }>;
  createdAt: string;
};

export const dummyPosts: DummyPost[] = [
  {
    id: '1',
    author: { name: 'shaheel', username: 'shaheel', avatar: require('../assets/images/IMG_0711.jpg') },
    content: 'tuchaa saand',
    postType: 'PHOTO',
    visibility: 'PUBLIC',
    mediaUrls: [require('../assets/images/shael.png')],
    echoes: [
      { text: 'so real', count: 12 },
      { text: 'felt that', count: 5 },
    ],
    createdAt: '2026-04-14T09:00:00Z',
  },
  {
    id: '2',
    author: { name: 'hatan', username: 'hatan', avatar: require('../assets/images/IMG_0711.jpg') },
    content: 'cuties mere',
    postType: 'PHOTO',
    visibility: 'FOLLOWERS',
    mediaUrls: [
      require('../assets/images/PXL_20251227_175842519.jpg'),
      require('../assets/images/46555.jpg'),
      require('../assets/images/IMG_0777.jpg')
    ],
    echoes: [{ text: 'omg cute', count: 7 }],
    createdAt: '2026-04-13T16:30:00Z',
  },
  {
    id: '2b',
    author: { name: 'ali', username: 'alicutie', avatar: require('../assets/images/IMG_0711.jpg') },
    content: 'tutal putal',
    postType: 'VOICENOTE',
    visibility: 'FOLLOWERS',
    mediaUrls: [],
    echoes: [
      { text: 'send link', count: 4 },
      { text: 'vibes', count: 9 },
    ],
    createdAt: '2026-04-12T20:15:00Z',
  },
  {
    id: '3',
    author: { name: 'sarmadd', username: 'sarmadd', avatar: require('../assets/images/IMG_0711.jpg') },
    content: 'abey tu jaa rey',
    postType: 'FREEWRITE',
    visibility: 'PUBLIC',
    mediaUrls: [],
    echoes: [
      { text: 'mood', count: 20 },
    ],
    createdAt: '2026-04-12T11:00:00Z',
  },
  {
    id: '3b',
    author: { name: 'mahad', username: 'mahad', avatar: require('../assets/images/IMG_0711.jpg') },
    content: 'just finished putting together the longest codebase and i am exhausted but honestly nothing beats this feeling. maybe just tea.',
    postType: 'FREEWRITE',
    visibility: 'PUBLIC',
    mediaUrls: [],
    echoes: [
      { text: 'proud of you', count: 11 },
      { text: 'real', count: 2 },
    ],
    createdAt: '2026-04-11T19:45:00Z',
  },
  {
    id: '4',
    author: { name: 'nafay', username: 'nafay', avatar: require('../assets/images/IMG_0711.jpg') },
    content: 'nonchalant kahin ka',
    postType: 'PHOTO',
    visibility: 'PUBLIC',
    mediaUrls: [require('../assets/images/PXL_20260113_042740771.jpg')],
    echoes: [
      { text: 'artistic', count: 4 },
    ],
    createdAt: '2026-04-10T14:20:00Z',
  },
  {
    id: '5',
    author: { name: 'alicutie', username: 'alicutie', avatar: require('../assets/images/IMG_0711.jpg') },
    content: 'kya body banayega re tu',
    postType: 'PHOTO',
    visibility: 'FOLLOWERS',
    mediaUrls: [require('../assets/images/PXL_20260216_222010907.jpg')],
    echoes: [
      { text: 'take me with u', count: 8 },
    ],
    createdAt: '2026-04-09T08:15:00Z',
  },
  {
    id: '5b',
    author: { name: 'sohaib', username: 'sohaib', avatar: require('../assets/images/IMG_0711.jpg') },
    content: 'i dont desire thing. i desire the desire itsel',
    postType: 'FREEWRITE',
    visibility: 'PUBLIC',
    mediaUrls: [],
    echoes: [
      { text: 'literally me', count: 18 },
    ],
    createdAt: '2026-04-07T08:00:00Z',
  },
  {
    id: '6',
    author: { name: 'sarms', username: 'sarms', avatar: require('../assets/images/IMG_0711.jpg') },
    content: 'shugufata cutiee',
    postType: 'PHOTO',
    visibility: 'PUBLIC',
    mediaUrls: [require('../assets/images/IMG_0777.jpg')],
    echoes: [
      { text: 'priorities', count: 15 },
    ],
    createdAt: '2026-04-05T12:00:00Z',
  },
];

export const dummyNotifications = [
  'tuchaa started following you',
  'varun dhawan reacted with "sending warmth"',
  'nafay reacted with "beautifully said"',
];

export const dummyProfile = {
  name: 'sarmadd',
  username: 'sarmadd',
  avatar: require('../assets/images/IMG_0711.jpg'),
  banner: null, 
  bio: 'mei toh aesa hi hun simple sa.',
  stats: {
    posts: '128',
    followers: '2.3K',
    following: '684'
  },
  pinnedPost: {
    title: 'Pinned post',
  },
  gridPosts: [
    { id: '1', type: 'PHOTO', media: require('../assets/images/shael.png') },
    { id: '2', type: 'FREEWRITE', content: 'enjoy kar ladlee kabtak sad rahega' },
    { id: '3', type: 'PHOTO', media: require('../assets/images/PXL_20251227_175842519.jpg') },
    { id: '4', type: 'FREEWRITE', content: 'abey yaal' },
    { id: '5', type: 'PHOTO', media: require('../assets/images/PXL_20260113_042740771.jpg') },
    { id: '6', type: 'FREEWRITE', content: 'i toh love being obsessed with my goals. I love disappearing to work on myself. I love cutting wrong people off. I love the stress. I love going all in.' },
    { id: '7', type: 'PHOTO', media: require('../assets/images/IMG_2320.jpg') },
    { id: '8', type: 'PHOTO', media: require('../assets/images/IMG_0711.jpg') },
    { id: '9', type: 'FREEWRITE', content: 'peace of mind is more valuable than wealth or materialistic things.' },
    { id: '10', type: 'FREEWRITE', content: 'before seeking love from others learn to love yourself first.' },
  ]
};
