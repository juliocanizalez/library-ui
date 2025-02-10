interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_joined?: string;
}

export interface IStudent extends User {
  role: "student";
}

export interface ILibrarian extends User {
  role: "librarian";
}
