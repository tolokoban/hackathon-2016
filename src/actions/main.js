["demo", [
    ["reset", { 
        today: 20160501,
        firstname: "Homer",
        lastname: "Broken"
    }],
    ["text", "Welcome! Please select a scenario:"],
    ["button", { text: "Mr {{lastname}} limbs a bit", action: "scenario1" }],
    ["button", { text: "Miss <i>blabla</i> has <i>blabla</i>", action: "scenario2" }],
]]
