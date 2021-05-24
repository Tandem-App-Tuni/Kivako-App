const { timeStamp } = require("console");

class ChatBox {
    capitalizeWords(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
}
  
const component = new ChatBox();
describe("Testing ChatBox component's capitalizeWords function", () => {
    test("Testing capitalizeWords(\"true\"). Should return True", () => {
        expect(component.capitalizeWords("true")).toBe("True");
    });
    test("Testing capitalizeWords(\"j\"). Should return J", () => {
        expect(component.capitalizeWords("j")).toBe("J");
    });
    test("Testing capitalizeWords(\"TEST\"). Should return Test", () => {
        expect(component.capitalizeWords("tEST")).toBe("Test");
    });
});


describe("Trivial tests", () => {
    test("Testing whether true == true. Should be true", () => {
        expect("True").toBe("True");
    })
    test("Testing whether true is truthy. Should be true", () => {
        expect(true).toBeTruthy();
    })
    test("Testing whether false is falsy. Should be true", () => {
        expect(true == false).toBeFalsy();
    })
})
