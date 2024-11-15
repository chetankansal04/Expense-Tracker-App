import React from "react";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "lucide-react";
import { Label } from "@radix-ui/react-menubar";

const ExpensesCard = ({ expenses, deleteExpense, editExpense, date }) => {
  const formattedDate = new Date(expenses.date).toLocaleDateString();
  return (
    <Card shadow="sm">
      <div className="flex items-center">
        <div className="flex flex-col">
          <CardBody className="overflow-visible justify-start">
            <p className=" text-nowrap text-xs">{formattedDate}</p>

            <p className="text-lg"> ₹{expenses.amount}</p>
            <p className="capitalize text-nowrap text-lg">
              {expenses.description}
            </p>
          </CardBody>
        </div>
        <div className="flex justify-end w-full gap-4 p-3">
          <Button
            variant="flat"
            color="secondary"
            size="sm"
            className="h-12  rounded-full"
          >
            <EditIcon className="size-4"></EditIcon>
          </Button>
          <Button
            variant="flat"
            color="secondary"
            size="sm"
            className="h-12  rounded-full"
          >
            <DeleteIcon className="size-4"></DeleteIcon>
          </Button>
        </div>
      </div>
      {/* <CardFooter className="bg-violet-200  text-sm">
        <p className="">#{expenses.category}</p>
      </CardFooter> */}
    </Card>
  );
};

export default ExpensesCard;
