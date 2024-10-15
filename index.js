class Employee {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class EmployeeService {
    constructor() {
        this.employees = [new Employee(1, 'John', 'Doe'),
            new Employee(2, 'Anna', 'Smith')];
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
}

const employees = new EmployeeService();
// old callback style
// employees.findById(1, function (employee) {
//     console.log(employee);
// })

// classical promise style
// employees.findById(3)
//     .then(employee => {
//         console.log(employee);
//         return employee;
//     })
//     .catch(e => {
//         console.log(e.message);
//     });

// async/await style
async function callMe() {
    try {
        const employee = await employees.findById(1)
        console.log(employee);
    } catch (e) {
        console.log(e.message);
    }
}
callMe()

// sync style
// try {
//     const employee = employees.findById(3);
// } catch (e) {
//     console.log(e.message);
//     // throw new Error(e);
//     return 0;
// }
