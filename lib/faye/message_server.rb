require 'net/http'

module Faye
  class MessageServer

    def send(who, what)
      Thread.new do
        message = {:channel => who, :data => what}
        uri = URI.parse('http://localhost:8000/faye')
        Net::HTTP.post_form(uri, :message => message.to_json)
        ActiveRecord::Base.connection.close
      end
    end

  end
end
