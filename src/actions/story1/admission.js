['story', [
    ["set", {
        $next: "story1:check-in-surgery"
    }],
    ['text', " Prepare for the admission (for patient service) "],
 ['button', { text: 'App', action: "app:start" }],
]]
