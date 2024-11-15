import { Navbar, Link, Button, NavbarBrand } from "@nextui-org/react";

const Menubar = () => {
  return (
    <Navbar
      shouldHideOnScroll
      className=" bg-zinc-200 border-b-2 pl-64 border-zinc-300 "
    >
      <NavbarBrand className="flex w-full -m-64 gap-2 ">
        <p className="font-bold text-inherit bg-zinc-400 p-2 rounded-lg">
          Expense Bill
        </p>
      </NavbarBrand>
      <div className="w-full flex gap-4 justify-end ">
        <Button>
          <Link className="text-zinc-800 font-semibold text-base" href="/login">
            Log In
          </Link>
        </Button>
        <Button color="secondary" variant="flat">
          <Link
            className="text-zinc-800 font-semibold text-base"
            href="/register"
          >
            Sign up
          </Link>
        </Button>
      </div>
    </Navbar>
  );
};

export default Menubar;
