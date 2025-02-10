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
import { Input } from "@heroui/input";

import BookDetails from "./book-details";

import { RootState } from "@/store";
import { useApi } from "@/hooks/use-api";
import { ICheckout } from "@/interfaces/ICheckout";
import { IBook } from "@/interfaces/IBook";
import { checkoutsUrl, booksUrl } from "@/config/endpoints";

const BooksList: React.FC = () => {
  const checkoutApi = useApi<ICheckout>();
  const booksApi = useApi<IBook[]>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [books, setBooks] = useState<IBook[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const booksList = await booksApi.get(
        booksUrl,
        {},
        { Authorization: `Bearer ${accessToken}` },
      );

      setBooks(booksList);
    } catch (error) {}
  };

  const checkoutBook = async (data: ICheckout) => {
    try {
      await checkoutApi.post(checkoutsUrl, data, {
        Authorization: `Bearer ${accessToken}`,
      });

      fetchBooks();
    } catch (error) {}
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => (searchQuery ? 0 : a.id! - b.id!));

  return (
    <>
      <Input
        aria-label="Search books"
        className="mb-4"
        placeholder="Search books by title"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Table aria-label="Students table">
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Author</TableColumn>
          <TableColumn>Stock</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.stock}</TableCell>
              <TableCell>
                <BookDetails
                  book={book}
                  saveEntry={() =>
                    checkoutBook({
                      books: [book.id as number],
                      user: userId as number,
                    })
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BooksList;
