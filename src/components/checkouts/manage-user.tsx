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
import { IStudent, ILibrarian } from "@/interfaces/IUser";
import { usersUrl } from "@/config/endpoints";
import { formatDate } from "@/utils/date-utils";
import AddUserModal from "@/components/user/add-user-modal";

const ManageUser: React.FC = () => {
  const api = useApi<IStudent[] | ILibrarian[]>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [librarians, setLibrarians] = useState<ILibrarian[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get(
        usersUrl,
        {},
        { Authorization: `Bearer ${accessToken}` },
      );

      const students: IStudent[] = [];
      const librarians: ILibrarian[] = [];

      for (const user of response) {
        if (user.role === "student") {
          students.push(user);
        } else {
          librarians.push(user);
        }
      }
      setStudents(students);
      setLibrarians(librarians);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-1xl font-bold py-3 px-2">Students</h1>
      <AddUserModal userRole="student" onUpdate={fetchUsers} />
      <Table aria-label="Students table">
        <TableHeader>
          <TableColumn>First Name</TableColumn>
          <TableColumn>Last Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Created At</TableColumn>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.first_name}</TableCell>
              <TableCell>{student.last_name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{formatDate(student.date_joined!)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h1 className="text-1xl font-bold py-3 px-2">Librarians</h1>
      <AddUserModal userRole="librarian" onUpdate={fetchUsers} />
      <Table aria-label="Librarians table">
        <TableHeader>
          <TableColumn>First Name</TableColumn>
          <TableColumn>Last Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Created At</TableColumn>
        </TableHeader>
        <TableBody>
          {librarians.map((librarian) => (
            <TableRow key={librarian.id}>
              <TableCell>{librarian.first_name}</TableCell>
              <TableCell>{librarian.last_name}</TableCell>
              <TableCell>{librarian.email}</TableCell>
              <TableCell>{formatDate(librarian.date_joined!)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ManageUser;
