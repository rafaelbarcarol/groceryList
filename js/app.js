$(document).ready(function () {
  addOnClick();
  addOnSubmit();
  checkItem();
  removeItem();
  checkCharacters();
});

let products = [];
const inputContent = $(".js-content-input");
const addButton = $(".js-add-item");
let submitEnabled = true;

function checkCharacters() {
  inputContent.on("keypress paste", function (e) {
    if (e.type === "paste") {
      e.preventDefault();
      return;
    }

    const key = e.key;
    const allowedCharacters = /^[a-zA-ZÀ-ÿ\s']+$/;

    if (!allowedCharacters.test(key)) {
      e.preventDefault();
    }
  });
}

function progressBar() {
  const feedbackMessage = $(".js-feedback");
  const feedbackProgressBar = $(".js-progress");
  feedbackMessage.addClass("active");
  feedbackProgressBar.addClass("empty");
  addButton.addClass("inactive");
  setTimeout(() => {
    feedbackMessage.removeClass("active");
    feedbackProgressBar.removeClass("empty");
    addButton.removeClass("inactive");
  }, 1500);
}

function addItem() {
  products.push(inputContent.val());
  progressBar();
}

function addOnClick() {
  addButton.on("click", function () {
    if (inputContent.val().length > 2) {
      mountItem(inputContent.val());
      addItem();
      inputContent.val("");
    }
  });
}

function addOnSubmit() {
  $(".js-register").on("submit", function (e) {
    e.preventDefault();

    if (inputContent.val().length > 2) {
      if (!submitEnabled) {
        return;
      }

      submitEnabled = false;

      mountItem(inputContent.val());
      addItem();
      inputContent.val("");

      setTimeout(function () {
        submitEnabled = true;
      }, 1500);
    }
  });
}

function mountItem(productName) {
  const escapedProductName = $("<div>").text(productName).html();
  const newItem = `
  <div class="shopping__item js-shopping-item">
    <p class="shopping__product js-item-name">${escapedProductName}</p>
    <div class="shopping__interactions">
      <p class="shopping__check js-item-check">✅</p>
      <p class="shopping__remove js-item-remove">❌</p>
    </div>
  </div>
`;

  $(".js-shopping-items").append(newItem);
}

function checkItem() {
  $(".js-shopping-items").on("click", ".js-item-check", function () {
    $(this).parent().siblings().toggleClass("checked");
  });
}

function removeItem() {
  let currentItem;

  $(".js-shopping-items").on("click", ".js-item-remove", function () {
    currentItem = $(this);
    $(".js-remove-modal").addClass("active");
    $(".js-background-layer").addClass("active");
  });

  $(".js-confirm-remove").on("click", function () {
    if (currentItem) {
      const itemIndex = currentItem.closest(".js-shopping-item").index();
      products.splice(itemIndex, 1);
      currentItem.parent().parent().remove();
      $(".js-remove-modal").removeClass("active");
      currentItem = null;
      $(".js-background-layer").removeClass("active");
    }
  });

  $(".js-cancel-remove").on("click", function () {
    $(".js-remove-modal").removeClass("active");
    currentItem = null;
    $(".js-background-layer").removeClass("active");
  });
}
