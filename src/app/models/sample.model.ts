export class Sample {
    constructor(
        public country: string,
        public newCases: number,
        public newDeaths: number,
        public recovered: number,
        public tests: number,
        public casesOverall: number,
        public deathsOverall: number) {}
  }