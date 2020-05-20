function Student(name, email) {
  const homeworkResult = [];
  this.getName = () => name;
  this.getEmail = () => email;
  this.getHomeworkResults = () => homeworkResult.slice();
  this.toString = () => `name: ${name}, email: ${email}`;
  this.addHomeworkResult = (topic, success) => {
    homeworkResult.push({ topic, success });
  };
}

function FrontendLab(students, failedHomeworksLimit) {
  const studentsList = students.map(({ name, email }) => new Student(name, email));
  const isEligibleForTest = homeworkResults => homeworkResults.reduce((total, { success }) => total + !success, 0);
  this.printStudentsList = () =>
    studentsList.forEach(student => {
      console.log(student.toString());
      console.log(student.getHomeworkResults());
    });
  this.addHomeworkResults = ({ topic, results }) =>
    results.forEach(({ email, success }) => {
      const student = studentsList.find(student => student.getEmail() === email);
      if (student) {
        student.addHomeworkResult(topic, success);
      }
    });
  this.printStudentsEligibleForTest = () =>
    studentsList
      .filter(student => failedHomeworksLimit >= isEligibleForTest(student.getHomeworkResults()))
      .forEach(student => console.log(student.toString()));
}
