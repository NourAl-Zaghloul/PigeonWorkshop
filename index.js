let projects = [
    {name: 'Activity Logger', url: "activity-logger.pigeonworkshop.com/"}
]

let iframe = document.getElementById('preview');

function grabRandomProject(){
    let index = Math.floor(Math.random() * (projects.length - 1 + 1));
    console.log(projects[index].url);
    iframe.src = projects[index].url;
    console.log(iframe.src)
    return index
}