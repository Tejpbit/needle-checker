import React, { useState, useEffect, useReducer } from "react";
import {
  Text,
  Button,
  AsyncStorage,
  StatusBar,
  ScrollView,
  SafeAreaView
} from "react-native";
import LegacyStorage from "@react-native-community/async-storage-backend-legacy";
import AsyncStorageFactory from "@react-native-community/async-storage";
import styled from "styled-components";
import { ItemRow, Needle } from "./src/ItemRow";
import { NewItemControl } from "./src/NewItemControl";
import { MeasureStick } from "./src/MeasureStick";
import { ErrorBoundary } from "./ErrorBoundary";

interface AppState {
  needles: { [key: string]: Needle };
}

const ADD_NEEDLE = "ADD_NEEDLE";

const initialState: AppState = {
  needles: {
    needle1: { name: "needle1", id: "neddle1", width: 5 }
  }
};

type AppReducer = (state, action) => AppState;
interface Action {
  type: string;
  payload: any;
}
const reducer: AppReducer = (state, action) => {
  switch (action.type) {
    case ADD_NEEDLE:
      console.log("action", action);

      return {
        ...state,
        needles: {
          ...state.needles,
          [action.payload.id]: action.payload
        }
      };
    default:
      return initialState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer<AppReducer>(reducer, initialState);

  return (
    <ErrorBoundary
      fallback={error => {
        return <Text>{error}</Text>;
      }}
    >
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <AppContainer>
          <ScrollView>
            <MeasureStick />
            <Text>Scrollview</Text>
            {Object.values(state.needles).map((i: Needle) => (
              <ItemRow key={i.id} needle={i} />
            ))}
          </ScrollView>

          <NewItemControl
            createNewItem={(needle: Needle) =>
              dispatch({ type: ADD_NEEDLE, payload: needle })
            }
          />
        </AppContainer>
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const AppContainer = styled.View`
  display: flex;

  margin-top: ${StatusBar.currentHeight};
`;
