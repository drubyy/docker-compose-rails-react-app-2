class AddJtiToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :jti, :string
    add_index :users, :jti
  end
end
