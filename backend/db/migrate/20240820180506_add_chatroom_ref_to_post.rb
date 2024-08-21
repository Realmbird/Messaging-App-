class AddChatroomRefToPost < ActiveRecord::Migration[7.0]
  def change
    add_reference :posts, :chatroom, null: false, foreign_key: true
  end
end
