['app', [
    ['input-text', { data: 'tmp.date', text: 'Date' }],
    ['input-text', { data: 'tmp.text', text: 'Subject' }],
    ['button', { text: "Add", action: [
        function() {
            this.push(
                "appointments",
                {
                    date: this.get('tmp.date'),
                    text: this.get('tmp.text')
                }
            );
        },
        "s1-app1"
    ]}],
    ['button', { text: "Cancel", action: "s1-app" }]
]]
