require("input-date",function(e,t){var a=require("dom"),n=require("data");t.exports=function(e){var t=a.tag("input",{type:"datetime"}),r=a.tag("label","text",[a.div([e.text]),t]);return"undefined"!=typeof n.get(e.data)&&(t.value=n.get(e.data)),t.addEventListener("blur",function(){n.set(e.data,t.value),n.save()}),r}});
//# sourceMappingURL=input-date.js.map