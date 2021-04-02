// Scripts to change Ueser's Password //

const passwordChanger = async (event) => {
    event.preventDefault();
  
    const currentPassword = document.querySelector('#current-password').value.trim();
    const newPassword = document.querySelector('#lastname-signup').value.trim();
    const verifyPassword = document.querySelector('#verify-password').value.trim();


    if (currentPassword && newPassword && verifyPassword) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword, verifyPassword, }),
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
    .querySelector('.change-password')
    .addEventListener('submit', passwordChanger);
  

    //  feeding new pass word