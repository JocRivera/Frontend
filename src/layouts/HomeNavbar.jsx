import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { LagosLogo } from "./AcmeLogo";
import OpenModal from "../utilities/forms/login/OpenModal";
import Login from "../utilities/forms/login/LoginForm";
export default function App() {
  const navigate = useNavigate();

  const handleAdminRedirect = () => {
    navigate('/dashboard');
  };
  const handleClientRedirect = () => {
    navigate('/client/MyBookings');
  };
  const handleUserRedirect = () => {
    navigate('/');
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
          <Link href="#" aria-current="page">
            Contacto
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Alojamientos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Planes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" onClick={handleClientRedirect}>
            Reservas
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <OpenModal login={(onClose) =>
          (<Login
            onSubmit={(data) => {
              console.log(data);
              onClose();
            }}
            onClose={onClose}
          />)
          } formId="login-form" size="md" />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat"  >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}