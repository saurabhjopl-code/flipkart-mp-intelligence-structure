const navItems = document.querySelectorAll(".nav-item");
const expandableMenus = document.querySelectorAll(".expandable");

/* Close all expandable menus */
function closeAllMenus() {
  expandableMenus.forEach(menu => {
    menu.classList.remove("open");
    const sub = menu.querySelector(".sub-menu");
    if (sub) sub.classList.remove("open");
  });
}

/* Remove all active states */
function clearActiveStates() {
  navItems.forEach(item => item.classList.remove("active"));
  document.querySelectorAll(".sub-item").forEach(item => {
    item.classList.remove("active");
  });
}

/* Expandable menu click */
expandableMenus.forEach(menu => {
  menu.addEventListener("click", function (e) {
    e.stopPropagation();

    const isOpen = this.classList.contains("open");

    // Close everything first
    closeAllMenus();
    clearActiveStates();

    if (!isOpen) {
      this.classList.add("open");
      const sub = this.querySelector(".sub-menu");
      if (sub) sub.classList.add("open");
    }
  });
});

/* Dashboard click */
document.querySelectorAll(".nav-item:not(.expandable)").forEach(item => {
  item.addEventListener("click", function () {

    closeAllMenus();
    clearActiveStates();

    this.classList.add("active");
  });
});

/* Sub-item click */
document.querySelectorAll(".sub-item").forEach(item => {
  item.addEventListener("click", function (e) {
    e.stopPropagation();

    clearActiveStates();
    this.classList.add("active");

    // keep parent open
    const parentMenu = this.closest(".expandable");
    parentMenu.classList.add("open");
    parentMenu.querySelector(".sub-menu").classList.add("open");
  });
});
