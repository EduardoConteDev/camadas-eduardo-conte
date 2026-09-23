DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS companies;

CREATE TABLE companies (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT NOT NULL,
  cnpj   TEXT NOT NULL UNIQUE,
  state  TEXT NOT NULL
);

CREATE TABLE employees (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  gross_salary  REAL NOT NULL,
  net_salary    REAL NOT NULL,
  company_id    INTEGER NOT NULL REFERENCES companies(id)
);

CREATE INDEX idx_employees_company ON employees(company_id);
