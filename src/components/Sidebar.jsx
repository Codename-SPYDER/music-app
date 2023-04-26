import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

function NavLinks({ handleClick }) {
  return(
    <div className="mmy-4">
      {links.map(item => (
        <NavLink 
        key={item.name}
        to={item.to}
        onClick={() => handleClick && handleClick()}
        className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'>
          <item.icon className="w-6 h-6 mr-2"/>
          {item.name}
        </NavLink>
      ))}
    </div>
  )
};

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return(
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto my-1 text-yellow-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
        <NavLinks/>
      </div>
      <div className="absolute md:hidden block top-6 right-3 cursor-pointer">
        {mobileMenuOpen ? (
          <RiCloseLine 
          onClick={() => setMobileMenuOpen(false)}
          className="w-6 h-6 text-white mr-2"/> 
        ) : (
          <HiOutlineMenu 
          onClick={() => setMobileMenuOpen(true)}
          className="w-6 h-6 text-white mr-2"/>
        )}
      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#351452] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? ' left-0' : ' -left-full'}`} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mt-1 text-yellow-300/60">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
        <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
      </div>
    </>
  )
};

