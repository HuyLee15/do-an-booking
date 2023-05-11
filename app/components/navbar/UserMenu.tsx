"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import ReactDOM from "react-dom";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      {isOpen &&
        ReactDOM.createPortal(
          <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-1000" onClick={() => setIsOpen(false)} />,
          document.body
        )}
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            z-2000
          "
        >
          <div className="flex flex-col cursor-pointer z-2000">
            {currentUser ? (
              <>
                <MenuItem
                  label="Profile"
                  onClick={() => {
                    router.push("/profile");
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="My trips"
                  onClick={() => {
                    router.push("/trips");
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => {
                    router.push("/favorites");
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => {
                    router.push("/reservations");
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => {
                    router.push("/properties");
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="Airbnb your home"
                  onClick={() => {
                    rentModal.onOpen();
                    setIsOpen(false);
                  }}
                />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="Sign up"
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
