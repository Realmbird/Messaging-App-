class Post < ApplicationRecord
  belong_to :user
  belong_to :chatroom 
end
