document.addEventListener('DOMContentLoaded', function () {
  const userForm = document.getElementById('userForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const roleInput = document.getElementById('role');
  const filterByNameInput = document.getElementById('filterByName');
  const userTableBody = document.getElementById('userTableBody');

 
  function getUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  
  function displayUsers(users) {
    userTableBody.innerHTML = '';

    users.forEach(function (user, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button class="deleteBtn" data-index="${index}">Borrar</button>
          <button class="editBtn" data-index="${index}">Editar</button>
        </td>
      `;
      userTableBody.appendChild(row);
    });
  }

  
  function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

 
  function addUser(event) {
    event.preventDefault();

    const users = getUsersFromLocalStorage();
    const newUser = {
      fullName: fullNameInput.value,
      email: emailInput.value,
      role: roleInput.value,
    };

    users.push(newUser);
    saveUsersToLocalStorage(users);
    displayUsers(users);

    fullNameInput.value = '';
    emailInput.value = '';
    roleInput.value = '';
  }

  
  function deleteUser(index) {
    const users = getUsersFromLocalStorage();
    users.splice(index, 1);
    saveUsersToLocalStorage(users);
    displayUsers(users);
  }

  function editUser(index) {
    const users = getUsersFromLocalStorage();
    const editedUser = users[index];

    const newFullName = prompt('Ingrese el nuevo nombre completo:', editedUser.fullName);
    const newEmail = prompt('Ingrese el nuevo email:', editedUser.email);
    const newRole = prompt('Ingrese el nuevo rol:', editedUser.role);

    if (newFullName && newEmail && newRole) {
      editedUser.fullName = newFullName;
      editedUser.email = newEmail;
      editedUser.role = newRole;

      saveUsersToLocalStorage(users);
      displayUsers(users);
    }
  }

  
  function filterUsersByName() {
    const filterValue = filterByNameInput.value.toLowerCase();
    const users = getUsersFromLocalStorage();

    const filteredUsers = users.filter(user =>
      user.fullName.toLowerCase().includes(filterValue)
    );

    displayUsers(filteredUsers);
  }


  userForm.addEventListener('submit', addUser);


  userTableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteBtn')) {
      const index = event.target.dataset.index;
      deleteUser(index);
    } else if (event.target.classList.contains('editBtn')) {
      const index = event.target.dataset.index;
      editUser(index);
    }
  });


  filterByNameInput.addEventListener('input', filterUsersByName);

  
  const users = getUsersFromLocalStorage();
  displayUsers(users);
});