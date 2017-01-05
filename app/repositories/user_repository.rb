# UserRepository
#
# Query methods for the `users` table
class UserRepository
  include Hanami::Repository

  def self.count
    query.count
  end

  def self.with_email(email)
    query { where(email: email) }
  end
end
