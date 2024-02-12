import { Link, Routes, Route } from "react-router-dom";
import Companies from "../pages/motor/Companies";
import Client from "../pages/motor/Clients";
import Motor from "../pages/motor/Motor";
import { TableCellsIcon, UserGroupIcon, BuildingOffice2Icon } from '@heroicons/react/24/solid';

function Motornav() {
  return (
    <>
      <nav className="bg-gray-700 p-4 flex items-center justify-center md:justify-between">
        <ul className="flex flex-col md:flex-row gap-7 list-none ">
          <li className="flex-grow">
            <Link to="/motor" className="text-white hover:text-blue-400">
              <div className="flex-container"><TableCellsIcon className="h-6 w-6 text-blue-500 mr-1" /> Covers</div>
            </Link>
          </li>
          <li className="flex-grow">
            <Link to="/client" className="text-white hover:text-blue-400">
              <div className="flex-container"><UserGroupIcon className="h-6 w-6 text-blue-500 mr-1" />Clients</div>
            </Link>
          </li>
          <li className="flex-grow">
            <Link to="/companies" className="text-white hover:text-blue-400">
              <div className="flex-container"><BuildingOffice2Icon className="h-6 w-6 text-blue-500 mr-1" />Companies</div>
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
