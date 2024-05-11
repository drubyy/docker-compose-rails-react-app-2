module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      token = request.headers[:HTTP_SEC_WEBSOCKET_PROTOCOL]&.split(" ")&.last
      reject_unauthorized_connection unless token

      decode_value = AuthService.new.decode token
      reject_unauthorized_connection unless decode_value

      participant = User.find_by(id: decode_value[:sub])
      participant || reject_unauthorized_connection
    end
  end
end
