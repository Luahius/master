let INPUT_PW_SELECTOR = '[data-input-role="password"]'; 
let INPUT_PHONE_SELECTOR = '[data-input-role="phone"]';
let PW_BEFORE_SELECTOR = '[data-input-password="beforeToPassword"]';
let PW_AFTER_SELECTOR = '[data-input-password="afterToPassword"]';
let PW_MIN_LENGTH = 8; /* 비밀번호 최소 입력 글자 수 */

let validationFromRegisterToKeyup = () => {
  let pwSelector = document.querySelectorAll(INPUT_PW_SELECTOR);
  let phoneSelector = document.querySelector(INPUT_PHONE_SELECTOR);
  // password 유효성 검사(keyup) 메소드 호출 
  pwSelector.forEach((pw) => {
    keyupFromValidationToPw(pw);
  })
  // phone 유효성 검사(keyup) 메소드 호출 
  keyupFromValidationToPhone(phoneSelector);
}

// password 유효성 검사(keyup-event) : 영문, 숫자 포함 8글자 이상
let keyupFromValidationToPw = (target) => {
  target.addEventListener('keyup', (event) => {
    let password = event.target;
    let check_num = password.value.search(/[0-9]/g);
    let check_eng = password.value.search(/[a-zA-Z]/ig);
    // 글자 수 8자 이상으로 제한
    if(password.length < PW_MIN_LENGTH) password.classList.add('danger');
    // 숫자와 영문 혼용해야함
    if(check_num < 0 || check_eng < 0) password.classList.add('danger');
    else password.classList.remove('danger');
  }) 
}
// phone 유효성 검사(keyup-event) : 숫자만 입력 가능 
let keyupFromValidationToPhone = (target) => {
  target.addEventListener('keyup', (event) => {
    let phone = event.target;
    let check_num = phone.value.search(/[0-9]/g);
    let check_eng = phone.value.search(/[a-zA-Z]/ig);
    // 영문 입력 제한 
    if(check_eng > -1) phone.classList.add('danger');
    // 숫자만 입력 가능
    if(check_num == 0 && check_eng == -1) phone.classList.remove('danger'); 
  }) 
} 

validationFromRegisterToKeyup();