document.getElementById("mentorForm").addEventListener("submit", (e) => {
  e.preventDefault();
  createMentor();
});

async function createMentor() {
  let data = {
    name: document.getElementById("mentorName").value,
  };
  let response = await fetch(
    "https://studentmentorvikas.herokuapp.com/api/mentors",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  response = await response.json();
  alert(JSON.stringify(response));
  location.reload();
}

document.getElementById("studentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  createStudent();
});

async function createStudent() {
  let data = {
    name: document.getElementById("studentName").value,
  };
  let response = await fetch(
    "https://studentmentorvikas.herokuapp.com/api/students",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  response = await response.json();
  alert(JSON.stringify(response));
  location.reload();
}

//for populating in third div
populateMentors();
populateStudents();

//for assigning students to mentor
document.getElementById("studentsToMentor").addEventListener("submit", (e) => {
  e.preventDefault();
  assignStudentsToMentor();
});

async function assignStudentsToMentor() {
  let mentor = document.getElementById("mentorSelect").value;
  let options = document.querySelectorAll("#studentsSelect > option:checked");
  let students = [];
  options.forEach((option) => {
    students.push(option.value);
  });
  let data = {
    students: students,
  };
  let url = `https://studentmentorvikas.herokuapp.com/api/mentors/${mentor}`;
  let response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  response = await response.json();
  alert(JSON.stringify(response));
  location.reload();
}

//for populating all the students and all the mentors
populateAllStudents();
populateAllMentors();

//for populating particular mentors
populateParticularMentor();
async function populateParticularMentor() {
  let mentorData = await fetch(
    "https://studentmentorvikas.herokuapp.com/api/mentors"
  );
  mentorData = await mentorData.json();
  mentorData = mentorData.data;
  let mentorSelect = document.getElementById("particularMentor");
  let options = [];
  mentorData.forEach((mentor) => {
    let option = document.createElement("option");
    option.value = mentor.name;
    option.innerText = mentor.name;
    options.push(option);
  });
  mentorSelect.append(...options);
}

//to get students of particular mentor
document
  .getElementById("particularMentorForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    getStudentsOfMentor();
  });

async function getStudentsOfMentor() {
  let mentor = document.getElementById("particularMentor").value;
  let url = `https://studentmentorvikas.herokuapp.com/api/mentors/${mentor}`;
  let students = await fetch(url);
  students = await students.json();
  students = students.data;
  if (students.length == 0) {
    document.getElementById(
      "finalDiv"
    ).innerHTML += `<p>No students under this mentor</p>`;
  } else {
    let str = `Students under this mentor are: `;
    students.forEach((val) => {
      str += `${val}, `;
    });
    str = str.slice(0, str.length - 2);
    document.getElementById("finalDiv").innerHTML += `<p>${str}</p>`;
  }
}

//for populating all the students function definition
async function populateAllStudents() {
  let ul = document.getElementById("studentsInfo");
  let students = await fetch(
    "https://studentmentorvikas.herokuapp.com/api/students"
  );
  students = await students.json();
  students = students.data;
  students = students.map((student) => student.name);
  let liS = [];
  students.forEach((val) => {
    let li = document.createElement("li");
    li.innerText = val;
    liS.push(li);
  });
  ul.append(...liS);
}

async function populateAllMentors() {
  let ul = document.getElementById("mentorsInfo");
  let mentors = await fetch(
    "https://studentmentorvikas.herokuapp.com/api/mentors"
  );
  mentors = await mentors.json();
  mentors = mentors.data.map((mentor) => mentor.name);
  let liS = [];
  mentors.forEach((val) => {
    let li = document.createElement("li");
    li.innerText = val;
    liS.push(li);
  });
  ul.append(...liS);
}

//for populating in fourth div
populateStudentAndMentor();

//for assigning mentor to student
document.getElementById("mentorToStudent").addEventListener("submit", (e) => {
  e.preventDefault();
  assignMentorToStudent();
});
async function assignMentorToStudent() {
  let mentor = document.getElementById("mentorSelect1").value;
  let student = document.getElementById("studentSelect1").value;
  let url = `https://studentmentorvikas.herokuapp.com/api/students/${student}`;
  let data = {
    name: mentor,
  };
  let response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  response = await response.json();
  alert(JSON.stringify(response));
  location.reload();
}

// for populating in third div function definitions
async function populateMentors() {
  let mentorData = await fetch(
    "https://studentmentorvikas.herokuapp.com/api/mentors"
  );
  mentorData = await mentorData.json();
  mentorData = mentorData.data;
  let mentorSelect = document.getElementById("mentorSelect");
  let options = [];
  mentorData.forEach((mentor) => {
    let option = document.createElement("option");
    option.value = mentor.name;
    option.innerText = mentor.name;
    options.push(option);
  });
  mentorSelect.append(...options);
}

async function populateStudents() {
  let studentSelect = document.getElementById("studentsSelect");
  let studentData = await fetch(
    "https://studentmentorvikas.herokuapp.com/api/students/nomentors"
  );
  studentData = await studentData.json();
  studentData = studentData.data;
  let options = [];
  studentData.forEach((student) => {
    let option = document.createElement("option");
    option.value = student;
    option.innerText = student;
    options.push(option);
  });
  studentSelect.append(...options);
}

// for populating in fourth div function definitions
async function populateStudentAndMentor() {
  let mentors = await fetch(
    "https://studentmentorvikas.herokuapp.com/api/mentors"
  );
  mentors = await mentors.json();
  let students = await fetch(
    "https://studentmentorvikas.herokuapp.com/api/students"
  );
  students = await students.json();
  mentors = mentors.data.map((mentor) => mentor.name);
  students = students.data.map((student) => student.name);
  let mentorOptions = [];
  let studentOptions = [];
  mentors.forEach((val) => {
    let option = document.createElement("option");
    option.innerText = val;
    option.value = val;
    mentorOptions.push(option);
  });
  students.forEach((val) => {
    let option = document.createElement("option");
    option.innerText = val;
    option.value = val;
    studentOptions.push(option);
  });
  let student = document.getElementById("studentSelect1");
  let mentor = document.getElementById("mentorSelect1");
  student.append(...studentOptions);
  mentor.append(...mentorOptions);
}
