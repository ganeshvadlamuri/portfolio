// Update taglines dynamically
document.addEventListener('DOMContentLoaded', () => {
  const taglines = document.querySelectorAll('.tagline');
  if (taglines.length >= 2) {
    taglines[0].textContent = 'Senior Software Engineer | Wells Fargo';
    taglines[1].textContent = 'Charlotte, NC | 6 Years Experience';
  }
});
