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
      '{"cookie": {"functional": false, "performance": true}}',
      365 * 10
    );
    closeModal();
  };

  manage.onclick = function () {
    closeModal();
    body.classList.add('cookie');
  };

  if (!cookieSetting) {
    body.classList.add('i-cookie');
  }
  // else {
  //   var setting = JSON.parse(cookieSetting);

  //   if (!setting.cookie.performance) {
  //     _paq.push(['disableCookies']);
  //   }
  // }

  function closeModal() {
    body.classList.remove('i-cookie');
    location.reload();
  }
}

function manageCookie() {
  var body = document.body;
  var setManage = document.getElementById('set-manage-cookie');
  var confirm = document.getElementById('confirm-cookie-manage');
  var cookieSetting = getCookie('cookies_settings');

  var functionalCheckValue = document.getElementById('functionalCheck');
  var performanceCheckValue = document.getElementById('performanceCheck');

  if (cookieSetting) {
    var setting = JSON.parse(cookieSetting);

    if (setting.cookie.functional) {
      functionalCheckValue.checked = true;
    } else {
      functionalCheckValue.checked = false;
    }

    if (setting.cookie.performance) {
      performanceCheckValue.checked = true;
      /* INIT MATOMO */
      var _mtm = (window._mtm = window._mtm || []);
      _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });
      var d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0];
      g.async = true;
      g.src = 'https://matomo.liberties.eu/js/container_O2RsFPat.js';
      s.parentNode.insertBefore(g, s);
    } else {
      performanceCheckValue.checked = false;
    }
  } else if (!cookieSetting) {
    performanceCheckValue.checked = true;
  }

  setManage.onclick = function () {
    body.classList.add('cookie');
  };

  confirm.onclick = function () {
    setCookie(
      'cookies_settings',
      `{"cookie": {"functional": ${functionalCheckValue.checked}, "performance": ${performanceCheckValue.checked}}}`,
      365 * 10
    );
    // if (!performanceCheckValue.checked) {
    //   _paq.push(['disableCookies']);
    // } else {
    //   _paq.push(['setConsentGiven']);
    // }
    location.reload();
  };
}

document.addEventListener('DOMContentLoaded', function () {
  // setTimeout(() => {
  //   console.log('');
  // }, 3000);
  initCookie();
  manageCookie();
});

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie =
    name +
    '=' +
    (value || '') +
    expires +
    ';domain=.' +
    window.location.host +
    '; path=/';
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
