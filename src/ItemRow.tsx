import React from "react";
import { Text, Button } from "react-native";
import styled from "styled-components";

export interface Needle {
  id: string;
  name: string;
  width: number;
}

interface Props {
  needle: Needle;
}

export const ItemRow = ({ needle }: Props) => {
  return (
    <ItemRowContainer>
      <RowMainText>{needle.name}</RowMainText>
      <SizeText>{needle.width}</SizeText>
    </ItemRowContainer>
  );
};

const RowMainText = styled.Text`
  flex: 1;
  padding: 5px;
`;

const SizeText = styled.Text``;

const ItemRowContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px;
  border-radius: 6px;
`;
