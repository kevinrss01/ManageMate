import {
  BadgeDelta,
  Button,
  Card,
  DeltaType,
  DonutChart,
  Flex,
  TabGroup,
  Tab,
  TabList,
  Bold,
  Divider,
  List,
  ListItem,
  Metric,
  Text,
  Title,
} from "@tremor/react";
import { getNumberOfFilesByType } from "@/utils/fileUtils";

import React, { useState, useMemo } from "react";
import { FcPieChart, FcBarChart } from "react-icons/fc";

import { UserStateWithId, File } from "@/interfaces/Interfaces";
interface UsersDetailsProps {
  usersData: UserStateWithId[];
  totalStorageBought: number;
  totalFiles: number;
}

interface FilesChart {
  name: string;
  value: number;
  deltaType: string;
}

const AllUsersDetails: React.FC<UsersDetailsProps> = ({
  usersData,
  totalStorageBought,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const allFiles = useMemo(() => {
    let allFiles: File[] = [];

    for (const user of usersData) {
      allFiles = [...allFiles, ...user.files];
    }

    return getNumberOfFilesByType(allFiles);
  }, [usersData]);

  const files: FilesChart[] = [
    {
      name: "Documents",
      value: allFiles.documents,
      deltaType: "increase",
    },
    {
      name: "Videos",
      value: allFiles.videos,
      deltaType: "moderateDecrease",
    },
    {
      name: "Images",
      value: allFiles.images,
      deltaType: "moderateIncrease",
    },
    {
      name: "Autres",
      value: allFiles.others,
      deltaType: "moderateDecrease",
    },
  ];

  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()} fichier${
      number > 1 ? "s" : ""
    }`;

  return (
    <Card className="max-w-md mx-auto">
      <>
        <Flex
          className="space-x-8"
          justifyContent="between"
          alignItems="center"
        >
          <Title>Overview</Title>
          <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
            <TabList variant="solid">
              <Tab icon={FcPieChart}>Chart</Tab>
              <Tab icon={FcBarChart}>Liste</Tab>
            </TabList>
          </TabGroup>
        </Flex>
        <Text className="mt-8">Chiffre d'affaire</Text>
        <Metric>
          {((totalStorageBought / 21474836480) * 20).toString()} €
        </Metric>
        <Divider />
        <Text className="mt-8">
          <Bold>Tous les fichiers</Bold>
        </Text>
        <Text>4 types de fichier</Text>
        {selectedIndex === 0 ? (
          <DonutChart
            data={files}
            showAnimation={false}
            category="value"
            index="name"
            valueFormatter={valueFormatter}
            className="mt-6"
          />
        ) : (
          <>
            <Flex className="mt-8" justifyContent="between">
              <Text className="truncate">
                <Bold>Type de fichier</Bold>
              </Text>
              <Text>Total</Text>
            </Flex>
            <List className="mt-4">
              {files.map((file) => (
                <ListItem key={file.name}>
                  <Text>{file.name}</Text>
                  <Flex justifyContent="end" className="space-x-2">
                    <Text>
                      {Intl.NumberFormat("us").format(file.value).toString()}{" "}
                      fichier{file.value > 1 ? "s" : ""}
                    </Text>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </>
    </Card>
  );
};

export default AllUsersDetails;
