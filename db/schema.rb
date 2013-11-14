# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131114195542) do

  create_table "authorizations", :force => true do |t|
    t.string   "provider"
    t.string   "uid"
    t.integer  "user_id"
    t.string   "token"
    t.string   "secret"
    t.string   "name"
    t.string   "link"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "comments", :force => true do |t|
    t.integer  "workout_id", :null => false
    t.integer  "author_id",  :null => false
    t.text     "text",       :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "comments", ["author_id"], :name => "index_comments_on_author_id"
  add_index "comments", ["workout_id"], :name => "index_comments_on_workout_id"

  create_table "fistbumps", :force => true do |t|
    t.integer  "workout_id", :null => false
    t.integer  "bumper_id",  :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "fistbumps", ["bumper_id"], :name => "index_fistbumps_on_bumper_id"
  add_index "fistbumps", ["workout_id"], :name => "index_fistbumps_on_workout_id"

  create_table "follows", :force => true do |t|
    t.integer  "follower_id",      :null => false
    t.integer  "followed_user_id", :null => false
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "follows", ["followed_user_id"], :name => "index_follows_on_followed_user_id"
  add_index "follows", ["follower_id"], :name => "index_follows_on_follower_id"

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0,  :null => false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name",                                   :null => false
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

  create_table "workouts", :force => true do |t|
    t.integer  "user_id",                                    :null => false
    t.datetime "datetime"
    t.string   "workout_type",           :default => "bike"
    t.float    "distance"
    t.integer  "elevation"
    t.boolean  "is_private",             :default => false
    t.datetime "created_at",                                 :null => false
    t.datetime "updated_at",                                 :null => false
    t.string   "gpx_track_file_name"
    t.string   "gpx_track_content_type"
    t.integer  "gpx_track_file_size"
    t.datetime "gpx_track_updated_at"
    t.string   "title"
    t.text     "description"
    t.string   "pace"
    t.integer  "hrAvg"
    t.integer  "moving_time"
    t.integer  "max_hr"
  end

  add_index "workouts", ["distance"], :name => "index_workouts_on_distance"
  add_index "workouts", ["moving_time"], :name => "index_workouts_on_moving_time"
  add_index "workouts", ["user_id"], :name => "index_workouts_on_user_id"

end
