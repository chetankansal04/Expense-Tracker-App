"use client";
import { createExpense } from "@/services/expenseServices";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";

const NewExpense = ({ addExpense }) => {
  const [expenseDetails, setExpenseDetails] = useState([
    {
      amount: "",
      description: "",
      category: "",
    },
  ]);

  const [selectedKeys, setSelectedKeys] = useState(new Set());

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const handleInputChange = (e) => {
    e.preventDefault();
    setExpenseDetails({
      ...expenseDetails,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    setExpenseDetails((prevDetails) => ({
      ...prevDetails,
      category: Array.from(selectedKeys), // set category with selected values
    }));
  }, [selectedKeys]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createExpense(expenseDetails);
      setExpenseDetails(response);
      addExpense(expenseDetails);
      setExpenseDetails({
        amount: "",
        description: "",
      });
    } catch (error) {}
  };
  const handleSelectionChange = (keys) => {
    setSelectedKeys(new Set(keys)); // set selectedKeys Set
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const size = "3xl";

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="max-w-fit p-4 px-8 mb-2">
      <Button variant="flat" color="primary" onPress={() => handleOpen(size)}>Add Expense</Button>

      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="flex justify-center items-center">
          {(onClose) => (
            <div className="flex flex-col gap-4 max-w-fit justify-start p-4 px-8">
              <p className="font-semibold ml-2 w-fit ">Input your expense</p>

              <div className="flex w-full gap-8 shadow-md shadow-zinc-200 bg-zinc-300 rounded-xl items-end justify-start p-4 pl-8">
                <Input
                  className="max-w-fit text-zinc-800"
                  type="number"
                  label="Price"
                  id="amount"
                  value={expenseDetails.amount}
                  placeholder="0.00"
                  labelPlacement="outside"
                  onChange={handleInputChange}
                  variant="flat"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">₹</span>
                    </div>
                  }
                />
                <Input
                  className="max-w-fit text-zinc-800"
                  type="text"
                  id="description"
                  label="Description"
                  variant="flat"
                  value={expenseDetails.description}
                  placeholder="Description"
                  labelPlacement="outside"
                  onChange={handleInputChange}
                />

                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      color="secondary"
                      className="capitalize"
                    >
                      {selectedValue || `Select Category`}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    color="secondary"
                    disallowEmptySelection
                    onsele
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={handleSelectionChange}
                  >
                    <DropdownItem key="Food & Drinks">
                      Food & Drinks
                    </DropdownItem>
                    <DropdownItem key="Home needs">Home needs</DropdownItem>
                    <DropdownItem key="Groceries">Groceries</DropdownItem>
                    <DropdownItem key="Shopping">Shopping</DropdownItem>
                    <DropdownItem key="Health">Health</DropdownItem>
                    <DropdownItem key="Other">Others</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="flex items-center justify-end gap-2">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button variant="flat" color="primary" onPress={handleSubmit}>
                Submit
              </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NewExpense;
