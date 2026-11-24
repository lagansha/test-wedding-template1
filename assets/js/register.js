/* Lagansha registration form — fields are real HTML (crawlable, works without JS to render).
   JS handles: age auto-fill, submission to Web3Forms, reset and success dialog. */
(function () {
  'use strict';

  var form = document.getElementById('profile');
  if (!form) { return; }
  var submitButton = form.querySelector('button[type="submit"]');
  var resetButton = document.getElementById('reset');
  var status = document.getElementById('status');
  var dob = document.getElementById('f0_4');
  var age = document.getElementById('f0_5');
  var dialog = document.getElementById('successDialog');
  var busy = false;

  // Age follows the date of birth, and nobody under 18 can register.
  if (dob && age) {
    var today = new Date();
    var cutoff = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    dob.max = cutoff.getFullYear() + '-' +
      String(cutoff.getMonth() + 1).padStart(2, '0') + '-' +
      String(cutoff.getDate()).padStart(2, '0');
    dob.addEventListener('change', function () {
      if (!dob.value) { age.value = ''; return; }
      var d = new Date(dob.value + 'T00:00:00');
      var now = new Date();
      var n = now.getFullYear() - d.getFullYear();
      if (now.getMonth() < d.getMonth() ||
          (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) { n--; }
      age.value = n;
    });
  }

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = 'reg-status' + (kind ? ' ' + kind : '');
    status.setAttribute('role', kind === 'error' ? 'alert' : 'status');
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (busy || !form.reportValidity()) { return; }
    if (document.getElementById('botcheck').checked) { return; }

    var payload = {
      access_key: form.getAttribute('data-access-key'),
      subject: 'New Lagansha Matrimonial Profile',
      from_name: 'Lagansha Registration',
      botcheck: ''
    };
    Array.prototype.forEach.call(form.querySelectorAll('[name]'), function (el) {
      if (el.name === 'botcheck') { return; }
      payload[el.name] = (el.value || '').trim() || 'Not provided';
    });
    payload.consent = 'I am 18 or older and agree to send my details to Lagansha by email through Web3Forms.';
    payload.source = window.location.origin + window.location.pathname;

    busy = true;
    submitButton.disabled = true;
    if (resetButton) { resetButton.disabled = true; }
    submitButton.textContent = 'Submitting…';
    setStatus('Sending your details. Please keep this page open.', 'info');

    try {
      var response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      var result = {};
      try { result = await response.json(); } catch (_) {}
      if (!response.ok || !result.success) {
        throw new Error(result.message || ('HTTP ' + response.status));
      }
      HTMLFormElement.prototype.reset.call(form);
      setStatus('', '');
      if (dialog && typeof dialog.showModal === 'function') { dialog.showModal(); }
      else { setStatus('Thank you! Your profile has been submitted.', 'success'); }
    } catch (error) {
      setStatus('We could not confirm your submission. Your answers are still here. Please check your internet connection and try again. If the problem continues, call us or email us. A retry could create a duplicate if the first request was received. (Reason: ' +
        (error && error.message ? error.message : 'network error') + ')', 'error');
    } finally {
      busy = false;
      submitButton.disabled = false;
      if (resetButton) { resetButton.disabled = false; }
      submitButton.textContent = 'Submit profile';
    }
  });

  var successClose = document.getElementById('successClose');
  if (successClose && dialog) {
    successClose.onclick = function () { dialog.close(); };
  }
  if (resetButton) {
    resetButton.onclick = function () {
      if (!busy && confirm('Clear all your answers?')) {
        HTMLFormElement.prototype.reset.call(form);
        setStatus('', '');
      }
    };
  }
})();
