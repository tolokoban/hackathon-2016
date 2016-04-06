module.exports = {
    start: {
        question: "Hello!<br/>What is your problem?",
        answers: [
            [ "I've toothache", "toothache" ],
            [ "I've a pain in my chest", "emergency"],
            [ "I sneeze often", "gp" ]
        ]
    },
    toothache: {
        question: "Did you have the same pain before today?",
        answers: [
            [ "Yes", "dentist" ],
            [ "No", "washteeth"]
        ]
    },
    washteeth: {
        question: "Wash your teeth as your mom used to say!!!",
        answers: [
            [ "Ok, I gonna wash my teeth..." ]
        ]
    },
    dentist: {
        question: "You should take an appointment to the dentist.<br>What do you prefer?",
        answers: [
            [ "I call my personnal one" ],
            [ "I want to find another one", "#/book/dentist" ]
        ]
    },
    emergency: {
        question: "Call <b>immedialtly</b> the emergencies!<br><big><big>112</big></big>",
        answers: [
            [ "Ok" ]
        ]
    },

    reminder1: {
        question: "You have an appointement with your GP <b>tomorrow</b>.<br/>Please confirm your vaccinations.",
        answers: [
            { data: "vaccins.tetanos.bool", caption: "Tétanos, polyomyélite" },
            { data: "vaccins.rougeole.bool", caption: "Rougeole, oreillons" },
            { data: "vaccins.fievrejaune.bool", caption: "Fièvre jaune" },
            [ "Confirm" ]
        ]
    },
    reminder2: {
        question: "You have to go to the hospital <b>next week</b>.<br/>Please confirm your allergies.",
        answers: [
            { data: "allergies.dust.bool", caption: "Dust" },
            { data: "allergies.penicilin.bool", caption: "Penicillin" },
            { data: "allergies.work.bool", caption: "Work" },
            { data: "allergies.stepmother.bool", caption: "Step mother" },
            [ "Confirm" ]
        ]
    }
};
