let lightMode =  sessionStorage.getItem("light-mode");
if(lightMode == null){
    lightMode = false;
    sessionStorage.setItem("light-mode", lightMode);
}

if(lightMode == "true")
    document.body.classList.add("light");    
