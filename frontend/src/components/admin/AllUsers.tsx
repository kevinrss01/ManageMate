import React from "react";
import { UserStateWithId } from "@/interfaces/Interfaces";

interface AllUsersProps {
  users: UserStateWithId[] | undefined;
}

const AllUsers: React.FC<AllUsersProps> = ({ users }: AllUsersProps) => {
  return (
    <>
      <h2 className="text-2xl mt-7">Tous les utilisateurs de Manage Mate</h2>
    </>
  );
};

export default AllUsers;
