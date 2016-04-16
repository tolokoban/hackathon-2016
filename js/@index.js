/**********************************************************************
 require( 'require' )
 -----------------------------------------------------------------------
 @example

 var Path = require("node://path");  // Only in NodeJS/NW.js environment.
 var Button = require("tfw.button");

 **********************************************************************/

var require = function() {
    var modules = {};
    var definitions = {};
    var nodejs_require = typeof window.require === 'function' ? window.require : null;

    var f = function(id, body) {
        if( id.substr( 0, 7 ) == 'node://' ) {
            // Calling for a NodeJS module.
            if( !nodejs_require ) {
                throw Error( "[require] NodeJS is not available to load module `" + id + "`!" );
            }
            return nodejs_require( id.substr( 7 ) );
        }

        if( typeof body === 'function' ) {
            definitions[id] = body;
            return;
        }
        var mod;
        body = definitions[id];
        if (typeof body === 'undefined') {
            var err = new Error("Required module is missing: " + id);   
            console.error(err.stack);
            throw err;
        }
        mod = modules[id];
        if (typeof mod === 'undefined') {
            mod = {exports: {}};
            var exports = mod.exports;
            body(exports, mod);
            modules[id] = mod.exports;
            mod = mod.exports;
            //console.log("Module initialized: " + id);
        }
        return mod;
    };
    return f;
}();
function addListener(e,l) {
    if (window.addEventListener) {
        window.addEventListener(e,l,false);
    } else {
        window.attachEvent('on' + e, l);
    }
};

