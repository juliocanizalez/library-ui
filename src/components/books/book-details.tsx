import React from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";

import { IBook } from "@/interfaces/IBook";

const BookDetails: React.FC<{
  saveEntry: any;
  book: IBook;
}> = ({ saveEntry, book }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenModal = () => {
    onOpen();
  };

  const handleSave = () => {
    saveEntry();
    onClose();
  };

  return (
    <>
      <Button color="primary" variant="light" onPress={handleOpenModal}>
        Details
      </Button>
      <Modal
        isDismissable={false}
        isOpen={isOpen}
        scrollBehavior="inside"
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-8">
                <h4 className="font-bold text-4xl">{book.title}</h4>
                <p className="text-tiny uppercase font-bold">
                  Author: {book.author}
                </p>
                <small className="text-default-500">
                  Published year: {book.published_year}
                </small>
                <p className="text-tiny uppercase font-bold">
                  Genre: {book.genre}
                </p>

                <small className="text-default-500 pt-5">
                  Only {book.stock} copies are available
                </small>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" variant="flat" onPress={handleSave}>
                  Checkout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookDetails;
