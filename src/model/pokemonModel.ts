export class Pokemon {
  constructor(
    private pokedex: number,
    private name: string,
    private generation: number,
    private type1: string,
    private type2: string,
    private stat_total: number,
    private atk: number,
    private def: number,
    private sta: number
  ) {}

  getPokedex() {
    return this.pokedex;
  }

  getName() {
    return this.name;
  }
  getGeneration() {
    return this.generation;
  }
  gettype1() {
    return this.type1;
  }
  getType2() {
    return this.type2;
  }
  getStatTotal() {
    return this.stat_total;
  }
  getAtk() {
    return this.atk;
  }
  getDef() {
    return this.def;
  }
  getSta() {
    return this.sta;
  }

  static toPokemonModel(poke?: any): Pokemon {
    return new Pokemon(
      poke?.pokedex,
      poke?.name,
      poke?.generation,
      poke?.type1,
      poke?.type2,
      poke?.stat_total,
      poke?.atk,
      poke?.def,
      poke?.sta
    );
  }
}

//okay I could separate better this, idc
export interface PokemonDTO {
  pokedex?: string | number;
  name?: string;
  generation?: string | number;
  type1?: string;
  type2?: string;
  stat_total?: string | number;
  atk?: string | number;
  def?: string | number;
  sta?: string | number;
  page?: string | number;
  offset?: string | number;
  limit?: string | number;
}
