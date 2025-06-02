const defaultEmployee = {
  id: new Date().getTime(),
  firstName: "Abe",
  surname: "Simpson",
  email: "abe.simpson@springfield.com",
  birthDate: "1907-05-25",
  jobTitle: "Work grouch",
  status: "ACTIVE",
};

const defaultData = Array.from({ length: 30 }, (_, i) => {
  const timestamp = Date.now() + i;
  return {
    id: timestamp,
    firstName: "Abe",
    surname: `Simpson${i + 1}`,
    email: `abe.simpson${i + 1}@springfield.com`,
    birthDate: `1907-05-${String(1 + (i % 28)).padStart(2, "0")}`,
    jobTitle: "Work grouch",
    status: "ACTIVE",
  };
});

export { defaultEmployee, defaultData };
