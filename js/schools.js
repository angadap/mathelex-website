// Mathelex schools-page interactivity
// No inline event handlers are used anywhere in the HTML — every listener
// is attached here, scoped to DOMContentLoaded.

(function () {
  'use strict';

  function stripControlChars(str) {
    return String(str || '').replace(/[\r\n]+/g, ' ').trim();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('enquiryModal');
    var form = document.getElementById('enquiryForm');

    function openEnquiryModal() {
      if (modal) modal.classList.add('open');
    }
    function closeEnquiryModal() {
      if (modal) modal.classList.remove('open');
    }

    document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
      btn.addEventListener('click', openEnquiryModal);
    });
    document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
      btn.addEventListener('click', closeEnquiryModal);
    });

    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeEnquiryModal();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeEnquiryModal();
      }
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = stripControlChars(document.getElementById('eqName').value);
        var org = stripControlChars(document.getElementById('eqOrg').value);
        var board = stripControlChars(document.getElementById('eqBoard').value);
        var email = stripControlChars(document.getElementById('eqEmail').value);
        var message = stripControlChars(document.getElementById('eqMessage').value);

        var subject = encodeURIComponent('Mathelex school enquiry — ' + org);
        var body = encodeURIComponent(
          'Name: ' + name + '\n' +
          'School: ' + org + '\n' +
          'Board: ' + (board || '-') + '\n' +
          'Email: ' + email + '\n\n' +
          'Message:\n' + (message || '-')
        );
        window.location.href = 'mailto:mathelex@zohomail.in?subject=' + subject + '&body=' + body;
        closeEnquiryModal();
      });
    }

    // ---- FAQ accordion ----
    document.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.parentElement;
        var wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function (i) {
          i.classList.remove('open');
        });
        if (!wasOpen) item.classList.add('open');
      });
    });
  });
})();
