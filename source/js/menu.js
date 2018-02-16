(function() {
  var nav = document.querySelector(".main-nav");
  var toggleContainer = document.querySelector(".menu-toggle");
  var toggleButton = document.querySelector(".menu-toggle__button");

  toggleContainer.classList.toggle("menu-toggle--close");

  handleToggle();

  function handleToggle() {
    nav.classList.toggle("main-nav--close");
  }

  toggleButton.addEventListener("click", handleToggle);
})();
