export class Planet{
  constructor(data) {
    this.pk = data.pk;
    this.climate = data.climate;
    this.diameter = data.diameter;
    this.gravity = data.gravity;
    this.name = data.name;
    this.orbital_period = data.orbital_period;
    this.population = data.population;
    this.rotation_period = data.rotation_period;
    this.surface_water = data.surface_water;
    this.terrain = data.terrain;
  }
}
