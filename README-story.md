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

