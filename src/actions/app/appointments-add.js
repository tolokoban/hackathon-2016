['app', [
    ['text', '<h1>New appointment</h1>'],
    ['set', {
        "tmp.apt.date": "{{$today}}",
        "tmp.apt.text": ""
    }],
    ['input-date', { data: 'tmp.apt.date', text: 'Date' }],
    ['input-text', { data: 'tmp.apt.reason', text: 'Reason' }],
    ['input-text', { data: 'tmp.apt.xxx', text: 'Specialist' }],
    ['input-file', { data: 'tmp.apt.xxx', text: 'Attachment...' }],
    ['row', [
        ['button', { text: "Add", action: [
            function() {
                this.push( "appointments", this.get( "tmp.apt" ) );
            },
            "appointments"
        ]}],
        ['button', { text: "Cancel", action: "appointments" }]
    ]]
]]
