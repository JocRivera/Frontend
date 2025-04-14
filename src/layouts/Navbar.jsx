import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileButton from "../utilities/profile/ProfileButton";
import Notification from "../utilities/notification/Notification";
import { useEffect, useState } from "react";
export default function NavbarComponent() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <Navbar isBordered className="fixed top-0 z-40 w-full">
      <NavbarContent>
        <NavbarBrand className="justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-inherit text-foreground"
          >
            BOOKEDGE
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Notification />
        <ProfileButton user={user.nombre} handleLogout={handleLogout} />
      </NavbarContent>
    </Navbar>
  );
}