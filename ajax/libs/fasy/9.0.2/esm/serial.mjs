/*! Fasy: serial.mjs
    v9.0.2 (c) 2022 Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
import defineConcurrentAPI from"./concurrent.mjs";var serial=defineConcurrentAPI(1);export default serial;export let{reduce:reduce}=serial;export let{reduceRight:reduceRight}=serial;export let{pipe:pipe}=serial;export let{compose:compose}=serial;export let{filter:filter}=serial;export let{filterIn:filterIn}=serial;export let{filterOut:filterOut}=serial;export let{forEach:forEach}=serial;export let{map:map}=serial;export let{flatMap:flatMap}=serial;