addListener(
    'DOMContentLoaded',
    function() {
        document.body.parentNode.$data = {};
        // Attach controllers.
        require('actions', function(exports, module) {
exports['app:appointments-add'] = ['app', [
    ['text', '<h1>New appointment</h1>'],
    ['set', {
        "tmp.apt.date": "{{$today}}",
        "tmp.apt.text": ""
    }],
    ['input-date', { data: 'tmp.apt.date', text: 'Date' }],
    ['input-text', { data: 'tmp.apt.text', text: 'Subject' }],
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

exports['app:appointments-edit'] = ['app', [
    ['text', '<h1>Appointment</h1>'],
    ['input-date', { text: "Date", data: 'appointments[arg1].date' }],
    ['input-text', { text: "Subject", data: 'appointments[arg1].text' }],
    ['button', { text: "Back", action: "appointments" }]
]]

exports['app:appointments-view'] = ['app', [
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

exports['app:appointments'] = ['app', [
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

exports['app:demographic'] = ['app', [
    ['input-text', { text: "Firstname", data: "dg.firstname" }],
    ['input-text', { text: "Lastname", data: "dg.lastname" }],
    ['buton', { text: "OK", data: "app:start" }],
]]

exports['app:start'] = ['app', [
    ['nurse', "How can I help you {{dg.firstname}} {{dg.lastname}}?"],
    ['button', { text: "I took an appointment.", action: "appointments" }],
    ['button', { text: "Edit demographic.", action: "demographic" }],
    ['button', { text: "I want to send my data.", action: "" }],
    ['button', { text: "I want to add data.", action: "" }]
]]

exports['appointment'] = ['app', [
    ['text', '<h1>Appointment</h1>'],
    ['text', '<code>arg0 = "{{arg0}}"</code>'],
    ['text', '<code>arg1 = "{{arg1}}"</code>'],
    ['text', '<b>{{appointments[arg1].date|datetime}}</b>'],
    ['text', '{{appointments[arg1].text}}'],
    ['button', { text: "Back", action: "s1-app1" }]
]]

exports['appointments'] = ['app', [
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

exports['dusan-test'] = // Excellent!
//------------
// hackathon-2016 git access rights testing
function myTest() {
  document.getElementById("test").innerHTML = "Test works";
}

exports['main'] = ["story", [
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
    ["button", { text: "Surgery scenario", action: "story1:start" }]
]]

exports['new-appointment'] = ['app', [
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

exports['personal-data'] = ['app', [
    ['input-text', { data: 'firstname', text: "Firstname" }],
    ['input-text', { data: 'lastname', text: "Lastname" }],
    ['button', { text: "Back", action: "s1-app1" }]
]]

exports['s1-app1'] = ['app', [
    ['set', {
        appointments: [
            { date: 201605031500, text: "See my GP for pain." },
            { date: 201605131700, text: "Surgery." },
            { date: 201605080800, text: "X-Ray." }
        ]
    }],
    ['nurse', "Hi {{firstname}},<br/>how can I help you?"],
    ['button', { text: "I limb a bit!", action: "s1-app2" }],
    ['button', { text: "Edit personal data", action: "personal-data" }],
    ['button', { text: "New Appointment", action: "new-appointment" }],
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
            action: "appointment/{{tmp.apt.$key}}"
        }]
    ]]
]]

exports['s1-app2'] = ['app', [
    ['nurse', "Ho! I'm sorry.<br/>I think you should call your GP."],
    ['button', { text: "{{gp.name}} <i>{{gp.phone}}</i>", action: "s1-demo3" }],
    ['button', { text: "Find another one", action: "s1-demo3" }],
    ['input-bool', { data: "vaccination.ror.done", text: "Vaccination againts turtles" }],
    ['input-text', { data: "firstname", text: "Firstname" }],
    ['input-file', { data: "x-ray", text: "X-Ray scan" }]
]]

exports['s1-demo3'] = ['demo', [
    ['text', "{{firstname}} {{lastname}} calls the doctor's secretary and get an appointment for May 5, 2016."],
    ['button', { text: "He records the appointment in pHM&trade;", action: "s1-app1" }]
]]

exports['scenario1'] = ['demo', [
    ['reset', {
        today: 20160501,
        "gp.name": "Dr Frankenstein",
        "gp.phone": "+4122666000",
        appointments: [
            { date: 201605031500, text: "See my GP for pain." },
            { date: 201605131700, text: "Surgery." },
            { date: 201605080800, text: "X-Ray." }
        ]
    }],
    ['text', "{{today|date}} - Mr {{lastname}} limps a lot."],
    ['button', { text: "He looks at his pHM&trade; app", action: "s1-app1" }]
]]

exports['story1:01-start'] = ['story', [
    ["reset", {
        $next: "story1:02-surgeon-first-meeting",
        dg: {
            firstname: "Homer",
            lastname: "Simpson"
        },
        appointments: []
    }],
    ['text', "Patient felt pain.<br/> Patient took an appointment wih GP.<br/> GP referred patient to consult surgeon.</br> Patient took appointment with surgeon. </br> with surgeon."],
    ['button', { text: 'App', action: "app:start" }]
]]

exports['story1:02-surgeon-first-meeting'] = ['story', [
    ["set", {
        $next: "story1:03-radiology-blood-appointment"
    }],
    ['text', "Surgeon provides consultation services and prescribes radio., blood..."],
    ['text', "Appointments taken for radio, blood..."],

    ['button', { text: "APP", action: "app:start" }]
]]

exports['story1:admission'] = ['story', [
    ["set", {
        $next: "story1:check-in-surgery"
    }],
    ['text', " Prepare for the admission (for patient service) "],
 ['button', { text: 'App', action: "app:start" }],
]]

exports['story1:anaesthetist-appointment'] = ['story', [
    ["set", {
        $next: "story1:pre-surgery-anaesthetist-consultation"
    }],
    ['text', "Patient waits for the anaesthetist to propose the date and time for the consultation appointment  "],
 ['button', { text: 'App', action: "app:start" }],
]]

exports['story1:check-in-surgery'] = ['story', [
    ["set", {
        $next: ""
    }],
    ['text', " Check in surgery "],
 ['button', { text: 'App', action: "app:start" }],
]]

exports['story1:diagnosis-meeting'] = ['story', [
    ["set", {
        $next: "story1:physiotherapy-appointment"
    }],
    ['text', "Surgeon provides the diagnosis and prescribes the intervention, the treatment and the physiotherapy"],
 ['button', { text: 'App', action: "app:start" }]
]]

exports['story1:intervention-appointment'] = ['story', [
    ["set", {
        $next: "story1:anaesthetist-appointment"
    }],
    ['text', "Patient takes the appointment for the intervention "],
 ['button', { text: 'App', action: "app:start" }],
]]

exports['story1:physiotherapy-appointment'] = ['story', [
    ["set", {
        $next: "story1:physiotherapy-meeting"
    }],
    ['text', "Patient takes the appointment for the consultation with the physiotherapist "],
 ['button', { text: 'App', action: "app:start" }]
]]

exports['story1:physiotherapy-meeting'] = ['story', [
    ["set", {
        $next: "story1:intervention-appointment"
    }],
    ['text', "Physiotherapist proposes the therapy "],
 ['button', { text: 'App', action: "app:start" }]
]]

exports['story1:pre-admission-testing'] = ['story', [
    ["set", {
        $next: "story1:admission"
    }],
    ['text', " Do the pre-admission testing "],
 ['button', { text: 'App', action: "app:start" }],
]]

exports['story1:pre-surgery-anaesthetist-consultation'] = ['story', [
    ["set", {
        $next: "story1:pre-admission-testing"
    }],
    ['text', " Pre surgery consultation with the anaesthetist "],
 ['button', { text: 'App', action: "app:start" }],
]]

exports['story1:radiology-appointment'] = ['story', [
    ["set", {
        $next: "story1:blood-appointment"
    }],
    ['text', "Patient takes a radiology appointment"],
 ['button', { text: 'App', action: "app:start" }]
]]

exports['story1:start'] = ['story', [
    ["reset", {
        $next: "story1:surgeon-first-meeting",
        dg: {
            firstname: "Homer",
            lastname: "Simpson"
        },
        appointments: []
    }],
    ['text', "Patient felt pain.<br/> Patient took an appointment wih GP.<br/> GP referred patient to consult surgeon.</br> Patient took appointment with surgeon. </br> with surgeon."],
    ['button', { text: 'App', action: "app:start" }]
]]

exports['tutorial:app-appointments-add'] = ['app', [
    ['text', '<h1>New appointment</h1>'],
    ['set', {
        "tmp.apt.date": "{{$today}}",
        "tmp.apt.text": ""
    }],
    ['input-text', { data: 'tmp.apt.date', text: 'Date' }],
    ['input-text', { data: 'tmp.apt.text', text: 'Subject' }],
    ['row', [
        ['button', { text: "Add", action: [
            function() {
                this.push( "appointments", this.get( "tmp.apt" ) );
            },
            "app-appointments"
        ]}],
        ['button', { text: "Cancel", action: "app-appointments" }]
    ]]
]]

exports['tutorial:app-appointments-edit'] = ['app', [
    ['text', '<h1>Appointment</h1>'],
    ['input-date', { text: "Date", data: 'appointments[arg1].date' }],
    ['input-text', { text: "Subject", data: 'appointments[arg1].text' }],
    ['button', { text: "Back", action: "app-appointments" }]
]]

exports['tutorial:app-appointments-view'] = ['app', [
    ['text', '<h1>Appointment</h1>'],
    ['text', '<b>{{appointments[arg1].date|datetime}}</b>'],
    ['text', '{{appointments[arg1].text}}'],
    ['row', [
        ['button', { text: "Edit", action: "app-appointments-edit/{{arg1}}" }],
        ['button', {
            text: "Delete",
            action: [
                function() {
                    this.remove( "appointments", "arg1" );
                },
                "app-appointments"
            ]
        }]
    ]],
    ['button', { text: "Back", action: "app-appointments" }]
]]

exports['tutorial:app-appointments'] = ['app', [
    ['text', "<h1>Appointments List</h1>"],
    ['button', {
        text: "Add new appointment",
        action: "app-appointments-add"
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
            action: "app-appointments-view/{{tmp.apt.$key}}"
        }]
    ]]    
]]

exports['tutorial:start'] = ["story", [
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
    ["button", { text: "Start the tutorial", action: "app-appointments" }]
]]

});
APP = require('app');
setTimeout(function (){if(typeof APP.start==='function')APP.start()});
/****************************************
<x-template name="nurse">
        <div class="hint">
            <div class="nurse-question">
                <div $tpl="text"/>
            </div>
        </div>
    </x-template>
****************************************/
require('x-template').register("nurse", function( root ) {
    var $ = require( 'dom' );
    var elem1 = $.div( "hint" );
    root.appendChild( elem1 );
    var elem2 = $.div( "nurse-question" );
    elem1.appendChild( elem2 );
    var elem3 = $.div();
    elem2.appendChild( elem3 );
    return { "text": elem3 };
});

    }
);
