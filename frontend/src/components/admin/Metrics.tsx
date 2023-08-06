import React, { useMemo } from "react";
import { Card, Color, Flex, Grid, Icon, Metric, Text } from "@tremor/react";
import { UserStateWithId } from "@/interfaces/Interfaces";
import { BsCashCoin, BsDatabaseFillLock } from "react-icons/bs";
import { formatFileSizeFromBytes } from "@/utils/fileUtils";
import { AiOutlineDatabase, AiFillCrown } from "react-icons/ai";
import { GiFiles } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import AllUsersDetails from "./metrics/AllUsersDetails";

interface MetricsProps {
  usersData: UserStateWithId[];
}

const getAllStorageBought = (users: UserStateWithId[]) => {
  let total = 0;
  for (const user of users) {
    total += user.totalUserStorage;
  }
  return total;
};

const getTotalStorageUsed = (users: UserStateWithId[]) => {
  let totalUsed = 0;

  for (const user of users) {
    for (const file of user.files) {
      totalUsed += file.size;
    }
  }
  return totalUsed;
};

const getTotalFiles = (users: UserStateWithId[]) => {
  let totalFiles = 0;

  for (const user of users) {
    totalFiles += user.files.length;
  }
  return totalFiles;
};

const getTotalAdmin = (users: UserStateWithId[]) => {
  let totalAdmin = 0;

  for (const user of users) {
    if (user.role === "admin") {
      totalAdmin += 1;
    }
  }
  return totalAdmin;
};

const Metrics: React.FC<MetricsProps> = ({ usersData }) => {
  //UseMemo is used to avoid re-rendering the component when the data changes and improve performance
  const totalStorageBought = useMemo(
    () => getAllStorageBought(usersData),
    [usersData]
  );
  const totalStorageUsed = useMemo(
    () => getTotalStorageUsed(usersData),
    [usersData]
  );
  const totalFiles = useMemo(() => getTotalFiles(usersData), [usersData]);

  const categories: {
    title: string;
    metric: string;
    icon: any;
    color: Color;
  }[] = [
    {
      title: "Chiffre d'affaire",
      metric: ((totalStorageBought / 21474836480) * 20).toString() + " €",
      icon: BsCashCoin,
      color: "indigo",
    },
    {
      title: "Stockage vendu total",
      metric: formatFileSizeFromBytes(totalStorageBought),
      icon: AiOutlineDatabase,
      color: "blue",
    },
    {
      title: "Stockage utilisé total",
      metric: formatFileSizeFromBytes(totalStorageUsed),
      icon: BsDatabaseFillLock,
      color: "red",
    },
    {
      title: "Nombre total de fichier",
      metric: totalFiles.toString() || "inconnu",
      icon: GiFiles,
      color: "green",
    },
    {
      title: "Nombre d'utilisateurs",
      metric: usersData?.length.toString() || "inconnu",
      icon: FiUsers,
      color: "amber",
    },
    {
      title: "Nombre d'admin",
      metric: getTotalAdmin(usersData).toString() || "inconnu",
      icon: AiFillCrown,
      color: "rose",
    },
  ];

  return (
    <div className="flex items-center  justify-center">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {categories.map((item) => (
          <Card key={item.title} decoration="top" decorationColor={item.color}>
            <Flex justifyContent="start" className="space-x-4">
              <Icon
                icon={item.icon}
                variant="light"
                size="xl"
                color={item.color}
              />
              <div className="truncate">
                <Text>{item.title}</Text>
                <Metric className="truncate">{item.metric}</Metric>
              </div>
            </Flex>
          </Card>
        ))}
      </Grid>
      <AllUsersDetails
        usersData={usersData}
        totalStorageBought={totalStorageBought}
        totalFiles={totalFiles}
      />
    </div>
  );
};

export default Metrics;
