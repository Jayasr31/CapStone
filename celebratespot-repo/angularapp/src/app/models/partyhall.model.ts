export interface PartyHall {
  partyHallId?: number;
  hallName: string;
  hallImageUrl: string;
  hallLocation: string;
  hallAvailableStatus: string;
  price: number;
  capacity: number;
  description: string;
  theme?: string;
  additionalImages?: string; // JSON string of image URL array
}
