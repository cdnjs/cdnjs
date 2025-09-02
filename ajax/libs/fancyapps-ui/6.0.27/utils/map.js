/*! License details at fancyapps.com/license */
import{clamp as o}from"./clamp.js";const t=function(t=0,n=0,r=0,c=0,m=0,p=!1){const s=(t-n)/(r-n)*(m-c)+c;return p?c<m?o(c,s,m):o(m,s,c):s};export{t as map};
