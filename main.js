// 리뷰 데이터를 담은 JSON
const reviewData = [
  {
    imgSrc: "img/1500sales.png",
    title: "바로 1,500만원 매출 달성!",
    description: "오토소싱 쓰자마자 500만원대 매출이 천만원 돌파",
  },
  {
    imgSrc: "img/10minutes.png",
    title: "10분만에 '이건 찐이다!!'",
    description: "명검은 칼자루에서 뽑기전부터 알아볼 수 있다구!",
  },
  {
    imgSrc: "img/highPerformance.png",
    title: "매출건수도!! 매출도!!",
    description:
      "단순히 매출큰게 많이 팔리는게 아니라, 내가 올린 모든 것이 잘 팔린다!!",
  },
  {
    imgSrc: "img/highschool1.png",
    title: "고등학생이 아니라 이젠 사업가!",
    description: "고등학생도 오토소싱만 있다면, 사업이 가능",
  },
  {
    imgSrc: "img/highschool2.png",
    title: "반자동에 최적화된 프로그램?!",
    description: "좋은 프로그램은 좋은 셀러로 부터 나옵니다 ^^",
  },
  {
    imgSrc: "img/kMongBestProgram.png",
    title: "최고의 프로그램이란?",
    description:
      "타 프로그램 대비 장점이 뚜렷한것! 많은 분들이 확인해주셨습니다.",
  },
  {
    imgSrc: "img/thanksTo.png",
    title: "매출건수도!! 매출도!!",
    description:
      "가장 좋은 마케팅은 가장 좋은 프로그램을 만드는 것이라고 믿고 있습니다.",
  },
];

// 리뷰 섹션 생성 함수
function createReviews() {
  const reviewContainer = document.querySelector("#sec4 .box.container");

  // 기존 내용을 비우고
  reviewContainer.innerHTML = "";

  // 각 리뷰 데이터에 대해 HTML 요소 생성
  reviewData.forEach((review) => {
    const reviewBox = document.createElement("div");
    reviewBox.className = "box review";

    reviewBox.innerHTML = `
            <img src="${review.imgSrc}" alt="후기" class="review__img clickable"/>
            <p class="review__title">${review.title}</p>
            <p class="review__description">${review.description}</p>
        `;

    reviewContainer.appendChild(reviewBox);
  });
}

// 모달 관련 코드 추가
function createImageModal() {
  // 모달 컨테이너 생성
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";
  modalContainer.style.display = "none";

  // 닫기 버튼 추가
  const closeButton = document.createElement("button");
  closeButton.className = "modal-close";
  closeButton.innerHTML = "×";

  // 모달 이미지 컨테이너
  const modalImage = document.createElement("img");
  modalImage.className = "modal-image";

  modalContainer.appendChild(closeButton);
  modalContainer.appendChild(modalImage);
  document.body.appendChild(modalContainer);

  // 클릭 가능한 모든 이미지에 이벤트 리스너 추가
  document.querySelectorAll("img.clickable").forEach((img) => {
    img.addEventListener("click", () => {
      modalImage.src = img.src;
      modalContainer.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // 닫기 기능
  const closeModal = () => {
    modalContainer.style.display = "none";
    document.body.style.overflow = "auto";
  };

  closeButton.addEventListener("click", closeModal);
  modalImage.addEventListener("click", closeModal);
}

// DOM이 로드된 후 모달 초기화
document.addEventListener("DOMContentLoaded", () => {
  createReviews();
  createImageModal();

  // 구매 버튼 스크롤 이벤트
  const buyButton = document.querySelector(".buybtn__link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      // 스크롤이 100px 이상 내려갔을 때
      buyButton.style.background =
        "linear-gradient(to right, #4a00e0, #0066ff)";
      buyButton.style.color = "#ffffff";
      buyButton.style.border = "none";
    } else {
      buyButton.style.background = ""; // 원래 스타일로 복구
      buyButton.style.color = "";
      buyButton.style.border = "1px solid #ccc";
    }
  });

  // 햄버거 메뉴 기능 수정
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const nav = document.querySelector(".header__nav");

  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active"); // 햄버거 버튼 상태 토글
    nav.classList.toggle("active"); // 네비게이션 메뉴 토글

    // 메뉴가 열려있을 때 외부 클릭시 닫기
    if (nav.classList.contains("active")) {
      document.addEventListener("click", function closeMenu(e) {
        if (!nav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
          nav.classList.remove("active");
          hamburgerBtn.classList.remove("active");
          document.removeEventListener("click", closeMenu);
        }
      });
    }
  });

  // 타이핑 효과
  const texts = ["오토소싱", "오토엔드"];
  let textIndex = 0;
  const typingElement = document.querySelector(".typing");
  let charIndex = 0;
  let isDeleting = false;

  function typing() {
    const currentText = texts[textIndex];
    const displayText = currentText.substring(0, charIndex);
    typingElement.textContent = displayText;

    if (!isDeleting && charIndex === currentText.length) {
      // 타이핑 완료, 1.5초 후 삭제 시작
      setTimeout(() => (isDeleting = true), 1500);
    } else if (isDeleting && charIndex === 0) {
      // 삭제 완료, 다음 텍스트로 전환
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typing, 500);
      return;
    }

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    const speed = isDeleting ? 100 : 200;
    setTimeout(typing, speed);
  }

  typing();
});
