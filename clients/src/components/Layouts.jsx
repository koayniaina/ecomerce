// LayoutAdmin.jsx
import React from "react";
import Sidebar from "./Sidebar"; // Sidebar spécifique admin
import NavAdmin from "./NavAdmin";
import { Link} from "react-router-dom";


export default function Layouts() {
  return (
    <div className="flex">
      <NavAdmin/>
      <Sidebar />
    </div>
  );
}
