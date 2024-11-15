"use client";
import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/client";
import {
  ChartLine,
  ChevronDown,
  LogOut,
  ReceiptText,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sidebar w-[250px] flex flex-col justify-between min-h-dvh">
      <div className="info">
        <div className="logo p-4 flex flex-col items-center text-xl font-bold pb-6 border-b-2 border-zinc-300 gap-2">
          <Image
            className="rounded-full"
            src={"Logo.svg"}
            width={60}
            height={60}
            alt="userpic"
          ></Image>
          <div className="flex items-center gap-2">
            <div className="capitalize ml-4 ">Guest</div>
            <ChevronDown></ChevronDown>
          </div>
        </div>
        <div className="menu p-4 pt-6 flex flex-col text-base font-semibold gap-4 ">
          <div className="flex items-center">
            <ChevronDown
              onClick={menuHandler}
              className="transition hover:scale-125 mr-2"
            ></ChevronDown>
            Expense Tracker
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="menu-options flex flex-col gap-2 text-base font-semibold"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className=" flex flex-col ml-7 gap-2 font-semibold">
                  <Link href={"/dashboard"} className=" flex gap-x-2 ">
                    <ReceiptText className="scale-75" />
                    <p>Recent Expenses</p>
                  </Link>
                  <Link href={"/dashboard/category"} className="flex gap-x-2">
                    <Tag className="scale-75"></Tag>
                    <p>Category</p>
                  </Link>
                  <Link href={"/dashboard/trends"} className="flex gap-x-2">
                    <ChartLine className="scale-75"></ChartLine>
                    <p>Trends</p>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="logout border-t-2 border-zinc-300 flex font-semibold p-4 gap-2">
        <LogOut></LogOut>
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
