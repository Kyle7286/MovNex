// Script to change User's Email //

const emailChanger = async (event) => {
    event.preventDefault();
  
    const newEmail = document.querySelector('#current-password').value.trim();
    const password = document.querySelector('#lastname-signup').value.trim();

  
    if (newEmail && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ newEmail, password}),
        headers: { 'Content-Type': 'application/json' },
      });  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  
  document
    .querySelector('.change-email')
    .addEventListener('submit', emailChanger);