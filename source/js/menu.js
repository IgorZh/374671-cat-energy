(function() {
  var nav = document.querySelector(".main-nav");

  function handleToggle(e) {
    nav.classList.toggle("main-nav--close");
  }

  document
    .querySelector(".menu-toggle")
    .addEventListener("click", handleToggle);
})();
