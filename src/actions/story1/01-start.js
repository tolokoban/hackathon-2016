['story', [
    ["reset", {
        $today: 201605011200,
        $next: "story1:02-surgeon-first-meeting",
        dg: {
            firstname: "Homer",
            lastname: "Simpson"
        },
        appointments: []
    }],
    ['text', "Patient felt pain.<br/> Patient took an appointment wih GP.<br/> GP referred patient to consult surgeon.</br> Patient took appointment with surgeon"],
    ['button', { text: '{{dg.firstname}} opens its App', action: "app:start" }]
]]
