Sequel.migration do
  change do
    create_table(:users) do
      primary_key :id

      column :name,         String, null: false
      column :email,        String, null: false
      column :access_token, String, null: false

      # bookkeeping timestamps. These are managed directly by the `hanami-model`
      # ORM when records are inserted/updated
      column :created_at, Time, null: false
      column :updated_at, Time, null: false

      # access tokens are used to identify authenticated API requests. Looking
      # up by access token should be a fast operation, and the tokens should
      # be unique across all users
      index :access_token, unique: true

      # email accounts should obviously be unique
      index :email, unique: true
    end
  end
end
