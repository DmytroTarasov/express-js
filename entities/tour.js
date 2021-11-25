class Tour {
    constructor(departureDate, arrivalDate, departurePlace, arrivalPlace, rating, typeOfTourismId, price, id = -1) {
        this.id = id;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.departurePlace = departurePlace;
        this.arrivalPlace = arrivalPlace;
        this.rating = rating;
        this.typeOfTourismId = typeOfTourismId;
        this.price = price;
    }
}

export default Tour;
