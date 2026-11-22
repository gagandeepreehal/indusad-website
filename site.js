document.querySelectorAll('button[data-citation]').forEach((button) => {
  button.addEventListener('click', async () => {
    const citation = document.getElementById(button.dataset.citation);
    const status = document.getElementById(button.dataset.status);
    try {
      await navigator.clipboard.writeText(citation.textContent);
      status.textContent = 'Citation copied.';
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = 'Copy citation'; }, 2500);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(citation);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Citation selected. Press Ctrl+C or Command+C to copy, or download the .bib file.';
    }
  });
});

document.querySelectorAll('button[data-copy-code]').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = document.getElementById(button.dataset.copyCode);
    const status = button.closest('.quickstart-panel').querySelector('[role="status"]');
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = 'Quickstart code copied.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Code selected. Press Ctrl+C or Command+C to copy.';
    }
  });
});
