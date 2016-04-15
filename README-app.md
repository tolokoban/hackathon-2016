## Example from the APP point of view

Working on the APP part is similar to the work on the STORY part.
But relationships between actions can be more complex.

Here is an example of management of a list of appointments. The following schema shows these relationships.

![Relationships between actions](img/graph.dot.png)

### main.js
```js
["story", [
    ["reset", { 
        $today: 201605010930,
        firstname: "Homer",
        lastname: "Broken",
        appointments: [
            { date: 201605031500, text: "See my GP for pain." },
            { date: 201605131700, text: "Surgery." },
            { date: 201605080800, text: "X-Ray." }
        ],
        tmp: []
    }],
    ["button", { text: "Test appointments list", action: "app-appointments" }]
]]
```

### appointments.js
```js
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
        // This function can be used to filter elements from the array.
        filter: function( item ) {
            return true;
        }
    }, [
        ['button', {
            style: 'box',            
            text: "<div><b>{{tmp.apt.date|datetime}}</b><br/>{{tmp.apt.text}}</div>",
            // The expression of the `action` attribute is only parsed at click.
            // But because you are in a loop, `tmp.apt.$key` is overwritten for each item.
            // Freezing it prevent the action from using the last assigned value.
            freeze: "tmp.apt.$key",
            // Arrays are more to be considered as database tables.
            // Each element has a `$key` attribute that is its unique ID.
            action: "appointments-view/{{tmp.apt.$key}}"
        }]
    ]]    
]]
```

### appointments-add.js
```js
['app', [
    ['text', '<h1>New appointment</h1>'],
    ['set', {
        "tmp.apt.date": "{{$today}}",
        "tmp.apt.text": ""
    }],
    ['input-text', { data: 'tmp.apt.date', text: 'Date' }],
    ['input-text', { data: 'tmp.apt.text', text: 'Subject' }],
    ['row', [
        // When an `action` is an array, each element of this item are evaluated one by one.
        // The first one that returns a string stops the loop and trigger that action.
        // Here, we use a javascript function which returns nothing. So we evaluate "appointments".
        ['button', { text: "Add", action: [
            function() {
                this.push( "appointments", this.get( "tmp.apt" ) );
            },
            "appointments"
        ]}],
        ['button', { text: "Cancel", action: "appointments" }]
    ]]
]]
```

### appointments-view.js
```js
['app', [
    ['text', '<h1>Appointment</h1>'],
    ['text', '<b>{{appointments[arg1].date|datetime}}</b>'],
    ['text', '{{appointments[arg1].text}}'],
    ['row', [
        ['button', { text: "Edit", action: "appointments-edit/{{arg1}}" }],
        ['button', {
            text: "Delete",
            action: [
                function() {
                    this.remove( "appointments", "arg1" );
                },
                "appointments"
            ]
        }]
    ]],
    ['button', { text: "Back", action: "appointments" }]
]]
```

### appointments-edit.js
```js
['app', [
    ['text', '<h1>Appointment</h1>'],
    // Inputs are binded to data.
    ['input-date', { text: "Date", data: 'appointments[arg1].date' }],
    ['input-text', { text: "Subject", data: 'appointments[arg1].text' }],
    ['button', { text: "Back", action: "app-appointments" }]
]]
```

