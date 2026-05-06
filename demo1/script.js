const form = document.querySelector("#loginForm");
const account = document.querySelector("#account");
const password = document.querySelector("#password");
const togglePassword = document.querySelector("#togglePassword");
const formMessage = document.querySelector("#formMessage");

const setError = (input, message) => {
  const field = input.closest(".field");
  const error = document.querySelector(`[data-error-for="${input.id}"]`);
  field.classList.toggle("has-error", Boolean(message));
  error.textContent = message;
};

const validate = () => {
  let isValid = true;
  formMessage.textContent = "";

  if (!account.value.trim()) {
    setError(account, "请输入账号");
    isValid = false;
  } else {
    setError(account, "");
  }

  if (!password.value) {
    setError(password, "请输入密码");
    isValid = false;
  } else if (password.value.length < 6) {
    setError(password, "密码至少需要 6 位");
    isValid = false;
  } else {
    setError(password, "");
  }

  return isValid;
};

togglePassword.addEventListener("click", () => {
  const showPassword = password.type === "password";
  password.type = showPassword ? "text" : "password";
  togglePassword.classList.toggle("is-visible", showPassword);
  togglePassword.setAttribute("aria-label", showPassword ? "隐藏密码" : "显示密码");
});

[account, password].forEach((input) => {
  input.addEventListener("input", () => {
    if (input.closest(".field").classList.contains("has-error")) {
      validate();
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validate()) {
    return;
  }

  formMessage.textContent = "登录信息校验通过，可接入后端接口。";
});
