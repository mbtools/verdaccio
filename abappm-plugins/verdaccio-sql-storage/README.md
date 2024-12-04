# SQL Storage Plugin

This is a storage plugin using a Postgres SQL database. The integration is done using [Drizzle ORM](https://orm.drizzle.team/).

```sh
mkdir -p ./install-here/

npm install --install-strategy=shallow --bin-links=false --save=false --package-lock=false --omit=dev --omit=optional --omit=peer  --prefix ./install-here/ verdaccio-sql-storage

mv ./install-here/node_modules/verdaccio-sql-storage/ /verdaccio/plugins/
```
