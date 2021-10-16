import { BaseDatabase } from "./baseDatabase";

export class Migrations extends BaseDatabase {
  public async createTable() {
    await this.getConnection().raw(
      `CREATE TABLE pokemon_table (
pokedex int primary key,
name varchar (128),
generation int,
type1 varchar(128),
type2 varchar(128),
stat_total int,
atk int,
def int,
sta int
);`
    );
  }
}

const migrations = new Migrations();

migrations.createTable();
