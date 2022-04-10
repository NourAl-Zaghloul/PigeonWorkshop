let projects = [
    {name: 'Activity Logger', url: `${window.location.href}activityLogger.html`},
    {name: 'CSS Looks', url: `${window.location.href}cssLooks.html`},
]

let iframe = document.getElementById('preview');

function grabRandomProject(){
    let index = Math.floor(Math.random() * (projects.length));
    console.log(`${projects[index].name}: ${projects[index].url}`);
    iframe.src = projects[index].url;
    if(iframe.hidden){iframe.hidden = false}
    return index
}