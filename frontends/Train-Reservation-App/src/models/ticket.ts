export interface Ticket {
  price: string;
  seats?: string;
  id: string;
  routes: string[];
  name: string;
  date: string;
  group: boolean;
  groupName?: string;
}
