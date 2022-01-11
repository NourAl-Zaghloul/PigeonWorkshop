let projects = [
    {name: 'Activity Logger', url: "https://www.pigeonworkshop.com/activityLogger"}
]

let iframe = document.getElementById('preview');

function grabRandomProject(){
    let index = Math.floor(Math.random() * (projects.length - 1 + 1));
    console.log(projects[index].name);
    iframe.src = projects[index].url;
    return index
}