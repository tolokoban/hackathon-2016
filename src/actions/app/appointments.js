['app', [
    ['text', "<h1>Appointments List</h1>"],
    ['button', {
        text: "Add new appointment",
        action: "appointments-add"
    }],
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
            text: "<div><b>{{tmp.apt.date|datetime}}</b><br/>{{tmp.apt.text}}</div>",
            freeze: "tmp.apt.$key",
            action: "appointments-view/{{tmp.apt.$key}}"
        }]
    ]],
    ['text', '<hr/>'],
    ['button', { text: "back", action: "app:start" }]
]]
