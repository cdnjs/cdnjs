function getparam(a,e){return e||(e=window.location.href),new URL(e).searchParams.get(a)}

let s=a=>document.getElementById(a);

let playit=() =>{
    let arr = JSON.parse(atob(getparam('play'))) ;
    console.log(arr);window.arr = arr;
    s('video').src = arr.vidurl;
    s('video').poster = arr.vidposter;
    s('title').innerText = arr.vidtitle;
    s('description').innerHTML = arr.viddesc;
}
if(getparam('play')){
    s('tool').style.display = "none";
    playit();
} else {
    s('wrapper').style.display = "none";
}


let getbase=()=>{
    let ply = [];
    ply.vidurl = s('vidurl').value,
    ply.vidtitle = s('vidtitle').value,
    ply.viddesc = s('viddesc').value;
    ply.vidposter = s('vidposter').value;
    console.log(ply);
    var arr = JSON.stringify(Object.assign({}, ply))
    return btoa(arr);
}
let preview=()=>{
    ply = getbase();
    let link = location.href+'?play='+ply;
    console.log('<iframe src="'+link+'" width="100%" height="100%" frameborder="0"></iframe>');
    s('preview').innerHTML='<iframe src="'+link+'" width="100%" height="700px" frameborder="0"></iframe>'
}

let embed=()=>{
    ply = getbase();
    let link = location.href+'?play='+ply;
    s('code').innerText='<iframe cite="'+location.href+'" src="'+link+'" width="853" height="480" title="SopPlayer video player - '+s('vidtitle').value+'" frameborder="0" scrolling="no" style="overflow: hidden" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
}
