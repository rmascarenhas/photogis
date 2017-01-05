module Transactions

  # Transactions::LogIn
  #
  # This implements the login functionality. When a user wants to use the app,
  # she needs to provide an email, which must have been previously created.
  class LogIn

    # Transactions::LogIn::Authentication
    #
    # Wraps the result of the log-in operation.
    #
    # authentication = Transactions::LogIn::Authentication.success!(user)
    # authentication.success? # => true
    # authentication.to_h     # => { "name" => "John Doe", "accessToken" => "12345" }
    #
    # authentication = Transactions::LogIn::Authentication.fail!("email" => "email_not_given")
    # authentication.success? # => false
    # authentication.errors   # => { "email" => "email_not_given" }
    class Authentication
      def self.fail!(errors)
        new(nil, errors)
      end

      def self.success!(token)
        new(token, nil)
      end

      attr_reader :user, :errors

      def initialize(user, errors)
        @user = user
        @errors = errors
      end

      def success?
        !!user
      end

      def to_h
        {
          name: user.name,
          accessToken: user.access_token
        }
      end
    end

    attr_reader :body

    def initialize(body)
      @body = body
    end

    def run
      errors = validate

      unless errors.empty?
        return Authentication.fail!(errors)
      end

      Authentication.success!(user)
    end

    private

    def validate
      email = body["email"].to_s.strip

      Validations::EmailValidation.new(email).validate.tap do |errors|
        # if no format errors were found in the email provided, it is necessary
        # to query the database to check if there is a user with the email
        # address given.
        if errors.empty? && !user
          errors.merge!(email: "email_not_found")
        end
      end
    end

    def user
      @_user ||= UserRepository.with_email(body["email"]).first
    end

  end
end
