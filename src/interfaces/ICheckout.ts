export interface ICheckout {
  user?: number;
  user_email?: string;
  book_ids?: number[];
  book_title?: string;
  checkout_date?: string;
  return_date?: string;
  is_returned?: boolean;
  books?: number[];
}
