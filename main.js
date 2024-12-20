document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const nav = document.querySelector(".header__nav");
  const navItems = document.querySelectorAll(".nav__item a");

  // 햄버거 버튼 클릭 이벤트
  hamburgerBtn.addEventListener("click", function () {
    nav.classList.toggle("active");
    hamburgerBtn.classList.toggle("active");
  });

  // 메뉴 아이템 클릭시 메뉴 닫기
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      nav.classList.remove("active");
      hamburgerBtn.classList.remove("active");
    });
  });

  // 화면 크기가 변경될 때 메뉴 상태 초기화
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      nav.classList.remove("active");
      hamburgerBtn.classList.remove("active");
    }
  });
});
