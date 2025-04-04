import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { LagosLogo } from "./AcmeLogo";
import HandleLogin from "../modules/auth/login/main";
export default function App() {
  const navigate = useNavigate();
  const handleClientRedirect = () => {
    navigate('/client/MyBookings');
  };


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
          <Link color="foreground" onClick={handleClientRedirect}>
            Reservas
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <HandleLogin />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" variant="flat"  >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}