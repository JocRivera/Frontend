import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
          <p className="font-bold text-inherit">BOOKEDGE</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_22.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="gap-2 h-14">
              <p className="font-semibold">Admin</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger"
              onClick={handleLogout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}