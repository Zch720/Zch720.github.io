let element_sideMenuButton = document.getElementById("side-menu-but");
let element_sideMenuBack = document.getElementById("side-menu-back");

function onClick_sideMenuBack() {
    element_sideMenuButton.checked = false;
    onClick_sideMenu(false);
}

function onClick_sideMenu(checked) {
    if(checked) {
        element_sideMenuBack.style["display"] = "block";
    } else {
        element_sideMenuBack.style["display"] = "none";
    }
}