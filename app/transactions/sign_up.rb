require "securerandom"

module Transactions

  class SignUp

    # Transactions::SignUp::Account
    #
    # Wraps the response for sign-up transactions. Able to determine if the
    # new user account was successfully created. The serialization of this class
    # can be used as API response to callers.
    #
    # Usage
    #
    #   account = Transactions::SignUp::Account.fail!(email: "email_not_given")
    #   account.created? # => false
    #
    #   account = Transactions::SignUp::Account.fail!(user)
    #   account.created? # => true
    #   account.to_h     # { "name" => "John Doe", "accessToken" => "12345" }
    class Account
      def self.fail!(errors)
        new(nil, errors)
      end

      def self.success!(user)
        new(user, nil)
      end

      attr_reader :user, :errors

      def initialize(user, errors)
        @user = user
        @errors = errors
      end

      def created?
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

      if errors.any?
        return Account.fail!(errors)
      end

      user = create_user
      Account.success!(user)
    end

    private

    def create_user
      access_token = SecureRandom.base64(24)
      user = User.new(name: body["name"], email: body["email"], access_token: access_token)

      UserRepository.create(user)
    end

    # validation errors =
    #   validation errors from the `name` field
    #   +
    #   validation errors from the `email` field
    def validate
      validate_name.merge(validate_email)
    end

    # a name is valid as long as it is given.
    def validate_name
      name = body["name"].to_s.strip

      if name.size == 0
        { name: "name_not_given" }
      else
        {}
      end
    end

    def validate_email
      email = body["email"].to_s.strip

      Validations::EmailValidation.new(email).validate.tap do |errors|
        # if no format errors were found in the email provided, verify
        # if there isn't already an account with the provided email, in
        # which case the user needs to be notified.
        if errors.empty?
          existing_user = UserRepository.with_email(email).first
          errors.merge!(email: "email_taken") if existing_user
        end
      end
    end

  end

end
