module Helpers
  module HTTP

    # Returns a Ruby Hash with the parsed content of the request body.
    def request_body
      @body ||= JSON.parse(request.body.read)
    end

  end
end
