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
import { Button } from "@heroui/button";

import { RootState } from "@/store";
import { useApi } from "@/hooks/use-api";
import { ICheckout } from "@/interfaces/ICheckout";
import { checkoutsUrl } from "@/config/endpoints";
import { formatDate } from "@/utils/date-utils";

const BookReturn: React.FC = () => {
  const api = useApi<ICheckout[]>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [returnedCheckouts, setReturnedCheckouts] = useState<ICheckout[]>([]);
  const [notReturnedCheckouts, setNotReturnedCheckouts] = useState<ICheckout[]>(
    [],
  );

  useEffect(() => {
    fetchCheckouts();
  }, []);

  const fetchCheckouts = async () => {
    try {
      const response = await api.get(
        checkoutsUrl,
        {},
        { Authorization: `Bearer ${accessToken}` },
      );

      const returned: ICheckout[] = [];
      const notReturned: ICheckout[] = [];

      for (const item of response) {
        if (item.is_returned) {
          returned.push(item);
        } else {
          notReturned.push(item);
        }
      }

      setReturnedCheckouts(returned);
      setNotReturnedCheckouts(notReturned);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturn = async (book_ids: number[], user_id: number) => {
    try {
      const response = await api.post(
        `${checkoutsUrl}return_book/`,
        {
          book_ids,
          user_id,
        },
        { Authorization: `Bearer ${accessToken}` },
      );

      if (response) {
        fetchCheckouts();
      }
    } catch (error) {}
  };

  return (
    <>
      <h1 className="text-1xl font-bold py-3 px-2">Not Returned</h1>
      <Table aria-label="Not returned books table">
        <TableHeader>
          <TableColumn>Book</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Checkout Date</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {notReturnedCheckouts.map((checkout) => (
            <TableRow key={checkout.user}>
              <TableCell>{checkout.book_title}</TableCell>
              <TableCell>{checkout.user_email}</TableCell>
              <TableCell>{formatDate(checkout.checkout_date)}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="light"
                  onPress={() => handleReturn(checkout.book_ids, checkout.user)}
                >
                  Return
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1 className="text-1xl font-bold py-3 px-2">Returned</h1>
      <Table aria-label="Not returned books table">
        <TableHeader>
          <TableColumn>Book</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Checkout Date</TableColumn>
          <TableColumn>Return Date</TableColumn>
        </TableHeader>
        <TableBody>
          {returnedCheckouts.map((checkout, index) => (
            <TableRow key={`${index}`}>
              <TableCell>{checkout.book_title}</TableCell>
              <TableCell>{checkout.user_email}</TableCell>
              <TableCell>{formatDate(checkout.checkout_date)}</TableCell>
              <TableCell>{formatDate(checkout.return_date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BookReturn;
