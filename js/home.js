// Mathelex homepage interactivity
// No inline event handlers are used anywhere in the HTML — every listener
// is attached here, scoped to DOMContentLoaded, and reads plain DOM state.

(function () {
  'use strict';

  function stripControlChars(str) {
    // Defensive: strip characters that could otherwise be used to inject
    // extra header-like lines into a mailto: body/subject.
    return String(str || '').replace(/[\r\n]+/g, ' ').trim();
  }

  document.addEventListener('DOMContentLoaded', function () {
    // ---- Sparkle-on-scroll for each tier node ----
    document.querySelectorAll('.node').forEach(function (node) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            node.classList.add('sparkle-burst');
            obs.unobserve(node);
          }
        });
      }, { threshold: 0.6 });
      obs.observe(node);
    });

    // ---- Back-to-top button ----
    var backBtn = document.getElementById('backToTop');
    if (backBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
          backBtn.classList.add('visible');
        } else {
          backBtn.classList.remove('visible');
        }
      });
      backBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // ---- Enquiry modal ----
    var modal = document.getElementById('enquiryModal');
    var titleEl = document.getElementById('enquiryTitle');
    var subtitleEl = document.getElementById('enquirySubtitle');
    var form = document.getElementById('enquiryForm');

    function openEnquiryModal(kind) {
      if (!modal) return;
      if (kind === 'school') {
        titleEl.textContent = 'Talk to us';
        subtitleEl.textContent = "Tell us about your school — we'll follow up by email.";
      } else {
        titleEl.textContent = 'Request a demo';
        subtitleEl.textContent = "Tell us a bit about you — we'll follow up by email.";
      }
      modal.classList.add('open');
    }

    function closeEnquiryModal() {
      if (modal) modal.classList.remove('open');
    }

    // Wire up every button that declares data-open-modal="demo|school"
    document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openEnquiryModal(btn.getAttribute('data-open-modal'));
      });
    });

    // Wire up every element that declares data-close-modal
    document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
      btn.addEventListener('click', closeEnquiryModal);
    });

    // Click outside the card closes the modal
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeEnquiryModal();
      });
    }

    // Escape key closes the modal
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
        var email = stripControlChars(document.getElementById('eqEmail').value);
        var message = stripControlChars(document.getElementById('eqMessage').value);

        var subject = encodeURIComponent('Mathelex enquiry from ' + name);
        var body = encodeURIComponent(
          'Name: ' + name + '\n' +
          'School/Organization: ' + (org || '-') + '\n' +
          'Email: ' + email + '\n\n' +
          'Message:\n' + (message || '-')
        );
        window.location.href = 'mailto:mathelex@zohomail.in?subject=' + subject + '&body=' + body;
        closeEnquiryModal();
      });
    }
  });
})();
