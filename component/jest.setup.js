// Note: no "@" in front of "firebase" here
jest.mock("firebase/storage", () => {
  return {
    getStorage: jest.fn()
  };
});