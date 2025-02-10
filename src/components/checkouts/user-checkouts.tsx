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

import { RootState } from "@/store";
import { useApi } from "@/hooks/use-api";
import { ICheckout } from "@/interfaces/ICheckout";
import { checkoutsUrl } from "@/config/endpoints";
import { formatDate } from "@/utils/date-utils";

const UserCheckouts: React.FC = () => {
  const api = useApi<ICheckout[]>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [checkouts, setCheckouts] = useState<ICheckout[]>([]);

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

      const checkoutsList: ICheckout[] = [];

      for (const item of response) {
        if (!item.is_returned) {
          checkoutsList.push(item);
        }
      }

      setCheckouts(checkoutsList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Table aria-label="Not returned books table">
        <TableHeader>
          <TableColumn>Book</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Checkout Date</TableColumn>
          <TableColumn>Returned</TableColumn>
        </TableHeader>
        <TableBody>
          {checkouts.map((checkout, index) => (
            <TableRow key={`${index}`}>
              <TableCell>{checkout.book_title}</TableCell>
              <TableCell>{checkout.user_email}</TableCell>
              <TableCell>{formatDate(checkout.checkout_date!)}</TableCell>
              <TableCell>Pending</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserCheckouts;
