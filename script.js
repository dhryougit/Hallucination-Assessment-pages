const exampleButtons = document.querySelectorAll('[data-example]');
exampleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    exampleButtons.forEach((item) => {
      const selected = item === button;
      item.setAttribute('aria-pressed', String(selected));
      document.getElementById(item.dataset.example).hidden = !selected;
    });
  });
});

document.getElementById('copy-citation').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(document.getElementById('bibtex').textContent);
    button.textContent = 'Copied';
    status.textContent = 'Citation copied to clipboard.';
    setTimeout(() => { button.textContent = 'Copy'; }, 2000);
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('bibtex'));
    selection.removeAllRanges();
    selection.addRange(range);
    button.textContent = 'Select & copy';
    status.textContent = 'Citation selected. Use your browser’s copy command.';
  }
});
