import { Usercolumns } from "./components/user-column";
import { UsersDataTable } from "./components/user-datatable";

const UsersPage = () => {
  return (
    <div className="p-6">
      <UsersDataTable columns={Usercolumns} data={[]} />
    </div>
  );
};

export default UsersPage;
