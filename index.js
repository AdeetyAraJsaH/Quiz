const buttons = Array.from(document.getElementsByClassName("btn"));
buttons.forEach(button => {
    button.addEventListener("click", e => {
        
        setTimeout(1000);
    });
});