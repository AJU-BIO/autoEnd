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

  // 갤러리 생성 함수
  function createGallery() {
    const gallery = document.getElementById("imageGallery");
    const popup = document.getElementById("imagePopup");
    const popupImg = document.getElementById("popupImage");
    const closeBtn = document.querySelector(".close-btn");

    galleryImages.forEach((item, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";

      const imgContainer = document.createElement("div");
      imgContainer.className = "gallery-img-container";

      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.alt;

      // 이미지 클릭 이벤트 추가
      imgContainer.addEventListener("click", () => {
        popup.classList.add("active");
        popupImg.src = item.url;
        popupImg.alt = item.alt;
        document.body.style.overflow = "hidden"; // 스크롤 방지
      });

      const textContainer = document.createElement("div");
      textContainer.className = "gallery-text-container";
      textContainer.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;

      imgContainer.appendChild(img);
      galleryItem.appendChild(index % 2 === 0 ? imgContainer : textContainer);
      galleryItem.appendChild(index % 2 === 0 ? textContainer : imgContainer);

      gallery.appendChild(galleryItem);
    });

    // 팝업 닫기 이벤트
    function closePopup() {
      popup.classList.remove("active");
      document.body.style.overflow = ""; // 스크롤 복원
    }

    // X 버튼 클릭으로 닫기
    closeBtn.addEventListener("click", closePopup);

    // 팝업 배경 클릭으로 닫기
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        closePopup();
      }
    });

    // ESC 키로 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && popup.classList.contains("active")) {
        closePopup();
      }
    });
  }

  // 갤러리 생성 함수 호출
  createGallery();
});

// 이미지 데이터
const galleryImages = [
  {
    url: "/img/10minutes.png",
    alt: "Gallery Image 1",
    title: "Just 10 Minutes",
    description: "10분만에 프로그램의 진가를 알아봐준 분도 계십니다 ^^",
  },
  {
    url: "/img/1500sales.png",
    alt: "Gallery Image 2",
    title: "매출이 무려 3배 상승",
    description:
      "프로그램 사용전 최고 500, 평균 300에서<br>이제 천만원 중반대 돌파!!",
  },
  {
    url: "/img/highPerformance.png",
    alt: "Gallery Image 3",
    title: "결과로 모든걸 말한다.",
    description: "판매확률 증가 → 판매건수 증가<br>매출 증가",
  },
  {
    url: "/img/kMongBestProgram.png",
    alt: "Gallery Image 4",
    title: "순간의 선택이 매출을 좌우합니다.",
    description: "대다수의 오토소싱 유저는 타 프로그램 사용경험이 있습니다.",
  },
  {
    url: "/img/thanksTo.png",
    alt: "Gallery Image 4",
    title: "저희도 감사합니다.",
    description:
      "힘들게 고민해서 만든 프로그램<br>진가를 알아보고 사용해주셔서 감사합니다.",
  },
  {
    url: "/img/kMongBestProgram.png",
    alt: "Gallery Image 4",
    title: "순간의 선택이 매출을 좌우합니다.",
    description: "대다수의 오토소싱 유저는 타 프로그램 사용경험이 있습니다.",
  },
];
