export class Species{
  constructor(data) {
    this.pk = data.pk;
    this.peoples = data.peoples || [];
    this.average_height = data.average_height;
    this.average_lifespan = data.average_lifespan;
    this.classification = data.classification;
    this.designation = data.designation;
    this.eye_colors = data.eye_colors;
    this.hair_colors = data.hair_colors;
    this.homeworld = data.homeworld;
    this.language = data.language;
    this.name = data.name;
  }
}
