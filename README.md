PhotoGIS: photo sharing on a map
================================

This is a React application, with a JSON-only back-end.

### Setting up

#### React application (front-end)

Install dependencies:

```console
$ npm install
```

Start the development server with hot reload:

```console
$ npm run start
```

#### Sinatra application (back-end)

Install dependencies

```console
$ bundle install
```

Edit the `.env.example` file in the repository, updating the `DATABASE_URL` environment
variable to point to an existing database in the running system.

Once that is done, export its value in the running shell for easier database migrations:

```console
$ export DATABASE_URL="postgres://user:password@localhost/database"
```

Migrate the database (in order to create all required tables):

```console
$ bundle exec sequel -m db/migrations $DATABASE_URL
```

Finally, start the development server

```console
$ bundle exec rackup
```
