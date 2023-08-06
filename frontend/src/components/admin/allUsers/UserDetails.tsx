import React, { useState, useMemo } from "react";
import {
  Card,
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

import { FcPieChart, FcBarChart } from "react-icons/fc";

import { UserStateWithId } from "@/interfaces/Interfaces";
import { formatFileSizeFromBytes } from "@/utils/fileUtils";
interface FilesChart {
  name: string;
  value: number;
  deltaType: string;
}

const UserDetails: React.FC<{ user: UserStateWithId }> = ({ user }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const typeByFile = useMemo(() => {
    return getNumberOfFilesByType(user.files);
  }, [user]);

  const files: FilesChart[] = [
    {
      name: "Documents",
      value: typeByFile.documents,
      deltaType: "increase",
    },
    {
      name: "Videos",
      value: typeByFile.videos,
      deltaType: "moderateDecrease",
    },
    {
      name: "Images",
      value: typeByFile.images,
      deltaType: "moderateIncrease",
    },
    {
      name: "Autres",
      value: typeByFile.others,
      deltaType: "moderateDecrease",
    },
  ];

  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()} fichier${
      number > 1 ? "s" : ""
    }`;

  const totalStorageUsed = useMemo(() => {
    let totalStorageUsed = 0;
    for (const file of user.files) {
      totalStorageUsed += file.size;
    }
    return totalStorageUsed;
  }, [user]);

  return (
    <>
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
          <Text className="mt-8">Stockage acheté par l'utilisateur</Text>
          <Metric>{formatFileSizeFromBytes(user.totalUserStorage)}</Metric>
          <Text className="mt-8">Stockage utilisé</Text>
          <Metric>{formatFileSizeFromBytes(totalStorageUsed)}</Metric>
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
              <Flex className="mt-8" justifyContent="between">
                <Text className="truncate">
                  <Bold>Tous les fichiers de {user.firstName}</Bold>
                </Text>
                <Text>Poids et type</Text>
              </Flex>
              <List className="mt-4">
                {user.files.map((file) => (
                  <ListItem key={file.name}>
                    <Text className="w-[70%] overflow-ellipsis overflow-hidden">
                      {file.name}
                    </Text>
                    <Flex justifyContent="end" className="space-x-2">
                      <Text>
                        {formatFileSizeFromBytes(file.size)} ({file.type})
                      </Text>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </>
      </Card>
    </>
  );
};

export default UserDetails;
