export class Starship{
  constructor(data) {
    this.pk = data.pk;
    this.MGLT = data.MGLT;
    this.hyperdrive_rating = data.hyperdrive_rating;
    this.starship_class = data.starship_class;
    this.pilots = (data.pilots || []);
  }
}
