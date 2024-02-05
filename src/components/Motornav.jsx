import { Link, Routes, Route } from "react-router-dom";
import Companies from "../pages/motor/Companies";
import Client from "../pages/motor/Clients";
import Motor from "../pages/motor/Motor";

function Motornav() {
  return (
    <>
      <nav className="bg-gray-700 p-4 flex items-center justify-center md:justify-between">
        <ul className="flex flex-col md:flex-row gap-5 list-none">
          <li>
            <Link to="/motor" className="text-white hover:text-blue-400">
              Policies
            </Link>
          </li>
          <li>
            <Link to="/client" className="text-white hover:text-blue-400">
              Client
            </Link>
          </li>
          <li>
            <Link to="/companies" className="text-white hover:text-blue-400">
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
