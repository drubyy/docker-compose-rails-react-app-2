class AuthService
  def decode token
    JWT.decode(token, Rails.application.credentials.fetch(:secret_key_base), algorithm: 'HS256', verify_jti: true)[0].symbolize_keys
  rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError => e
    false
  end
end
