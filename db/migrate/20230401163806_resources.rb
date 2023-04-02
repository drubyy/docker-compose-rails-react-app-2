class Resources < ActiveRecord::Migration[5.2]
  def change
    create_table :resources do |t|
      t.string :resource_id, null: false, default: ""
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
