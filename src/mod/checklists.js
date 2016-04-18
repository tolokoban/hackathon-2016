exports.surgery = [
    ['button', {text:'My demographic and insurance data', child: []}],
    ['button', {
        text:'Physiotherapy Information', child: [
            ['button', {text:'Instructions for pre- and post-surgery preparation'}],
            ['button', {text:'Plan for pre-surgery preparation'}],
            ['button', {text:'Plan for post-surgery preparation'}],
        ]
    }],
    ['button', {text:'Pre-anesthetic Assessment', child: [
        ['checkbox', {text:'Patient history', P: false, D: true}], // in Doctor's portal it's a RW textarea
        ['checkbox', {text:'Airway examination', P: false, D: true}], // in Doctor's portal it's a RW textarea
        ['checkbox', {text:'Blood examination', P: false, D: true}], // in Doctor's portal it's a RW textarea
        ['checkbox', {text:'Breathing examination', P: false, D: true}], // in Doctor's portal it's a RW textarea
        ['checkbox', {text:'Clinical examination', P: false, D: true}], // in Doctor's portal it's a RW textarea
        ['checkbox', {text:'Co-morbidities', P: false, D: true}], // in Doctor's portal it's a RW textarea
        ['checkbox', {text:'Guidelines for pre-surgery self-observation', P: true, D: true}, ['textarea', {P: true, D: true}],
         ['checkbox', {text:'Drugs and Alergies', P: true, D: true}, ['list', {P: true, D: true}]], // Physician intialises the list, patient could update it
         ['checkbox', {text:'Pre-surgery drug intake guideline', P: false, D: true}, ['textarea'], {P: false, D: true}],
         ['checkbox', {text:'Previous anaesthesia and surgeries', P: false, D: true}, ['textarea'], {P: false, D: true}],
         ['checkbox', {text:'Case for surgery', P: false, D: true}, ['textarea'], {P: false, D: true}], // textarea if the case is dismissed
         ['checkbox', {text:'Fluid guidelines', P: false, D: true}, ['textarea'], {P: false, D: true}], // provide guidelines in the textarea
         ['checkbox', {text:'Fasting guidelines', P: false, D: true}, ['textarea'], {P: false, D: true}], // provide guidelines in the textarea
         ['checkbox', {text:'Physical status', P: false, D: true}, ['textarea'], {P: false, D: true}], // provide status in the textarea
         ['checkbox', {text:'Patient signed the consent', P: false, D: true}]
        ]}
               ],
     ['button', {text:'Useful information', child: [
         ['checkbox', {text:'Personal documents (ID Card, Insurance Card)', P:true, D:false}],
         ['checkbox', {text:'Hygiene (toothbrush,...)', P: true, D: false}],
         ['checkbox', {text:'Clothing', P: true, D: false}]
     ]}
     ],
     ['checkbox', {text:'Modification of health status', P: true, D: false}, ['textarea', {P: true}]
     ];
