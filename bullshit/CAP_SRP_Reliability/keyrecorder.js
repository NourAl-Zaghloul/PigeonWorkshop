// TODO! Download Data
let session_id = ""; // TODO: Make this usable
let coder_id = ""; // TODO: Make this usable

// used variables
let RECORDING = false;
let LEFTDOWN = 0;
let RIGHTDOWN = 0;
let action;
let mouserecorder = {
    trial: 1,
    left: 0,
    right: 0,
};

let output = []

// functions
endtrial = function(){
    endButtonPress({button: "endTrial"})
    console.log(mouserecorder);
    mouserecorder.left = mouserecorder.left/1000;
    mouserecorder.right = mouserecorder.right/1000;
    output.push(structuredClone(mouserecorder));
    mouserecorder.trial += 1;
    mouserecorder.left = 0;
    mouserecorder.right = 0;
}

endButtonPress = function(e){
    if(e.button === "endTrial"){
        console.log("endTrial");
        LEFTDOWN > 0 ? mouserecorder.left += performance.now() - LEFTDOWN : 0;
        RIGHTDOWN > 0 ? mouserecorder.right += performance.now() - RIGHTDOWN : 0;
        RIGHTDOWN = LEFTDOWN = 0;
    } else if(e.button === 0){
        mouserecorder.left += performance.now() - LEFTDOWN;
        LEFTDOWN = 0;
    } else if (e.button === 2){
        mouserecorder.right += performance.now() - RIGHTDOWN;
        RIGHTDOWN = 0;
    }
}

printCSV = function(content, filename) {
    // Create a blob
    var blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
  
    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  }


// Event Listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        RECORDING = !RECORDING;
        if(RECORDING){
            output = [];
            console.log('recording');
            // TODO! change css to indicate recording is in progress
        } else {
            endtrial();
            console.log('end recording');
            console.log(output)
            // TODO! Make output visible/downloadable
        }
    } else if (e.key === ' ' & RECORDING) {
        endtrial();
    } else if (e.key === 'p' & !RECORDING){
        let csvContent = output.map(e => `${e.trial},${e.left},${e.right},\n`);
        csvContent.unshift("trial,left,right,\n"); //data:text/csv;charset=utf-8,
        csvContent = csvContent.join("");
        printCSV(csvContent, `Reliability_${new Date().toISOString().replace(/.\d+Z$/g, "Z")}.csv`)
    }
});

document.addEventListener('mousedown', (e) => {
    if(RECORDING){
        if(e.button === 0){
            LEFTDOWN = performance.now();
        } else if (e.button === 2){
            RIGHTDOWN = performance.now();
        }
    }
});

document.addEventListener('mouseup', (e) => {
    if(RECORDING){
        endButtonPress(e);
    }
});

// Stops the right-click context menu from popping up
window.oncontextmenu = function () {
    return false;
 };

