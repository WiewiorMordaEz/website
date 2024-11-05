document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.querySelector('input[placeholder="Nazwa użytkownika"]').value;
    const password = document.querySelector('input[placeholder="Hasło"]').value;
    const rememberMe = document.querySelector('input[type="checkbox"]').checked; // Sprawdzamy, czy checkbox jest zaznaczony

    const data = {
        username: username,
        password: password,
        rememberMe: rememberMe
    };

    fetch('http://localhost:3000/api/register', {  // URL do lokalnego endpointa
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch((error) => {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas rejestracji');
    });
});
