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

import { IBook } from "@/interfaces/IBook";
import { useApi } from "@/hooks/use-api";
import { booksUrl } from "@/config/endpoints";
import { RootState } from "@/store";

const AddBookModal: React.FC<{ onUpdate: () => void }> = ({ onUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const api = useApi<IBook>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IBook>({
    mode: "onChange",
  });

  const handleOpenModal = () => {
    reset();
    onOpen();
  };

  const onSubmit = async (data: IBook) => {
    if (isValid) {
      await api.post(booksUrl, data, {
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
          Add Book
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
                Create Book
              </ModalHeader>
              <ModalBody>
                <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.title?.message}
                    isInvalid={!!errors.title}
                    {...register("title", {
                      required: "Book title is required",
                    })}
                    label="Title"
                    placeholder="Enter Book Title"
                  />
                  <div className="py-2" />
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.author?.message}
                    isInvalid={!!errors.author}
                    {...register("author", {
                      required: "Author is required",
                    })}
                    label="Author"
                    placeholder="Enter book author"
                  />
                  <div className="py-2" />
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.published_year?.message}
                    isInvalid={!!errors.published_year}
                    {...register("published_year", {
                      required: "Published year is required",
                      min: {
                        value: 1000,
                        message: "Enter a valid year (>= 1000)",
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future",
                      },
                      valueAsNumber: true,
                    })}
                    label="Published year"
                    placeholder="Enter book published year"
                  />
                  <div className="py-2" />
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.genre?.message}
                    isInvalid={!!errors.genre}
                    {...register("genre", {
                      required: "Genre is required",
                    })}
                    label="Genre"
                    placeholder="Enter book genre"
                  />
                  <div className="py-2" />
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.stock?.message}
                    isInvalid={!!errors.stock}
                    {...register("stock", {
                      required: "Stock is required",
                      min: { value: 1, message: "Stock must be at least 1" },
                      max: { value: 1000, message: "Stock cannot exceed 1000" },
                      valueAsNumber: true,
                    })}
                    label="Stock"
                    placeholder="Enter book stock"
                    type="number"
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

export default AddBookModal;
