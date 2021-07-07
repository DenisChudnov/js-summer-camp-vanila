export class Vehicle{
  constructor(data) {
    this.pk = data.pk;
    this.vehicle_class = data.vehicle_class;
    this.pilots = (data.pilots || []);
  }
}
