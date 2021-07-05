class Film {
  constructor(data) {
    this.pk = data.pk;
    this.title = data.title;
    this.episode_id = data.episode_id;
    this.characters = data.characters;
    this.created = data.created;
    this.director = data.director;
    this.edited = data.edited;
    this.opening_crawl = data.opening_crawl;
    this.planets = data.planets;
    this.producer = data.producer;
    this.release_date = data.release_date;
    this.species = data.species;
    this.starships = data.starships;
    this.vehicles = data.vehicles;
  }
}
