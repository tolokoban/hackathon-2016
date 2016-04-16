["story", [
    ["reset", { 
        $today: 201605010930,
        firstname: "Homer",
        lastname: "Broken",
        appointments: [
            { date: 201605031500, text: "See my GP for pain." },
            { date: 201605131700, text: "Surgery." },
            { date: 201605080800, text: "X-Ray." }
        ],
        tmp: []
    }],
    ["button", { text: "Surgery scenario", action: "story1:01-start" }]
]]
