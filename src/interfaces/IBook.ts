export interface IBook {
  id?: number;
  title: string;
  author: string;
  published_year: number;
  genre: string;
  stock: number;
  date_registered?: Date;
}
