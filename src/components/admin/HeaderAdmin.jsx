import { UserCircle2 } from "lucide-react";
import React from "react";

const HeaderAdmin = () => {
  return (
    <div className="flex justify-between p-6 bg-[#424040] text-white">
      <div>LOGO</div>
      <div className="flex">
        <UserCircle2 />
        <h1>Admin Name</h1>
      </div>
    </div>
  );
};

export default HeaderAdmin;
