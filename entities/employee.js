class Employee {
    constructor(lastName, firstName, middleName, position, workAddress, id = -1) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.middleName = middleName ? middleName : null;
        this.position = position;
        this.workAddress = workAddress ? workAddress : null;
    }
}

export default Employee;
