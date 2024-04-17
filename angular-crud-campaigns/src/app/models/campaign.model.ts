export interface Campaign {
  id?: number;
  name: string;
  status: string;
  keyword: string[];
  bidAmount: number;
  campaignFund: number;
  town: string;
  radius: string;
}
