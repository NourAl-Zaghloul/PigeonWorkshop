let selectTheme = document.getElementById('changeCSS');

function changeCSS(){
    console.log(selectTheme.value);
    document.documentElement.className = selectTheme.value;
}

selectTheme.addEventListener('change', changeCSS);