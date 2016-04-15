# hackathon-2016

This is the demonstration we could show at the Geneva Hackathon 2016.
You can [see the result here](http://tolokoban.github.io/hackathon-2016/#main).

## Example from the story point of view

Follows an example of story and how it is implemented with action files.

> May 1, 2016 - 15:30  
> Kilian Jornet is running in the mountain.  
> But suddenly, he falls and sprains his right ankle.  
> He returns in his car with a limp.  
> He launches the APP.


```js
// File: "s1-start.js"
['story', [
  // `reset` means that you want fresh data in the APP.
  ['reset', {
    'info.firstname': 'Kilian',
    'info.lastname': 'JORNET',
    // Let's define an empty list of appointments.
    appointments: [],
    // Data starting with a `$` are demo specific.
    // `$today` is used to set to current datetime of the current action.
    // Internally, dates have this format: YYYYMMDDhhmm
    $today: 201605011530,
    // `$next` is the action to take when the APP is closed.
    $next: "s1-back-to-home"
  }],
  // `text` is free HTML.
  // Double curlies are used to insert data.
  // `|datetime` format a date in a human readable way.
  ['text', '<b>{{today|datetime}}</b>'],
  ['text', '{{info.firstname}} {{info.lastname}} is running in the mountain.'],
  ['text', 'But suddenly, he falls and sprains his right ankle.'],
  ['text', 'He returns in his car with a limp.'],
  ['button', { text: 'He launches the APP', action: 'app' }],
]]
```

We don't describe here the `app.js` file which is about the APP. Just focus on the story point of view.

> May 1, 2016 - 17:45  
> Kilian call his doctor and get an appointment for tomorrow 9:00 AM.
> He registers this appointment in his APP.

```js
['story', [
  // Using `set` instead of `reset` will add new data, but doesn't reset the existing data.
  ['set', {
    $today: 201605011745,
    $next: "s1-next"
  }],
  ['text', '<b>{{today|datetime}}</b>'],
  ['text', '{{info.firstname}}  call his doctor and get an appointment for tomorrow 9:00 AM.'],
  ['button', { text: "He registers this appointment in his APP.", action: 'app' }]
]]
```

That's all that need to be known for story makers.

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

