const jsForm = document.querySelector(".js-form"),
  jsInput = document.querySelector(".js-input"),
  greeting = document.querySelector(".js-greeting");
const USER_LS = "currentUser",
  SHOWING_CLASS = "showing";

function saveValue(text) {
  localStorage.setItem(USER_LS, text);
}
const handleSubmit = (event) => {
  event.preventDefault();
  const newValue = jsInput.value;
  showUserGreeting(newValue);
  saveValue(newValue);
};

const askUser = () => {
  jsForm.classList.add(SHOWING_CLASS);
  jsForm.addEventListener("submit", handleSubmit);
};

const showUserGreeting = (text) => {
  jsForm.classList.remove(SHOWING_CLASS);
  greeting.classList.add(SHOWING_CLASS);
  greeting.innerText = `Hello ${text}`;
};
const loadUser = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    return askUser();
  } else {
    return showUserGreeting(currentUser);
  }
};

function init() {
  loadUser();
}
init();
