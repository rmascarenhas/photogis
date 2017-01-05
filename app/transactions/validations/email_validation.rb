module Transactions::Validations

  # Transactions::Validations::EmailValidation
  #
  # Validates a given email address provided. Used in API endpoints that
  # accept email as one of the parameters in the request body.
  #
  # If the email is not given or is in an unrecognised format, this class
  # produces a map of errors containing the related error code.
  class EmailValidation

    # actual regular expression that is used to validate emails.
    EMAIL_RE = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

    attr_reader :email

    def initialize(email)
      @email = email
    end

    def validate
      if email.size == 0
        code = "email_not_given"
      elsif !(email =~ EMAIL_RE)
        code = "email_invalid"
      end

      {}.tap do |errors|
        errors.merge!(email: code) if code
      end
    end

  end
end
