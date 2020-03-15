import React, { useReducer } from "react";
import styled from "styled-components";
import { Text, View, TouchableOpacity } from "react-native";
import {
  NeedleType,
  nextInventoryStatus,
  needleTypeToColor
} from "./NeedleType";

const needleSizes = {
  "1": {
    id: "1",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "2.00",
    us: "0"
  },
  "2": {
    id: "2",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "2.25",
    us: "1"
  },
  "3": {
    id: "3",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "2.50",
    us: ""
  },
  "4": {
    id: "4",
    inventoryStatus: NeedleType.STANDARD,
    imperial: "2.75",
    us: "2"
  },
  "5": {
    id: "5",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "3.00",
    us: "2"
  },
  "6": {
    id: "6",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "3.25",
    us: "3"
  },
  "7": {
    id: "7",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "3.50",
    us: "4"
  },
  "8": {
    id: "8",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "3.75",
    us: "5"
  },
  "9": { id: "9", inventoryStatus: NeedleType.LOOP, imperial: "4.00", us: "6" },
  "10": {
    id: "10",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "4.50",
    us: "7"
  },
  "11": {
    id: "11",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "5.00",
    us: "8"
  },
  "12": {
    id: "12",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "5.50",
    us: "9"
  },
  "13": {
    id: "13",
    inventoryStatus: NeedleType.LOOP,
    imperial: "6.00",
    us: "10"
  },
  "14": {
    id: "14",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "6.50",
    us: "10½"
  },
  "15": {
    id: "15",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "7.00",
    us: "10¾"
  },
  "16": {
    id: "16",
    inventoryStatus: NeedleType.STANDARD,
    imperial: "8.00",
    us: "11 "
  },
  "17": {
    id: "17",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "9.00",
    us: "13"
  },
  "18": {
    id: "18",
    inventoryStatus: NeedleType.STANDARD,
    imperial: "10.00",
    us: "15"
  },
  "19": {
    id: "19",
    inventoryStatus: NeedleType.NOT_IN_INVENTORY,
    imperial: "12.00",
    us: "17"
  }
};

interface Needle {
  id: string;
  inventoryStatus: NeedleType;
  imperial: string;
  us: string;
}

const NEXT_INVENTORY_STATUS = "NEXT_INVENTORY_STATUS";

const needlesReducer = (
  state: Record<string, Needle>,
  action
): Record<string, Needle> => {
  switch (action.type) {
    case NEXT_INVENTORY_STATUS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          inventoryStatus: nextInventoryStatus(state[action.id].inventoryStatus)
        }
      };

    default:
      return state;
  }
};

export const MeasureStick = () => {
  const [needles, dispatch] = useReducer(needlesReducer, needleSizes);

  const toggleNeedle = (id: string) => {
    console.log("Execuetes?");
    dispatch({
      type: NEXT_INVENTORY_STATUS,
      id
    });
  };

  return (
    <Container>
      <View>
        <HoleRow
          inventoryStatus={NeedleType.NOT_IN_INVENTORY}
          textLeft="mm"
          textRight="U.S"
          holeSize={0}
        />
        {Object.values(needles).map(({ id, inventoryStatus, imperial, us }) => {
          return (
            <TouchableOpacity onPress={() => toggleNeedle(id)} key={id}>
              <HoleRow
                inventoryStatus={inventoryStatus}
                textLeft={`${imperial}`}
                textRight={`${us}`}
                holeSize={5 * parseFloat(imperial)}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </Container>
  );
};

interface Props {
  holeSize: number;
  textRight: string;
  textLeft: string;
  inventoryStatus: NeedleType;
}

const HoleRow = ({ inventoryStatus, holeSize, textRight, textLeft }: Props) => {
  console.log(
    "Status to color: ",
    inventoryStatus,
    needleTypeToColor(inventoryStatus)
  );

  return (
    <Row>
      <LeftText>{textLeft}</LeftText>
      <View style={{ display: "flex", alignItems: "center" }}>
        <Circle size={holeSize} color={needleTypeToColor(inventoryStatus)} />
      </View>
      <LeftRight>{textRight}</LeftRight>
    </Row>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

const LeftSide = styled.View`
  background-color: white;
  width: 100px;
`;

const Row = styled.View`
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: #d00521;
  display: flex;
  flex-direction: row;
`;

const Circle = styled.View`
  border-radius: 300px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  margin: 10px;
`;

const LeftText = styled.Text`
  text-align: right;
  flex: 1;
  color: white;
`;

const LeftRight = styled.Text`
  flex: 1;
  color: white;
`;
