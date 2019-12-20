export interface RequestAttribute {
  param: string;
  value: string;
}

export interface RequestParams {
  sort: string;
  order: 'desc' | 'asc' | '';
  page: number;
  limit: number;
}
