# These overrides add support for variable-exists(), mixin-exists() and function-exists()
# to SASS 3.1.7. These functions are added to SASS in 3.3, so when Sencha Cmd is upgraded
# to use SASS 3.3 these overrides should be removed.
# Some monkey patching was required to get these methods working, specifically, we had to
# add the "environment" instance variable to EvaluationContext.  These patches should be
# removed when Cmd is upgraded to use SASS 3.3.  Additionally, if Cmd is upgraded to use
# SASS 3.2, these patches may need to be updated, because the _perform() method underwent
# changes from 3.1 - 3.2

# These functions are not currently included in the build.  To use them, add this file
# to the ruby path. e.g.
# package.sass.rubypath=${package.dir}/sass/utils.rb,${package.dir}/sass/overrides.rb

module Sass::Script
  class Funcall
    def _perform(environment)
      args = @args.map {|a| a.perform(environment)}
      if fn = environment.function(@name)
        keywords = Sass::Util.map_hash(@keywords) {|k, v| [k, v.perform(environment)]}
        return perform_sass_fn(fn, args, keywords)
      end 

      ruby_name = @name.tr('-', '_')
      args = construct_ruby_args(ruby_name, args, environment)

      unless Functions.callable?(ruby_name)
        opts(to_literal(args))
      else
        ###############################################################################
        # BEGIN PATCH
        ###############################################################################
        context = Functions::EvaluationContext.new(environment.options)
        context.instance_variable_set('@environment', environment)
        opts(context.send(ruby_name, *args))
        ###############################################################################
        # END PATCH
        ###############################################################################
      end
    rescue ArgumentError => e
      raise e unless e.backtrace.any? {|t| t =~ /:in `(block in )?(#{name}|perform)'$/}
      raise Sass::SyntaxError.new("#{e.message} for `#{name}'")
    end
  end

  module Functions
    ###################################################################################
    # BEGIN PATCH
    ###################################################################################
    class EvaluationContext
      attr_reader :environment
    end  
    ###################################################################################
    # END PATCH
    ###################################################################################

    def variable_exists(variable_name)
      if(environment.var(variable_name.value))
        Sass::Script::Bool.new(true)
      else
        Sass::Script::Bool.new(false)
      end
    end

    def mixin_exists(mixin_name)
      if(environment.mixin(mixin_name.value))
        Sass::Script::Bool.new(true)
      else
        Sass::Script::Bool.new(false)
      end
    end

    def function_exists(function_name)
      if(environment.function(function_name.value))
        Sass::Script::Bool.new(true)
      else
        Sass::Script::Bool.new(false)
      end
    end
  end
end

