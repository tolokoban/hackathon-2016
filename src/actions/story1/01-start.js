['story', [
    ["reset", {
        $next: "story1:02-surgeon-first-meeting",
        dg: {
            firstname: "Homer",
            lastname: "Simpson"
        },
        appointments: []
    }],
    ['text', "Patient felt pain.<br/> Patient took an appointment wih GP.<br/> GP referred patient to consult surgeon.</br> Patient took appointment with surgeon. </br> with surgeon."],
    ['button', { text: 'App', action: "app:start" }]
]]
