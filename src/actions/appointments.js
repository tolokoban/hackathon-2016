['app', [
    ['set', {
        appointments: [
            { date: 201605031500, text: "See my GP for pain." },
            { date: 201605131700, text: "Surgery." },
            { date: 201605080800, text: "X-Ray." }
        ]
    }],
    ['button', { text: 'Record a new one', action: "new-appointment" }],
    ['loop', {
        list: "appointments",
        item: "tmp.appointment",
        sort: "date",
        filter: function( item ) {
            return item.text.indexOf( 'Ray' ) == -1;
        }
    }, [
        ['text', "<b>{{tmp.appointment.date}}</b>: {{tmp.appointment.text}}"]
    ]]
]]
