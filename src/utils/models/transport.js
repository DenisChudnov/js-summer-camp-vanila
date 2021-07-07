export class Transport{
  constructor(data) {
    this.pk = data.pk;
    this.cargo_capacity = data.cargo_capacity;
    this.consumables = data.consumables;
    this.crew = data.crew;
    this.length = data.length;
    this.manufacturer = data.manufacturer;
    this.max_atmosphering_speed = data.max_atmosphering_speed;
    this.model = data.model;
    this.name = data.name;
    this.passengers = data.passengers;
  }
}
