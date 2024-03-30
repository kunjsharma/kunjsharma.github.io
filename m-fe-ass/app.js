/* Navigation link on click for both mobile/tab and desktop view */
$(".link").on("click", function (e) {
  var _target = $(e.target);
  $(".content-container").hide();
  if (_target.hasClass("home")) {
    $(".home-container").show();
  } else if (_target.hasClass("about")) {
    $(".about-container").show();
  } else {
    $(".contact-container").show();
  }
});
/* Expand/collapse drop down navigation menu on hamburger icon click */
$(".hamburger").on("click", function (e) {
  e.stopPropagation();
  $(".links-container").slideToggle(100);
});
/* Collapse dropdown menu on click anywhere in body */
$("body").on("click", function () {
  if ($(".hamburger").is(":visible")) {
    $(".links-container").slideUp(100);
  }
});
/* Show hide navigation links container on window resize / switch to device.*/
$(window).resize(function () {
  if ($(this).width() > 768) {
    $(".links-container").show();
  } else {
    $(".links-container").hide();
  }
});

/* Form validation */

/* Handle submit */
$(".submit").on("click", function () {
  var _uname = $('input[name="uname"]');
  var _uemail = $('input[name="uemail"]');
  if (!_uname.val()) {
    _uname.addClass("warning").siblings("div").html("Please enter name.");
  } else {
    _uname.removeClass("warning").siblings("div").html("");
  }
  if (!_uemail.val()) {
    _uemail.addClass("warning").siblings("div").html("Please enter email.");
  } else {
    _uemail.removeClass("warning").siblings("div").html("");
  }

  if (_uname.val() && _uemail.val()) {
    alert("Form submitted successfully");
  }
});

/* Handle input change */
$("input").on("input", function () {
  console.log("...");
  if ($(this).val.length > 0) {
    $(this).removeClass("warning").siblings("div").html("");
  }
});
