
class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  respond_to :json
  private

  def respond_with(current_user, _opts = {})
    if resource.persisted?
      render json: {
        status: {code: 200, message: 'Signed up successfully.'},
        data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: {message: "User couldn't be created successfully. #{current_user.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end

  def update 
    user = current_user
    if user.update(user_params)
      render json: { 
        status: { code: 200, message: 'Account updated successfully.' },
        data: UserSerializer.new(user).serializable_hash[:data][:attributes]
      }
    else
      render json: { 
        status: { message: "Account couldn't be updated successfully. #{user.errors.full_messages.to_sentence}" },
        status: :unprocessable_entity
      }
    end
  end
end