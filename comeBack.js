let docTitle = document.title;
Window.addEventListener("blur",()=>{
document.title = "Вернись";
})
window.addEventListener("focus",()=>{
document.title = docTitle;
})