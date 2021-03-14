const {
    Libmon
} = require("../dist")
const assert = require("assert")

describe("Libmon Counter", function() {
    it("crash when counter not intialized", function() {
        try {
            console.log(Libmon)
            Libmon.increment("my-counter")
            assert(false)
        } catch (ex) {
            assert(ex.message.includes("was not setup"))
        }
    })
    it("crash counter with max value", function() {
        try {
            Libmon.setupCounter("ticks-counter", 9)
            for (var i = 1; i <= 10; i++) {
                Libmon.increment("ticks-counter")
            }
            assert(false)
        } catch (ex) {
            assert(ex.message.includes("ticks-counter limit exceeded"))
        }
    })

    it("crash on demand", function() {
        try {
            Libmon.crash()
            assert(false)
        } catch (ex) {
            assert(ex.message.includes("intentional"))
        }
    })

    it("fail validation", async function() {
        Libmon.initialize("demo-library-name")
        const validate = await Libmon.validate("DEMO_TOKEN")
        if (!validate) {
            assert(true)
            return
        }
        assert(false)
    })

    it("succeed validation", async function() {
        const validate = await Libmon.validate("VALID_TOKEN")
        if (validate) {
            assert(true)
            return
        }
        assert(false)
    })
})