class ChatroomsController < ApplicationController
  before_action :authenticate_user!
  def index 
    render json: Chatroom.all
  end
  def create
    chatroom = current_user.chatrooms.build(chatroom_params) # Associate the chatroom with the current user
    if chatroom.save
      render json: chatroom, status: :created
    else
      render json: { error: chatroom.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    chatroom = Chatroom.find(params[:id])
    current_user.chatrooms.push(chatroom)
    render json: chatroom
  end

  def current_rooms
    chatrooms = current_user.chatrooms
    render json: chatrooms
  end
  
  def destroy
    Chatroom.find(params[:id]).destroy
    head :no_content
  end
  def show
    render json: Chatroom.find(params[:id])
  end  
  
  def chatroom_params
    params.require(:chatroom).permit(:name) # Adjust attributes as needed
  end
end
