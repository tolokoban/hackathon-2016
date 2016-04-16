['app', [
    ['text', '<h1>Appointment</h1>'],
    ['text', 'Date: <b>{{appointments[arg1].date|datetime}}</b>'],
    ['text', 'Location: <b>{{appointments[arg1].location}}</b>'],
    ['text', 'Reason: <b>{{appointments[arg1].reason}}</b>'],
    ['text', 'Specialist: <b>{{appointments[arg1].specialist}}</b>'],
    ['text', 'Name: <b>{{appointments[arg1].name}}</b>'],
    ['row', [
        ['button', { text: "Edit", action: "appointments-edit/{{arg1}}" }],
        ['button', {
            text: "Delete",
            action: [
                function() {
                    this.remove( "appointments", "arg1" );
                },
                "appointments"
            ]
        }]
    ]],
    ['button', { text: "Back", action: "appointments" }]
]]
