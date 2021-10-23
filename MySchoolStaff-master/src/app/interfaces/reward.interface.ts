import { TicketResponse } from "./ticket.interface";

export interface Sponsor {
  name: string;
  amount: number;
}

export interface Reward {
  id: number;
  label: string;
  description?: string;
  thumbnail?: string;
  ticketPoints: number;
  raffleDate: string;
  active: boolean;
  sponsors: Sponsor[];
}

export interface AssetResponse {
  path: string;
  tags?: string;
}

export interface PrincipalResponse {
  // id: number;
  fullName: string;
  address?: string;
}

export interface SponsorResponse {
  id: number;
  principal: PrincipalResponse;
  amount: string;
  reward?: RewardResponse;
}

export interface RewardResponse {
  id: number;
  name: string;
  limit: number;
  value: string;
  description?: string;
  active: boolean;
  validityDatetime: string;
  assets?: AssetResponse[];
  eligibleGroups?: any[];
  eligibleUsers?: any[];
  ticket: TicketResponse;
  sponsors?: SponsorResponse[];
}
