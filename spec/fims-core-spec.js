describe("The library", () => {

    var core;

    beforeEach(() => {
        core = require("../lib/fims-core")
    })

    it("has a default context url", () => {
        expect(core.getDefaultContextURL()).toBeDefined();
    });

    it("has a default context", () => {
        expect(core.getDefaultContext()).toBeDefined();
    });

});
