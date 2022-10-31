function initCookie() {
  var body = document.body;
  var acceptAllBtn = document.getElementById('cookie-popup-acceptall');
  var acceptBasicBtn = document.getElementById('cookie-popup-acceptbasic');
  var manage = document.getElementById('cookie-popup-settings');
  var cookieSetting = getCookie('cookies_settings');

  acceptAllBtn.onclick = function () {
    setCookie(
      'cookies_settings',
      '{"cookie": {"functional": true, "performance": true}}',
      365 * 10
    );
    closeModal();
  };
  acceptBasicBtn.onclick = function () {
    setCookie(
      'cookies_settings',
      '{"cookie": {"functional": true, "performance": false}}',
      365 * 10
    );
    _paq.push(['disableCookies']);
    closeModal();
  };

  manage.onclick = function () {
    closeModal();
    body.classList.add('cookie');
  };

  if (!cookieSetting) {
    body.classList.add('i-cookie');
  } else {
    var setting = JSON.parse(cookieSetting);

    if (!setting.cookie.functional) {
      _paq.push(['disableCookies']);
    }

    if (setting.cookie.performance) {
      
    }
  }

  function closeModal() {
    body.classList.remove('i-cookie');
  }
}

function manageCookie() {
  var body = document.body;
  var setManage = document.getElementById('set-manage-cookie');
  var confirm = document.getElementById('confirm-cookie-manage');
  var cookieSetting = getCookie('cookies_settings');

  var functionalCheckValue = document.getElementById('functionalCheck');
  var performanceCheckValue = document.getElementById('performanceCheck');

  setManage.onclick = function () {
    body.classList.add('cookie');

    if (cookieSetting) {
      var setting = JSON.parse(cookieSetting);

      if (setting.cookie.functional) {
        functionalCheckValue.checked = true;
      } else {
        functionalCheckValue.checked = false;
      }

      if (setting.cookie.performance) {
        performanceCheckValue.checked = true;
      } else {
        performanceCheckValue.checked = false;
      }
    }
  };

  confirm.onclick = function () {
    setCookie(
      'cookies_settings',
      `{"cookie": {"functional": ${functionalCheckValue.checked}, "performance": ${performanceCheckValue.checked}}}`,
      365 * 10
    );
    if (!performanceCheckValue.checked) {
      _paq.push(['disableCookies']);
    } else {
      _paq.push(['setConsentGiven']);
    }
    body.classList.remove('cookie');
  };
}

document.addEventListener('DOMContentLoaded', initCookie);
document.addEventListener('DOMContentLoaded', manageCookie);

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
