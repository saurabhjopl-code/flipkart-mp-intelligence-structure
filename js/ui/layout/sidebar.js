const expandableMenus = document.querySelectorAll(".expandable");

expandableMenus.forEach(menu => {
  menu.addEventListener("click", function (e) {
    e.stopPropagation();

    const currentlyOpen = document.querySelector(".expandable.open");

    if (currentlyOpen && currentlyOpen !== this) {
      currentlyOpen.classList.remove("open");
      currentlyOpen.querySelector(".sub-menu").classList.remove("open");
    }

    this.classList.toggle("open");
    const subMenu = this.querySelector(".sub-menu");
    subMenu.classList.toggle("open");
  });
});

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", function () {
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
    this.classList.add("active");
  });
});
