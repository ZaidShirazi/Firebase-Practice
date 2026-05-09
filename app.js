import {
  deleteDoc,
  doc,
  setDoc,
  addDoc,
  collection,
  db,
  getDocs,
} from "./firebaseConfig.js";

let addBtn = document.getElementById("addBtn");

let name = prompt("Enter your name: ");
let age = Number(prompt("Enter your age: "));
let city = prompt("Enter your city: ");

// constructor function to create an obj
function Users(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city;
}

// input validation Function
function inputValidation(name, age, city) {
  // name validation
  if (name.trim().length < 1) {
    alert("empty input is not allowed!");
    return false;
  }
  // age validation
  else if (Number.isNaN(age) || age < 1) {
    alert("Invalid age");
    return false;
  }
  // city validation
  else if (city.trim().length < 1) {
    alert("Invalid input");
    return false;
  } else {
    return true;
  }
}

let user;

if (inputValidation(name, age, city) === true) {
  user = new Users(name, age, city);
  console.log(user);
} else {
  console.log("Validation is failed.");
}

let addUser = async () => {
  if (!user) {
    console.log("user is not found");
    return;
  }

  let copyUser = { ...user };

  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "Learning-DB"), copyUser);
    console.log("Document saved with ID: ", docRef.id);
    console.log("User is added successfully");
  } catch (error) {
    console.log("Error from Firebase");
    console.error(error);
  }
};

addBtn.addEventListener("click", addUser);
