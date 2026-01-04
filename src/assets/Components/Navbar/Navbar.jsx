import React, { useContext, useState } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as HeroLink,
  Button,DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { NavLink, useLocation } from "react-router";
import { FaFire } from "react-icons/fa";
import { FaFilm } from "react-icons/fa6";
import { authContext } from "../Context/AuthContextProvider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/home", icon: null },
    { name: "Trending", path: "/trending", icon: <FaFire className="mb-1" /> },
    { name: "Login", path: "/login", icon: null },
    { name: "Sign Up", path: "/signup", icon: null },
  ];
  const {setToken} = useContext(authContext)
  function logUserOut(){
    localStorage.removeItem("userToken")
    setToken(false)
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeroNavbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="bg-[#1a1a2e] py-2"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <NavLink to="/home" className="flex items-center gap-2 text-[#e94560] hover:text-[#e94560] transition-colors">
            <FaFilm size={24} />
            <p className="font-bold text-inherit text-2xl">MovieApp</p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={location.pathname === "/home"}>
          <HeroLink
            as={NavLink}
            to="/home"
            className={`text-white font-medium hover:text-[#e94560] transition-colors ${location.pathname === "/home" ? "text-[#e94560]!" : ""}`}
          >
            Home
          </HeroLink>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/trending"}>
          <HeroLink
            as={NavLink}
            to="/trending"
            className={`text-white font-medium hover:text-[#e94560] transition-colors gap-1 ${location.pathname === "/trending" ? "text-[#e94560]!" : ""}`}
          >
            Trending <FaFire />
          </HeroLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <HeroLink
            as={NavLink}
            to="/login"
            className={`text-white font-medium hover:text-[#e94560] transition-colors ${location.pathname === "/login" ? "text-[#e94560]!" : ""}`}
          >
            Login
          </HeroLink>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={NavLink}
            to="/signup"
            className="bg-[#e94560] text-white font-semibold rounded-full px-6 hover:bg-[#d63d55]"
            variant="solid"
          >
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={NavLink}
            to="/signup"
            className="bg-[#e94560] text-white font-semibold rounded-full px-6 hover:bg-[#d63d55]"
            variant="solid"
            onPress={logUserOut}
          >
            logOut
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-[#1a1a2e]/95 pt-6 backdrop-blur-md">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <HeroLink
              className={`w-full text-lg ${location.pathname === item.path ? "text-[#e94560] font-bold" : "text-white"}`}
              as={NavLink}
              to={item.path}
              size="lg"
              onPress={handleMenuItemClick}
            >
              {item.name} {item.icon}
            </HeroLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
}
