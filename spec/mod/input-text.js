require("input-text",function(t,e){var a=require("dom"),n=require("data");e.exports=function(t){var e=a.tag("input",{type:"text"}),r=a.tag("label","text",[a.div([t.text]),e]);return"undefined"!=typeof n.get(t.data)&&(e.value=n.get(t.data)),e.addEventListener("blur",function(){n.set(t.data,e.value),n.save()}),r}});
//# sourceMappingURL=input-text.js.map