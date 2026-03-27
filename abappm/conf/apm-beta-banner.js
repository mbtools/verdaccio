if (window.location.hostname.includes('playground.abappm.com')) {
  document.getElementById('beta').innerHTML =
    '<strong>***PLAYGROUND***</strong>  Expect the unexpected! Please post bugs and feedback to <a href="https://github.com/abapPM/abapPM/issues" target="_blank" style="color:white !important;">GitHub</a>. Thank You!  <strong>***PLAYGROUND***</strong>';
  document.getElementById('beta').style.backgroundColor = '#0000FF';
  document.getElementById('beta').style.color = '#FFFFFF';
  document.getElementById('beta').style.fontSize = '12px';
  document.getElementById('beta').style.textAlign = 'center';
} else {
  document.getElementById('beta').style.display = 'none';
}
