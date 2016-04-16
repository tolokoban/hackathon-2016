['app', [
    ['text', '<h1>Appointment</h1>'],
    ['text', '<b>{{appointments[arg1].date|datetime}}</b>'],
    ['text', '{{appointments[arg1].text}}'],
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
