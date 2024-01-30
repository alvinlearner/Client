import { Link, Routes, Route } from "react-router-dom";
import Companies from "../pages/Companies";
import Client from "../pages/Clients";
import Motor from "../pages/Motor";

function Motornav() {
  return (
    <>
      <nav className="bg-gray-700 p-4 flex items-center justify-center md:justify-between">
        <ul className="flex flex-col md:flex-row gap-5 list-none">
          <li className="hover:bg-red-500">
            <Link to="/motor" className="text-white">
              Policies
            </Link>
          </li>
          <li className="hover:bg-red-500">
            <Link to="/client" className="text-white">
              Client
            </Link>
          </li>
          <li className="hover:bg-red-500">
            <Link to="/companies" className="text-white">
              Companies
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/companies/*" element={<Companies />} />
        <Route path="/client/*" element={<Client />} />
        <Route path="/motor/" element={<Motor />} />
      </Routes>
    </>
  );
}

export default Motornav;
