export const useSetOverFlow = (isSeatSelectorOpen = false) =>{
    const html = document.querySelector("html");
    html.style.overflow = isSeatSelectorOpen ? "hidden": "visible";
}