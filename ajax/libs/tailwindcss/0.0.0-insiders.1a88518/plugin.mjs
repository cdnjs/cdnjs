function g(n,i){return{handler:n,config:i}}g.withOptions=function(n,i=()=>({})){function t(o){return{handler:n(o),config:i(o)}}return t.__isOptionsFunction=!0,t};var u=g;export{u as default};
