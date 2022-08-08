const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const f = require("@faker-js/faker");
const faker = f.faker;
const fake = require("faker");
startTime = new Date().toLocaleTimeString();
orgName = [
  "New horizon LLP",
  "Connectwise LLP",
  "MAQ Ltd.",
  "Disha Techincal",
  "Anand Technologies",
  "Soni Enterprises",
  "Supreme Consultant",
  "TCS",
  "Infosys",
  "Google Inc",
];
citites = [
  "London",
  "Mumbai",
  "Delhi",
  "Japan",
  "Hong-kong",
  "Malasia",
  "Iran",
  "Banglore",
  "Kolkata",
  "Chenai",
];
estbYear = [
  "2019",
  "2018",
  "1992",
  "2016",
  "2015",
  "1987",
  "2013",
  "2012",
  "2011",
  "1999",
];
c = [
  "Anshul",
  "Zarana",
  "Raj",
  "Rahul",
  "Rohan",
  "Dhiraj",
  "Varun",
  "Ryan",
  "Abhishek",
  "Ruchita",
];
depName = [
  "Marketing",
  "Sales",
  "Customer Support",
  "Technical",
  "HR",
  "Managing",
  "Boards",
  "Engineering",
  "Social Welfare",
  "QnA",
];
p = [
  "Engineer",
  "Technician",
  "Data Anaylist",
  "QnA Engineer",
  "SDE",
  "Intern",
  "Security Analyst",
  "Devop Engineer",
  "Sales person",
  "ML Engineer",
];

org = [];
dept = [];
empy = [];
for (i = 1; i <= 5; i++) {
  const newOrg = {
    org_id: uuidv4(),
    org_name: orgName[Math.floor(Math.random() * 10)],
    headquater: faker.helpers.arrayElement(citites),
    established_year: estbYear[Math.floor(Math.random() * 10)],
    ceo: c[Math.floor(Math.random() * 10)],
    added_in: Date.now().toString(),
  };
  org.push(newOrg);
  for (j = 1; j <= 50; j++) {
    const newDept = {
      dept_id: uuidv4(),
      org_id: newOrg.org_id,
      dept_name: depName[Math.floor(Math.random() * 10)],
      manager: c[Math.floor(Math.random() * 10)],
      added_in: Date.now().toString(),
    };
    dept.push(newDept);
    for (k = 1; k <= 1000; k++) {
      const newEmpy = {
        empy_id: uuidv4(),
        org_id: newOrg.org_id,
        dept_id: newDept.dept_id,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number({
          min: 20,
          max: 70,
        }),
        joining_date: faker.date.between(),
        position: p[Math.floor(Math.random() * 10)],
        salary: faker.datatype.number({
          min: 10000,
          max: 500000000,
        }),
        dob: faker.date.birthdate(),
        address: faker.address.streetAddress(),
        searchTags: faker.helpers.arrayElements([
          "Developer",
          "QA Analyst",
          "Helper",
          "Salesperson",
          "Engineer",
          "Artist",
          "Manager",
        ]),
        notes: faker.helpers.arrayElements([
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
        ]),
        empDetails: faker.name.jobDescriptor(),
        skills: faker.helpers.arrayElements([
          "Java",
          "Python",
          "JavaScript",
          "C++",
          "C",
          "MySQL",
          "Mongo DB",
          "HTML",
          "CSS",
        ]),
        exp:
          faker.helpers.arrayElement([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25,
          ]) +
          " years " +
          faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) +
          " months",
        achievements: faker.helpers.arrayElements([
          "Training Completion Awards",
          "Top Performance Awards",
          "Team Performance Awards",
          "Sales Awards",
          "Leadership Awards",
          "Customer Service Awards",
        ]),
        workLocation: faker.helpers.arrayElements(citites),
        ipAddress: faker.internet.ip(),
      };
      empy.push(newEmpy);
    }
  }
}

function fillFile(des, val) {
  const jsonString = JSON.stringify(val, null, 2);
  fs.writeFileSync(des, jsonString, (err) => {
    if (err) console.log(err);
    else console.log("Success");
  });
}

fillFile("../data/organization.json", org);
fillFile("../data/department.json", dept);
fillFile("../data/employee.json", empy);
endTime = new Date().toLocaleTimeString();
console.log("Start Time: " + startTime + "\nEnd Time: " + endTime);

//210992
//250000

