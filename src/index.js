// document.addEventListener('DOMContentLoaded', () => {
// })

// On page load, render a list of already registered dogs in the table.
// You can fetch these dogs from http://localhost:3000/dogs

function getDogs(){
    fetch('http://localhost:3000/dogs')
    .then (res => res.json())
    // .then (json => console.log(json))
    .then (json => displayDogs(json))
}
// The dog should be put on the table as a table row.
const displayDogs = dogs => {
    const registerDogs = document.getElementById('table-body')
    dogs.forEach(dog => {
        const dogName = document.createElement('td');
        dogName.textContent = dog.name;
        const dogBreed = document.createElement('td');
        dogBreed.textContent = dog.breed;
        const dogSex = document.createElement('td');
        dogSex.textContent = dog.sex;
        const dogRow = document.createElement('tr');
        const edit = document.createElement('td');
        const editDog = document.createElement('button');
        editDog.textContent = "Edit";
        edit.append(editDog);
        dogRow.append(dogName, dogBreed, dogSex, edit);
        registerDogs.append(dogRow);
        addEditToDogs(editDog, dog);
    })
}

// Make a dog editable. Clicking on the edit button next to a
// dog should populate the top form with that dog's current information.

const addEditToDogs = (editDog, dog) => {
    const editExistingDogs = document.getElementById('dog-form');
    editDog.addEventListener("click", () => {
        // editExisitingDogs.textContent = "";
        // console.log(editExisitingDogs.textContent + 'clicked')
        const dogForm = Array.from(editExistingDogs.elements)
        // console.log(dogForm)
        const nameOfDog = dogForm[0];
        nameOfDog.value = dog.name;
        const breedOfDog = dogForm[1];
        breedOfDog.value = dog.breed;
        const sexOfDog = dogForm[2];
        sexOfDog.value = dog.sex;
    })
}


getDogs();

// On submit of the form, a PATCH request should be 
// made to http://localhost:3000/dogs/:id to update the dog information 
// (including name, breed and sex attributes)

document.getElementById('dog-form').addEventListener('submit', createNewDog)
function createNewDog(e){
    e.preventDefault();
    console.log(e.target.sex.value)
    const addedDog = {
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value,
    }
    fetch("http://localhost:3000/dogs", {
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(addedDog)
    })
    .then(res => res.json())
    .then(json => getDogs(json))
}

