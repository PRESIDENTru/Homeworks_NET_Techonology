import Navbar from "../components/Navbar";
import CompaniesGrid from "./components/CompaniesGrid";

function List() {
  return (
    <div>
      <Navbar activePage="2" />
      <CompaniesGrid />
    </div>
  );
}

export default List;