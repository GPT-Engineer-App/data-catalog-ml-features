import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Input, useToast } from "@chakra-ui/react";

const Index = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({
    name: "",
    dataType: "",
    description: "",
  });
  const toast = useToast();

  useEffect(() => {
    const storedFeatures = localStorage.getItem("features");
    if (storedFeatures) {
      setFeatures(JSON.parse(storedFeatures));
    }
  }, []);

  const handleInputChange = (e) => {
    setNewFeature({ ...newFeature, [e.target.name]: e.target.value });
  };

  const handleAddFeature = () => {
    const updatedFeatures = [...features, newFeature];
    setFeatures(updatedFeatures);
    localStorage.setItem("features", JSON.stringify(updatedFeatures));
    setNewFeature({ name: "", dataType: "", description: "" });
    toast({
      title: "Feature added",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Data Catalog
      </Heading>
      <Text mb={4}>This data catalog explains and documents how to use different features for an ML project. The features are stored in the browser's local storage and can be created through the UI.</Text>

      <Heading as="h2" size="lg" mb={2}>
        Features
      </Heading>
      <Table variant="simple" mb={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Data Type</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {features.map((feature) => (
            <Tr key={feature.name}>
              <Td>{feature.name}</Td>
              <Td>{feature.dataType}</Td>
              <Td>{feature.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Heading as="h2" size="lg" mb={2}>
        Create Feature
      </Heading>
      <Box mb={4}>
        <Input name="name" placeholder="Feature Name" value={newFeature.name} onChange={handleInputChange} mb={2} />
        <Input name="dataType" placeholder="Data Type" value={newFeature.dataType} onChange={handleInputChange} mb={2} />
        <Input name="description" placeholder="Description" value={newFeature.description} onChange={handleInputChange} mb={2} />
        <Button colorScheme="blue" onClick={handleAddFeature}>
          Add Feature
        </Button>
      </Box>
    </Box>
  );
};

export default Index;
