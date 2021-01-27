const {
  absences,
  employee,
  employeeAuth,
  employeeValidation,
} = require("../controllers");

module.exports = (app) => {
  // Main Route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to absences api." });
  });

  // Retrieve all absences
  app.get("/api/absences", absences.getAll);
    // Read image  format base64
  app.post("/api/read_image_base64", employeeValidation.readImage, absences.readImage);

  app.post("/api/employee_auth", employeeAuth.auth, employeeAuth.login);

  // add employee absences
  app.post("/api/employee_absences", employeeAuth.auth, absences.addAbsences);

  // Retrieve all Employee
  app.get("/api/employee", employee.getAll);
  // Create a new Employee
  app.post("/api/employee", employee.create);
  // // Retrieve a single Employes with ID
  app.get(
    "/api/employee/:id",
    employeeValidation.updateEmployee,
    employee.findOne
  );

  // Update a Employee with ID
  app.put("/api/employee/:id", employee.update);

  // Delete a Employee with ID
  app.delete("/api/employee/:id", employee.deleteOne);
};
