import React from "react";
import { Card, Color, Flex, Grid, Icon, Metric, Text } from "@tremor/react";

interface MetricsProps {
  categories: { title: string; metric: string; icon: any; color: Color }[];
}

const Metrics: React.FC<MetricsProps> = ({ categories }) => {
  return (
    <>
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
    </>
  );
};

export default Metrics;
