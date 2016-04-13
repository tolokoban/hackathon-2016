['app', [
    ['input-text', { data: 'tmp.date', text: 'Date' }],
    ['input-text', { data: 'tmp.text', text: 'Subject' }],
    ['button', { text: "Add", action: [
        function() {
            var appointments = this.get('appointments');
            appointments.push({
                date: this.get('tmp.date'),
                text: this.get('tmp.text')
            });
        },
        "appointments"
    ]}]
]]
