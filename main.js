let bullshit = [
    {text: "currently only thing here", value: "yup"},
    {text: "Simple Reliability", value: "CAP_SRP_Reliability"}
];



function randomBullshit(){
    window.location.assign(`./bullshit/${bullshit[Math.floor(Math.random() * bullshit.length)].value}`);
}

function curatedBullshit(){
    let bullshitDOM = document.getElementById("selectBullshit")
    for(let i = 0; i < bullshit.length; i++){
        let bullshitOption = new Option(bullshit[i].text, bullshit[i].value);
        bullshitDOM.add(bullshitOption);
    }
    console.log("there's your bullshit");
}

function selectBullshit(){
    let bullshitDOM = document.getElementById("selectBullshit");
    window.location.assign(`./bullshit/${bullshitDOM.value}`);
}