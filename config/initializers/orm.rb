# Configures +hanami-model+ access to the database and mapping between the
# database and underlying objects.

Hanami::Model.configure do
  adapter type: :sql, uri: ENV["DATABASE_URL"]

  mapping PhotoGIS.root.join("config", "mapping").to_s
end

Hanami::Model.load!
