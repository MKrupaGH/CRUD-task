export interface Campaign {
  id?: string;
  name: string;
  status: string;
  keyword: string[];
  bidAmount: number;
  campaignFund: number;
  town: string;
  radius: number;
}
