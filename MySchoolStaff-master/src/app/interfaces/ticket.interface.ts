export interface TicketResponse {
  id: number;
  value: number;
}

export interface TicketPurchaseRequest {
  ticket: number;
}

export interface TicketPurchaseResponse {
  id: number;
  user: number;
}
