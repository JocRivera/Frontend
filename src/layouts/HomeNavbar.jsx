import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { LagosLogo } from "./AcmeLogo";
import HandleLogin from "../modules/auth/login/main";
import HandleRegister from "../modules/auth/register/main";
import { useAuth } from "../context/AuthContext";
import ProfileButton from "../utilities/profile/ProfileButton";
import Notification from "../utilities/notification/Notification";
export default function App() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleClientRedirect = () => {
    if (isAuthenticated && user) {
      switch (user.rol) {
        case 'admin':
          navigate('/admin/reservations');
          break;
        case 'user':
          navigate('/client/MyBookings');
          break;
        default:
          navigate('/');
          break;
      }
    }
  };
  const renderAuth = () => {
    if (isAuthenticated && user) {
      switch (user.rol) {
        case 'admin':
          return (
            <>
              <Notification />
              <ProfileButton user={user.rol} handleLogout={handleLogout} />
            </>
          );
        case 'user':
          return (
            <ProfileButton user={user.rol} handleLogout={handleLogout} />
          );
        default:
          return null;
      }
    } else {
      return (
        <div className="flex gap-2">
          <HandleLogin />
          <HandleRegister />
        </div>
      );
    }
  }


  return (
    <Navbar isBordered className="fixed top-0 z-40 w-full"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        <LagosLogo />
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem isActive>
          <Link href="" aria-current="page">
            Contacto
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="">
            Alojamientos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="">
            Planes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="" onClick={handleClientRedirect}>
            Reservas
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {renderAuth()}
      </NavbarContent>
    </Navbar>
  );
}