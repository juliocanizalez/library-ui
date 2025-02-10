import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

import { IBook } from "@/interfaces/IBook";
import { RootState } from "@/store";
import { useApi } from "@/hooks/use-api";
import { booksUrl } from "@/config/endpoints";
import AddBookModal from "@/components/books/add-book-modal";

const ManageBooks: React.FC = () => {
  const api = useApi<IBook[] | IBook>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get(
        booksUrl,
        {},
        { Authorization: `Bearer ${accessToken}` },
      );

      setBooks(response as IBook[]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-1xl font-bold py-3 px-2">Registered Books</h1>
      <AddBookModal onUpdate={fetchBooks} />
      <Table aria-label="Students table">
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Author</TableColumn>
          <TableColumn>Genre</TableColumn>
          <TableColumn>Published Year</TableColumn>
          <TableColumn>Stock</TableColumn>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.published_year}</TableCell>
              <TableCell>{book.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ManageBooks;
