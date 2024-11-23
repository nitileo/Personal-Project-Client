import useAdminStore from "@/src/stores/adminStore";
import useUserStore from "@/src/stores/userStore";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const TableAdmin = () => {
  const members = useAdminStore((state) => state.members);
  const token = useUserStore((state) => state.token);
  const currentUserId = useUserStore((state) => state.user?.id); // Get current logged-in user's ID
  const currentUserRole = useUserStore((state) => state.user?.role); // Get current logged-in user's role
  const actionGetMember = useAdminStore((state) => state.actionGetMember);
  const actionUpdateMember = useAdminStore((state) => state.actionUpdateMember);
  const actionBannedMember = useAdminStore((state) => state.actionBannedMember);
  const actionUnbannedMember = useAdminStore(
    (state) => state.actionUnbannedMember
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await actionGetMember(token);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlBanned = async (id) => {
    try {
      await actionBannedMember(token, id);
      toast.success(`User ${id} was banned`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const hdlUnBanned = async (id) => {
    try {
      await actionUnbannedMember(token, id);
      toast.success(`User ${id} was unbanned`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const hdlUpdateMember = async (e, id) => {
    const role = e.target.value;
    try {
      await actionUpdateMember(token, id, role);
      toast.success("Update Role Success");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            ID
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            User
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Role
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {members.map((el) => (
          <tr key={el.id} className="hover:bg-gray-100">
            <th scope="row" className="px-4 py-2">
              {el.id}
            </th>
            <td className="px-4 py-2">
              {el.email}
              {el.isDeleted && (
                <span className="text-red-500 text-sm ml-2">Banned</span>
              )}
            </td>
            <td className="px-4 py-2">
              {/* Only allow role change for users who aren't admins or the logged-in user */}
              {currentUserId !== el.id && currentUserRole !== "ADMIN" ? (
                <select
                  defaultValue={el.role}
                  onChange={(e) => hdlUpdateMember(e, el.id)}
                  className="rounded-md"
                >
                  <option>ADMIN</option>
                  <option>USER</option>
                </select>
              ) : (
                <span>{el.role}</span>
              )}
            </td>
            <td className="px-4 py-2">
              {el.isDelete ? (
                <span className="text-red-500 font-semibold">Banned</span>
              ) : (
                <span className="text-green-500 font-semibold">Active</span>
              )}
            </td>
            <td className="px-4 py-2">
              {/* Disable block button for self and other admins */}
              {el.isDelete ? (
                <button
                  className="bg-green-300 text-white p-2 rounded-md"
                  onClick={() => hdlUnBanned(el.id)}
                >
                  UnBlock
                </button>
              ) : (
                <button
                  className="bg-red-400 text-white p-2 rounded-md"
                  onClick={() => hdlBanned(el.id)}
                  disabled={el.role === "ADMIN" || el.id === currentUserId} // Disable if user is ADMIN or the logged-in user
                >
                  Block
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableAdmin;
