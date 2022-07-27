export type Season = 'SUMMER' | 'SPRING' | 'WINTER' | 'AUTUMN';
export const seasons: Season[] = ['SUMMER', 'SPRING', 'WINTER', 'AUTUMN'];

export const leafColors: { [s in Season]: number } = {
  SUMMER: 90,
  SPRING: 120,
  WINTER: 160,
  AUTUMN: 35
};

export class SeasonManager {
  constructor(private season: Season = 'SUMMER') {}

  public setSeason(season: Season): void {
    this.season = season;
  }

  public getSeason(): Season {
    return this.season;
  }

  public get seasonLeafHue(): number {
    return leafColors[this.season];
  }
}
