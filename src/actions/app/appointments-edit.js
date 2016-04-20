['app', [
    ['text', '<h1>Appointment</h1>'],
    ['input-date', { data: 'tmp.apt.date', text: 'Date' }],
    ['input-select', { 
        data: 'tmp.apt.type', 
        text: 'Type',
        options: ['Type 1', 'Type 2']
    }],
    ['input-text', { data: 'tmp.apt.reason', text: 'Reason' }],
    ['input-text', { data: 'tmp.apt.specialist', text: 'Specialist' }],
    ['button', { text: "Back", action: "appointments" }]
]]
