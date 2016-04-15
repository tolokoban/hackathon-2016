['app', [
    ['text', '<h1>New appointment</h1>'],
    ['set', {
        "tmp.apt.date": "{{$today}}",
        "tmp.apt.text": ""
    }],
    ['input-text', { data: 'tmp.apt.date', text: 'Date' }],
    ['input-text', { data: 'tmp.apt.text', text: 'Subject' }],
    ['row', [
        ['button', { text: "Add", action: [
            function() {
                this.push( "appointments", this.get( "tmp.apt" ) );
            },
            "app-appointments"
        ]}],
        ['button', { text: "Cancel", action: "app-appointments" }]
    ]]
]]
