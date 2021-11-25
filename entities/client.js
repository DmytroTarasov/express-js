class Client {
    constructor(lastName, firstName, middleName, dateOfBirth, residenceAddress, id = -1) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.middleName = middleName ? middleName : null;
        this.dateOfBirth = dateOfBirth;
        this.residenceAddress = residenceAddress ? residenceAddress : null;
    }
}

export default Client;
