['app', [
    ['nurse', "Ho! I'm sorry.<br/>I think you should call your GP."],
    ['button', { text: "{{gp.name}} <i>{{gp.phone}}</i>", action: "s1-app2" }],
    ['button', { text: "Find another one", action: "" }],
    ['input-bool', { data: "vaccination.ror.done", text: "Vaccination againts turtles" }],
    ['input-text', { data: "firstname", text: "Firstname" }],
    ['input-file', { data: "x-ray", text: "X-Ray scan" }]
]]
