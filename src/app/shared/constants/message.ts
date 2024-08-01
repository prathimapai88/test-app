interface Message {
  message: string;
  url?: string;
}

export const MESSAGES: { [key: string]: Message } = {
  'Status': {
    message: 'This is the Task Status column.',
    url: 'https://www.example.com/status'
  },
  'Priority': {
    message: 'This is the Task Priority column.',
    url: 'https://www.example.com/priority'
  },
  'exampleMessage': {
    message: 'Example message'
  },
  'exampleMessage2': {
    message: 'Example message 2'
  }
};
