function createPurchaseModal() {
  // 모달 컨테이너 생성
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";

  // 모달 내용

  const checkList = [
    "1. 오토소싱은 1년 라이선스제로, 구매 후 환불이 불가하며, 라이선스 승계는 1회만 가능합니다.",
    "2. 오토소싱은 브랜드 및 지재권 확인 기능이 없으니, 금지어를 참고해 사용자가 직접 판단해야 합니다.",
    "3. 자동 생성된 상품명은 검토가 필요하며, 무게(배송비)는 직접 입력해야 합니다.",
    "4. 기술적 문제로 일주일 이상 서비스 불가 시, 세팅비(10만원)와 사용료를 일할 계산하여 전액 환불됩니다.",
    "5. 1인 1라이선스 사용 원칙이며, 무단 배포 및 공동 사용 시 법적 책임이 발생할 수 있습니다.",
  ];

  const modalContent = `
        <div class="modal-content">
            <h2 class="fsz-lg">구매 신청</h2>
            <form id="purchaseForm">
                <div class="input-group fsz-sm">
                    <label for="name">이름</label>
                    <input type="text" id="name" required>
                </div>
                
                <div class="input-group fsz-sm">
                    <label for="phone">핸드폰번호</label>
                    <input type="tel" id="phone" required>
                </div>
                
                <div class="input-group fsz-sm">
                    <label for="email">이메일주소</label>
                    <input type="email" id="email" required>
                </div> 
                
                <div class="input-group fsz-sm"> 
                    <label>개인정보 수집 및 이용 동의</label>
                    <div class="terms-box">
                        <div class="terms-content">
                            개인정보 수집 및 이용에 대한 동의<br><br>
                            오토엔드(이하 "회사")는 구매자의 원활한 서비스 제공 및 구매자 식별을 위해 아래와 같이 개인정보를 수집 및 이용하고자 합니다.<br><br>
                            수집하는 개인정보 항목<br>
                            - 이름<br>
                            - 핸드폰 번호<br>
                            - 이메일 주소<br><br>
                            개인정보의 수집 및 이용 목적<br>
                            - 구매자 식별 및 서비스 제공<br>
                            - 서비스 관련 안내 및 고객 지원<br><br>
                            개인정보의 보유 및 이용 기간<br>
                            - 구매일로부터 서비스 종료 후 1년 또는 관계 법령에 따른 보관 기간<br><br>
                            동의를 거부할 권리 및 불이익<br>
                            - 개인정보 제공 동의를 거부할 권리가 있습니다.<br>
                            - 다만, 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.<br>
                            동의하시는 경우, 아래 입력란에 "동의"를 입력해 주시기 바랍니다.<br>
                            입력하신 내용은 동의의 의사로 간주되며, 추후 동의 철회가 가능함을 알려드립니다.
                        </div>
                    </div>
                    <input type="text" id="agreement" placeholder="'동의'를 입력해주세요" required>
                </div>
                
                <div class="headline fsz-sm">신청 전 체크리스트 <span class="fsz-sm">(동의 시, 체크)</span></div>
                <div class="input-group checklist-box">
                    <div class="checklist-box">
                        ${checkList
                          .map(
                            (item, index) => `<div class="checklist-item">
                            <label for="check${index + 1}">${item}</label>
                            <input type="checkbox" id="check${
                              index + 1
                            }" required>
                        </div>`
                          )
                          .join("\n")}
                        <!-- 나머지 4개의 체크박스 항목도 여기에 추가 -->
                    </div>
                </div>
                
                <div class="button-group">
                    <button type="submit">신청하기</button>
                    <button type="button" class="close-modal">취소</button>
                </div>
            </form>
        </div>
    `;

  modalContainer.innerHTML = modalContent;

  // 이벤트 리스너 추가
  modalContainer.querySelector(".close-modal").addEventListener("click", () => {
    modalContainer.remove();
  });

  modalContainer
    .querySelector("#purchaseForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // 체크리스트 검증
      const checkboxes = document.querySelectorAll(
        '.checklist-item input[type="checkbox"]'
      );
      for (let checkbox of checkboxes) {
        if (!checkbox.checked) {
          showAlertModal("모든 항목에 동의하지 않을 경우, 신청이 불가합니다.");
          resetButton();
          return;
        }
      }

      // 제출 버튼 찾기
      const submitButton = e.target.querySelector('button[type="submit"]');

      // 버튼 비활성화 및 스타일 변경
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "#ccc";
      submitButton.textContent = "신청 중...";

      const name = document.querySelector("#name").value.trim();
      const phone = document.querySelector("#phone").value.trim();
      const email = document.querySelector("#email").value.trim();
      const agreement = document.querySelector("#agreement").value.trim();

      // 데이터 객체 생성
      const submitData = {
        name,
        phone,
        email,
        agreement,
      };

      // 체크리스트 항목 추가
      checkboxes.forEach((checkbox, index) => {
        submitData[`checklist_${index + 1}`] = checkbox.checked;
      });

      // 유효성 검사 함수
      const resetButton = () => {
        submitButton.disabled = false;
        submitButton.style.backgroundColor = "";
        submitButton.textContent = "신청하기";
      };

      if (!name) {
        showAlertModal("이름을 입력해주세요.");
        resetButton();
        return;
      }
      if (!phone) {
        showAlertModal("핸드폰번호를 입력해주세요.");
        resetButton();
        return;
      }
      if (!email) {
        showAlertModal("이메일을 입력해주세요.");
        resetButton();
        return;
      }
      if (agreement !== "동의") {
        showAlertModal("동의를 입력해주세요.");
        resetButton();
        return;
      }

      try {
        const response = await fetch(submitURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(submitData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        showAlertModal(data.message);
        modalContainer.remove();
      } catch (error) {
        console.error("Error:", error);
        showAlertModal("오류가 발생했습니다. 다시 시도해주세요.");
        resetButton();
      }
    });

  document.body.appendChild(modalContainer);
}

// 구매하기 버튼에 이벤트 리스너 추가
document.querySelector("#buy").addEventListener("click", (e) => {
  e.preventDefault();
  createPurchaseModal();
});

const submitURL =
  "https://script.google.com/macros/s/AKfycbxWGfR-1MvJQ0jBnPQhF5NIEHRt4HjyPDiAzF8QsEbZo4vGXF2N6ms9srhal6eVROI/exec";

// 알림 모달 표시 함수 추가
function showAlertModal(message) {
  const template = document.querySelector("#alertModal");
  const modal = template.content.cloneNode(true);

  modal.querySelector(".modal__message").textContent = message;
  modal.querySelector(".modal__close").addEventListener("click", () => {
    document.querySelector(".modal").remove();
  });

  document.body.appendChild(modal);
}
