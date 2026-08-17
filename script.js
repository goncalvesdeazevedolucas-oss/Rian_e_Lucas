(function () {
  var saved = localStorage.getItem('sportguard-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var root = document.documentElement;
      var current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', current);
      localStorage.setItem('sportguard-theme', current);
    });
  }

  document.addEventListener('click', function (e) {
    document.querySelectorAll('.dropdown[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
  });

  document.querySelectorAll('.dot-btn, .vial-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var item = btn.closest('.hotspot, .vial-item');
      var wasActive = item.classList.contains('active');
      document.querySelectorAll('.hotspot.active, .vial-item.active').forEach(function (o) { o.classList.remove('active'); });
      if (!wasActive) item.classList.add('active');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.hotspot.active, .vial-item.active').forEach(function (o) { o.classList.remove('active'); });
  });
});
