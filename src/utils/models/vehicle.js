export class Vehicle{
  constructor(data) {
    this.pk = data.pk;
    this.class = data.class;
    this.pilots = (data.pilots || []);
  }
}
