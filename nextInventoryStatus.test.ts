import { NeedleType, nextInventoryStatus } from "./src/NeedleType";

describe("next inventory status", () => {
  it("should return loop", () => {
    expect(nextInventoryStatus(NeedleType.STANDARD)).toEqual(NeedleType.LOOP);
  });

  it("should return standard", () => {
    expect(nextInventoryStatus(NeedleType.NOT_IN_INVENTORY)).toEqual(
      NeedleType.STANDARD
    );
  });
});
