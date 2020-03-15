import React, { useState } from "react";
import styled from "styled-components";
import { Text, TextInput, Button } from "react-native";
import { Needle } from "./ItemRow";
import uuidv4 from "uuid/v4";

interface Props {
  createNewItem: (Needle) => void;
}

export const NewItemControl = ({ createNewItem }: Props) => {
  const [needleName, setTitle] = useState<string>("");
  const [needleSize, setNeedleSize] = useState<number>(0.5);
  console.log("title", needleName);

  return (
    <Container>
      <TextInput
        style={{ flex: 1 }}
        value={needleName}
        onChangeText={text => setTitle(text)}
      />
      <RowActionButton
        title="-"
        onPress={() => {
          setNeedleSize(needleSize - 0.1);
        }}
      />
      <Text style={{ paddingLeft: 10, paddingRight: 10 }}>{needleSize} mm</Text>
      <RowActionButton
        title="+"
        onPress={() => {
          setNeedleSize(needleSize + 0.1);
        }}
      />
      <Button
        title="Add"
        onPress={() => {
          createNewItem({ id: uuidv4(), name: needleName, width: 5 });
          setTitle("");
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  background-color: white;
  margin-top: 5px;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RowActionButton = styled.Button`
  width: 30px;
  color: red;
  margin-right: 30px;
`;
