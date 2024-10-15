class Employee {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class EmployeeService {
    idSequence = 1;

    constructor() {
        this.employees = [
            new Employee(this.idSequence++, 'John', 'Doe'),
            new Employee(this.idSequence++, 'Anna', 'Smith')];
    }

    async findById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const employee = this.employees.find(employee => employee.id === id)
                if (employee) {
                    resolve(employee);
                } else {
                    reject(new Error('Employee not found'));
                }
            }, 1000);
        });
    }

    async update(employee) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.employees = this.employees
                    .map(e => e.id === employee.id ? employee : e);
                resolve(employee);
            }, 1000);
        });
    }
}

// MVVM - Model, View, View Model

class EmployeeComponent {
    constructor(employeeService, employeeId) {
        this.employeeService = employeeService;
        if (employeeId) {
            this.loadEmployee(employeeId);
        }
        this.firstNameElement = document.getElementById('firstName');
        this.lastNameElement = document.getElementById('lastName');
        this.formElement = document.querySelector('form');
        // this.formElement.addEventListener('submit', this.saveEmployee.bind(this));
        this.formElement.addEventListener('submit', event => {
            event.preventDefault();
            this.saveEmployee.bind(this);
        });
    }

    async loadEmployee(employeeId) {
        this.employee = await this.employeeService.findById(employeeId);
        this.firstNameElement.value = this.employee.firstName;
        this.lastNameElement.value = this.employee.lastName;
    }

    async saveEmployee() {
        const firstName = this.firstNameElement.value;
        const lastName = this.lastNameElement.value;
        const updatedEmployee = {...this.employee, firstName, lastName}
        await this.employeeService.update(updatedEmployee);
        console.log('Employee updated');
        await this.loadEmployee(updatedEmployee.id);
        console.log('Employee newly loaded');
    }
}

const employees = new EmployeeService();
const employeeComponent = new EmployeeComponent(employees, 1);

// JavaScript A - apply, B - bind,  C - call

// function foo(arg1) {
//     console.log(arg1);
//     console.log(this);
// }
// foo('Hello');
// foo.call({name: 'this'}, 'Hello');
// foo.apply({name: 'this'}, ['Hello']);

