export enum NeedleType {
  STANDARD = 0,
  LOOP,
  NOT_IN_INVENTORY
}

export const nextInventoryStatus = (needleType: NeedleType): NeedleType => {
  const strEnum = NeedleType[(needleType + 1) % 3];
  return NeedleType[strEnum];
};

export const needleTypeToColor = (needleType: NeedleType) => {
  switch (needleType) {
    case NeedleType.STANDARD:
      return "#4CAF50";
    case NeedleType.LOOP:
      return "#1882F9";
    case NeedleType.NOT_IN_INVENTORY:
      return "white";
    default:
      return "red";
  }
};
