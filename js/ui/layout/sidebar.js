document.querySelectorAll(".expandable").forEach(menu => {
  menu.addEventListener("click", function () {
    const subMenu = this.querySelector(".sub-menu");
    subMenu.style.display = subMenu.style.display === "block" ? "none" : "block";
  });
});

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", function () {
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
    this.classList.add("active");
  });
});
