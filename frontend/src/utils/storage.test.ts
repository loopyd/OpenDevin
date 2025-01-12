import { getCachedConfig } from "./storage";

describe("getCachedConfig", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    Storage.prototype.getItem = jest.fn();
  });

  it("should return an empty object when local storage is null or undefined", () => {
    (Storage.prototype.getItem as jest.Mock).mockReturnValue(null);
    expect(getCachedConfig()).toEqual({});

    (Storage.prototype.getItem as jest.Mock).mockReturnValue(undefined);
    expect(getCachedConfig()).toEqual({});
  });

  it("should return an empty object when local storage has invalid JSON", () => {
    (Storage.prototype.getItem as jest.Mock).mockReturnValue("invalid JSON");
    expect(getCachedConfig()).toEqual({});
  });

  it("should return parsed object when local storage has valid JSON", () => {
    const validJSON = '{"key":"value"}';
    (Storage.prototype.getItem as jest.Mock).mockReturnValue(validJSON);
    expect(getCachedConfig()).toEqual({ key: "value" });
  });
});
