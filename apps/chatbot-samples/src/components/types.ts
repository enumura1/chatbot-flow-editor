
export interface ChatOption {
  label: string;
  nextId: number;
}

export interface ChatNode {
  id: number;
  title: string;
  options: ChatOption[];
}

export interface Message {
  type: 'bot' | 'user';
  text: string;
}
