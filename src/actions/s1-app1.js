['app', [
    ['set', {
        appointments: [
            { date: 201605031500, text: "See my GP for pain." },
            { date: 201605131700, text: "Surgery." },
            { date: 201605080800, text: "X-Ray." }
        ]
    }],
    ['loop', {
        list: "appointments",
        item: "tmp.appointment"
    }, [
        ['text', "<b>{{tmp.appointment.date}}</b>: {{tmp.appointment.text}}"]
    ]],
    ['nurse', "Hi {{firstname}},<br/>how can I help you?"],
    ['button', { text: "I limb!", action: "s1-app2" }]
]]
