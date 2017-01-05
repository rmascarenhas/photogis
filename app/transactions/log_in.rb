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
    # authentication = Transactions::LogIn::Authentication.success!("12345")
    # authentication.success?     # => true
    # authentication.access_token # => "12345"
    #
    # authentication = Transactions::LogIn::Authentication.fail!("email" => "email_not_given")
    # authentication.success? # => false
    # authentication.errors   # => { "email" => "email_not_given" }
    class Authentication
      def self.fail!(errors)
        new(nil, errors)
      end

      def self.success(token)
        new(token, nil)
      end

      attr_reader :access_token, :errors

      def initialize(access_token, errors)
        @access_token = access_token
        @errors = errors
      end

      def success?
        !!access_token
      end
    end

    attr_reader :body

    # actual regular expression that is used to validate emails.
    EMAIL_RE = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

    def initialize(body)
      @body = body
    end

    def run
      errors = validate

      unless errors.empty?
        return Authentication.fail!(errors)
      end

      Authentication.success!(user.access_token)
    end

    private

    def validate
      email = body["email"].to_s.strip

      if email.size == 0
        code = "email_not_given"
      elsif !(email =~ EMAIL_RE)
        code = "email_invalid"
      elsif !user
        code = "email_not_found"
      end

      {}.tap do |errors|
        errors.merge!(email: code) if code
      end
    end

    def user
      @_user ||= UserRepository.with_email(body["email"]).first
    end

  end
end
