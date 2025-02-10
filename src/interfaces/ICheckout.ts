export interface ICheckout {
  user: number;
  book_ids: number[];
  checkout_date: string;
  return_date: string;
  is_returned: boolean;
}
