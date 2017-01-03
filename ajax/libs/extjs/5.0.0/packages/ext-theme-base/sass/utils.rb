module ExtJS
  module SassExtensions
    module Functions
      module Utils
        @maps = Array.new()
        class << self; attr_accessor :maps; end

        def parsebox(list, n)
          assert_type n, :Number
          if !n.int?
            raise ArgumentError.new("List index #{n} must be an integer")
          elsif n.to_i < 1
            raise ArgumentError.new("List index #{n} must be greater than or equal to 1")
          elsif n.to_i > 4
            raise ArgumentError.new("A box string can't contain more then 4")
          end

          new_list = list.clone.to_a
          size = new_list.size
                      
          if n.to_i >= size
            if size == 1
              new_list[1] = new_list[0]
              new_list[2] = new_list[0]
              new_list[3] = new_list[0]
            elsif size == 2
              new_list[2] = new_list[0]
              new_list[3] = new_list[1]
            elsif size == 3
              new_list[3] = new_list[1]
            end
          end
          
          new_list.to_a[n.to_i - 1]
        end
        
        def parseint(value)
          Sass::Script::Number.new(value.to_i)
        end

        def ERROR(message)
          raise ArgumentError.new(message)
        end

        def map_create()
          map = Hash.new()
          id = Utils.maps.length;
          Utils.maps.insert(id, map);
          Sass::Script::Number.new(id+1)
        end
        def map_get(mapId, key)
          id = mapId.to_i()-1
          map = Utils.maps[id]
          k = key.to_s()
          v = map[k]
          if !v
            v = Sass::Script::String.new("")
          end
          v
        end
        def map_put(mapId, key, value)
          id = mapId.to_i()-1
          map = Utils.maps[id]
          k = key.to_s()
          map[k] = value
        end
        
        # Joins 2 file paths using the path separator
        def file_join(path1, path2)
          path1 = path1.value
          path2 = path2.value
          path = path1.empty? ? path2 : File.join(path1, path2)
          Sass::Script::String.new(path)
        end

        def theme_image_exists(directory, path)
          result = false

          where_to_look = File.join(directory.value, path.value)
          
          if where_to_look && FileTest.exists?("#{where_to_look}")
            result = true
          end

          return Sass::Script::Bool.new(result)
        end

        # workaround for lack of @error directive in sass 3.1
        def error(message)
          raise Sass::SyntaxError, message.value
        end

        # This function is primarily to support compatibility when moving from sass 3.1 to 3.2
        # because of the change in behavior of the null keyword when used with !default.
        # in 3.1 variables defaulted to null are considered to have an assigned value
        # and thus cannot be reassigned.  In 3.2 defaulting to null is the same as leaving
        # the variable undeclared
        def is_null(value)
            n = false
            begin
                # in Sass 3.2 null values are an instance of Sass::Script::Null
                # this throws an exception in Sass 3.1 because the Null class doesn't exist
                n = (value.is_a? Sass::Script::Null) || (value.is_a? Sass::Script::String) && value.value == 'null' || value.value == 'none'
            rescue NameError=>e
                # Sass 3.1 processes null values as a string == "null"
                n = (value.is_a? Sass::Script::String) && value.value == 'null' || value.value == 'none'
            end
            return Sass::Script::Bool.new(n)
        end
      end
    end
  end
end

module Sass::Script::Functions
  include ExtJS::SassExtensions::Functions::Utils
end