# UserRepository
#
# Query methods for the `users` table
class UserRepository
  include Hanami::Repository

  def self.count
    query.count
  end
end
