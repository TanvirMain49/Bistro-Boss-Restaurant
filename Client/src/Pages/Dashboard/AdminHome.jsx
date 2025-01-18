import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaDollarSign, FaProductHunt, FaTruck, FaUsers } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";

const AdminHome = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: status = {} } = useQuery({
    queryKey: ["admin-state"],
    queryFn: async () => {
      const res = await axiosSecure.get("admin-state");
      return res.data;
    },
  });
  console.log(status);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Hi, Welcome {user?.displayName ? user.displayName : 'Back!'} </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Users */}
        <div className="rounded-xl shadow-xl bg-gradient-to-r from-purple-600 to-purple-300 p-6 flex items-center justify-center gap-8 text-white">
          <div className="text-7xl">
            <FaUsers></FaUsers>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{status.user || 0}</div>
            <div className="uppercase text-2xl">Users</div>
          </div>
        </div>

        {/* Card 2: Menu Items */}
        <div className="rounded-xl shadow-xl bg-gradient-to-r from-yellow-600 to-yellow-300 p-6 flex items-center justify-center gap-6 text-white">
          <div className="text-6xl">
            <MdOutlineFastfood />
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{status.menuItem || 0}</div>
            <div className="uppercase text-2xl">Menu Items</div>
          </div>
        </div>

        {/* Card 3: Revenue */}
        <div className="rounded-xl shadow-xl bg-gradient-to-r from-green-600 to-green-300 p-6 flex items-center justify-center gap-6 text-white">
          <div className="text-6xl">
            <FaDollarSign/>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{status.revenue || 0}</div>
            <div className="uppercase text-2xl">Total Revenue</div>
          </div>
        </div>
        {/* Card 4: orders */}
        <div className="rounded-xl shadow-xl bg-gradient-to-r from-blue-600 to-blue-300 p-6 flex items-center justify-center gap-6 text-white">
          <div className="text-6xl">
            <FaTruck/>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{status.payment || 0}</div>
            <div className="uppercase text-2xl">Orders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
