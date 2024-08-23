class Chatroom < ApplicationRecord
  has_many :posts
  has_many :chatrooms_users
  has_many :users, through: :chatrooms_users
end
