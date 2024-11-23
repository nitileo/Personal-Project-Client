import { Facebook, Instagram, TwitterIcon } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-[#90E0EF] text-base-content rounded py-5 px-0 ">
      <nav className="grid grid-flow-col gap-4 text-black">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav className="flex gap-6">
        <a href="#">
          <Facebook color="black" />
        </a>
        <a href="#">
          <TwitterIcon color="black" />
        </a>
        <a href="#">
          <Instagram color="black" />
        </a>
      </nav>
      <div className="w-full text-white bg-blue-500 py-4">
        <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  );
};

export default Footer;
