// This form will occur in DOM with id="containeer"
// It send to server by AJAX request (Jquire is necessary) 3 items: name, email and reCaptcha result

window.modal = {
  class: "modal",
  id: "modal",
};
window.modalForm = {
  class: "modalForm",
  id: "modalForm",
};
window.inputName = {
  class: "inputName",
  type: "text",
  id: "inputName",
  name: "name", 
  placeholder: "Ваше имя",
};
window.inputText = {
  class: "inputText",
  id: "inputText",
  name: "text",
  placeholder: "Текст вашего предложения",
};
window.submit = {
  class: "inputSubmit",
  type: "submit",
  id: "inputSubmit",
  name: "inputSubmit",
  value: "Отправить",
  onclick: "sendMessage()",
};
function CreateForm() {
  var modal = document.createElement("div");
  var modalForm = document.createElement("div");
  setAttributes(modal, window.modal);
  setAttributes(modalForm, window.modalForm);
  document.getElementById("container").appendChild(modal);
  document.getElementById("modal").appendChild(modalForm);
  CreateInputName();
  CreateInputText();
  CreateSubmit();
  recaptchaCallback();
}
function CreateInputName() {
  var inputName = document.createElement("input");
  setAttributes(inputName, window.inputName);
  document.getElementById("modalForm").appendChild(inputName);
}
function CreateInputText() {
  var inputText = document.createElement("textarea");
  setAttributes(inputText, window.inputText);
  document.getElementById("modalForm").appendChild(inputText);
}
function CreateSubmit() {
  var submit = document.createElement("input");
  setAttributes(submit, window.submit);
  document.getElementById("modalForm").appendChild(submit);
}
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
function sendMessage() {
  var namer = document.getElementById("inputName").value;
  var textr = document.getElementById("inputText").value;
  send = $.ajax({
    type: "POST",
    url: "https://rsvisualstudio.ru/app/email.php",
    dataType: "json",
    data: 'name=' + namer + '&text=' + textr + "&g-recaptcha-response=" + grecaptcha.getResponse(),
    success: function (data) {
      var result = data;
      alert(result);
      closeModal();
    },
  });
}
function closeModal() {
  document.getElementById("modal").remove();
}
function recaptchaCallback() {
  document.getElementById("modalForm").innerHTML +=
    '<div class="recaptcha" id="recaptcha"></div>';
  grecaptcha.render("recaptcha", {
    sitekey: "KEY", //HERE IS SHOULD BE A YOUR FRONTEND PRIVATE KEY
    callback: function () {
    },
  });
}

