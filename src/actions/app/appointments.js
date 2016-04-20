['app', [
    ['text', "<h1>Appointments</h1>"],
    /*
     ['button', {
     text: "Add new appointment",
     action: "appointments-add"
     }],
     */
    ['button', { text: "Past appointments", action: "app:start" }],
    ['loop', {
        list: "appointments",
        item: "tmp.apt",
        sort: "date",
        filter: function( item ) {
            return true; //item.text.indexOf( 'Ray' ) == -1;
        }
    }, [
        ['button', {
            style: 'box',
            text: "<div><b>{{tmp.apt.date|datetime}}</b><br/>{{tmp.apt.name}}<br/>{{tmp.apt.specialist}}</div>",
            freeze: "tmp.apt.$key",
            action: "appointments-view/{{tmp.apt.$key}}"
        }]
    ]],
    ['button', { text: "Add manually", action: "" }],
    ['text', '<hr/>'],
    ['button', { text: "back", action: "app:start" }]
]]
