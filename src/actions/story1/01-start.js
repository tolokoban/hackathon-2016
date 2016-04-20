['story', [
    ["reset", {
        $today: 201601011200,
        $next: "story1:02-surgeon-first-meeting",
        dg: {
            firstname: "Marie",
            lastname: "Simpson"
        },
        appointments: [
            { 
                date: 201603011830, 
                location: "HUG, rue-Gabrielle-Perret-Gentil 4, 3AL",
                reason: "Chronic rhumatism", 
                specialist: "Orthopaedist Surgeon",
                name: "Dr. Femur" 
            }
        ]
    }],
    ['text', "{{dg.firstname}} finally find out in which clinics the orthopaedist was working, and after difficulties to get an availability, she finally gets an appointment."],
    ['button', { text: '{{dg.firstname}} received an alert', action: "app:start" }]
]]
