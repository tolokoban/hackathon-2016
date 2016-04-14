['app', [
    ['nurse', "Ho! I'm sorry.<br/>I think you should call your GP."],
    ['button', { text: "{{gp.name}} <i>{{gp.phone}}</i>", action: "s1-demo3" }],
    ['button', { text: "Find another one", action: "s1-demo3" }],
    ['input-bool', { data: "vaccination.ror.done", text: "Vaccination againts turtles" }],
    ['input-text', { data: "firstname", text: "Firstname" }],
    ['input-file', { data: "x-ray", text: "X-Ray scan" }]
]]
