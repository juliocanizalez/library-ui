import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { IStudent, ILibrarian } from "@/interfaces/IUser";
import { useApi } from "@/hooks/use-api";
import { usersUrl } from "@/config/endpoints";
import { RootState } from "@/store";

const AddUserModal: React.FC<{ userRole: string; onUpdate: () => void }> = ({
  userRole,
  onUpdate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const api = useApi<ILibrarian | IStudent>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IStudent | ILibrarian>({
    mode: "onChange",
  });

  const handleOpenModal = () => {
    reset();
    onOpen();
  };

  const onSubmit = async (data: IStudent | ILibrarian) => {
    if (isValid) {
      const user = { ...data, role: userRole };

      await api.post(usersUrl, user, {
        Authorization: `Bearer ${accessToken}`,
      });
      onUpdate();
      onClose();
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          className="mt-2"
          color="primary"
          variant="flat"
          onPress={handleOpenModal}
        >
          {userRole === "student" ? "Add Student" : "Add Librarian"}
        </Button>
      </div>
      <Modal
        isDismissable={false}
        isOpen={isOpen}
        scrollBehavior="inside"
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {userRole === "student" ? "Create Student" : "Create Librarian"}
              </ModalHeader>
              <ModalBody>
                <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.first_name?.message}
                    isInvalid={!!errors.first_name}
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    label="First Name"
                    placeholder="Enter first name"
                  />
                  <div className="py-2" />
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.last_name?.message}
                    isInvalid={!!errors.last_name}
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    label="Last Name"
                    placeholder="Enter last name"
                  />
                  <div className="py-2" />
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors.email}
                    {...register("email", {
                      required: "Email is required",
                    })}
                    label="Email"
                    placeholder="Enter email"
                  />
                  <div className="py-2" />
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.password?.message}
                    isInvalid={!!errors.password}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  form="user-form"
                  isDisabled={!isValid}
                  type="submit"
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUserModal;
