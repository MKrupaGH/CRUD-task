import { FormControl } from "@angular/forms";

export enum Fields {
  NAME = 'name',
  STATUS = 'status',
  KEYWORD = 'keyword',
  BIDAMOUNT = 'bidAmount',
  CAMPAIGNFUND = 'campaignFund',
  TOWN = 'town',
  RADIUS = 'radius',
}

export interface FormType {
  [Fields.NAME]: FormControl<string>;
  [Fields.STATUS]: FormControl<string>;
  [Fields.KEYWORD]: FormControl<string[]>;
  [Fields.BIDAMOUNT]: FormControl<number>;
  [Fields.CAMPAIGNFUND]: FormControl<number>;
  [Fields.TOWN]: FormControl<string>;
  [Fields.RADIUS]: FormControl<number>;
}
