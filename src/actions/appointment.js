['app', [
    ['text', '<h1>Appointment</h1>'],
    ['text', '<code>arg0 = "{{arg0}}"</code>'],
    ['text', '<code>arg1 = "{{arg1}}"</code>'],
    ['text', '<b>{{appointments[arg1].date|datetime}}</b>'],
    ['text', '{{appointments[arg1].text}}'],
    ['button', { text: "Back", action: "s1-app1" }]
]]
