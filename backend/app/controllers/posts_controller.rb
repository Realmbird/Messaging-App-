class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    chatroom = Chatroom.find(params[:chatroom_id])
    posts = chatroom.posts 
    render json: posts.map { |post| post.as_json.merge(username: post.user.name) }
  end

  def create
     # Create a new post with the message from chatroom_params
      post = Post.new(chatroom_params)

      # Associate the post with the current user
      post.user = current_user

      # Find the chatroom using the id passed in the parameters
      chatroom = Chatroom.find(params[:id])

      # Associate the post with the found chatroom
      post.chatroom = chatroom

      # Save the post
      if post.save
        render json: post, status: :created
      else
        render json: post.errors, status: :unprocessable_entity
      end
  end
  
  def chatroom_params
    params.require(:chatroom).permit(:message) # Adjust attributes as needed
  end
end
