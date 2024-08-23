class CreateChatroomsUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :chatrooms_users do |t|
      t.references :chatroom, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :chatrooms_users, [:chatroom_id, :user_id], unique: true
  end

  # add_index :chatrooms_users, [:chatroom_id, :user_id], unique: true
end
