['demo', [
    ['reset', {
        today: 20160501,
        "gp.name": "Dr Frankenstein",
        "gp.phone": "+4122666000",
        appointments: [
            { date: 201605031500, text: "See my GP for pain." },
            { date: 201605131700, text: "Surgery." },
            { date: 201605080800, text: "X-Ray." }
        ]
    }],
    ['text', "{{today|date}} - Mr {{lastname}} limps a lot."],
    ['button', { text: "He looks at his pHM&trade; app", action: "s1-app1" }]
]]
