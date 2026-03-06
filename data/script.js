let songs = [];

fetch("data/songs.csv")
.then(r=>r.text())
.then(text=>{

let rows = text.split("\n");
rows.shift();

songs = rows.map(r=>{
let c = r.split(",");

return {
title:c[1],
artist:c[2],
date:c[3],
sub:c[4],
link:c[5]
};

});

render(songs);

});

function render(list){

let html="";

list.slice(0,50).forEach(s=>{

let archive = `${s.date}-${s.sub}`;

html+=`
<div class="song">
<b>${s.title}</b><br>
${s.artist}<br>
${archive}<br>
<a href="${s.link}" target="_blank">▶ Play</a>
</div>
`;

});

document.getElementById("songList").innerHTML=html;

}

document.getElementById("search").addEventListener("input",e=>{

let q = e.target.value.toLowerCase();

let filtered = songs.filter(s=>
s.title.toLowerCase().includes(q)
);

render(filtered);

});

document.getElementById("random").onclick=()=>{

let r = songs[Math.floor(Math.random()*songs.length)];

window.open(r.link);

};
