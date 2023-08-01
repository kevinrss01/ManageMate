import React, { useState, Fragment, useMemo } from "react";
import { UserStateWithId } from "@/interfaces/Interfaces";
import {
  Card,
  Title,
  Text,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
} from "@tremor/react";
import { Dialog, Transition } from "@headlessui/react";
import UserDetails from "@/components/admin/UserDetails";

interface AllUsersProps {
  users: UserStateWithId[];
}

const AllUsers: React.FC<AllUsersProps> = ({ users }: AllUsersProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const userData = useMemo(() => {
    if (!userId) {
      return null;
    }
    return users.find((user) => user.id === userId);
  }, [userId, users]);

  const closeModal = (): any => {
    setIsOpen(false);
  };

  const openModal = (userId: string): any => {
    setUserId(userId);
    setIsOpen(true);
  };

  return (
    <>
      <h2 className="text-2xl mt-7">Tous les utilisateurs de Manage Mate</h2>
      <Card className="mt-6">
        <Flex justifyContent="start" className="space-x-2">
          <Title>Nombre d'utilisateurs : </Title>
          <Badge color="gray">{users.length}</Badge>
        </Flex>
        <Text className="mt-2">
          Tous les utilisateurs et leurs informations
        </Text>

        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Nom</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Lien</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    color={user.role === "user" ? "green" : "red"}
                    size="xs"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="xs"
                    variant="secondary"
                    color="gray"
                    onClick={() => openModal(user.id)}
                  >
                    See details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white
                                    p-6 text-left align-middle shadow-tremor transition-all rounded-xl"
                >
                  {userData ? (
                    <UserDetails user={userData} />
                  ) : (
                    <Title>Aucune information trouvée</Title>
                  )}

                  <Button
                    className="mt-2 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                    onClick={closeModal}
                  >
                    Retour
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AllUsers;
