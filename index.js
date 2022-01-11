let projects = [
    {name: 'Activity Logger', url: "activityLogger.pigeonworkshop.com/"}
]

let iframe = document.getElementById('preview');

function grabRandomProject(){
    let index = Math.floor(Math.random() * (projects.length - 1 + 1));
    console.log(projects[index].name);
    iframe.src = projects[index].url;
    return index
}