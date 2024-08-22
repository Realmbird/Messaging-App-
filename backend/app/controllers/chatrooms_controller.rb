class ChatroomsController < ApplicationController
  def index 
    render json: Chatroom.all
  end
  def create
    artist = Artist.create!(artist_params)
    render json: artist, status: :created
  end
  
  def destroy
    Artist.find(params[:id]).destroy
    head :no_content
  end  
  
  def chatroom_params
    params.require(:chatroom).permit(:name) # Adjust attributes as needed
  end
end
