const FormJS = (() => {
  const classes = {
    Form: class {

      form = document.createElement('form');
      data = undefined;

      init = ({ action, method }) => {
        if (method.toString().toUpperCase() === "POST") throw new Error("Could not handle post request. Coming Soon!")
        this.form.setAttribute('action', action);
        this.form.setAttribute('method', method.toString().toUpperCase());
        document.body.appendChild(this.form);
      }

      fields = (fields = "Optional fields are to be identified with a ? at the beginning") => {
        if (typeof fields != "object") throw "Error: Acceptable type is only 'Array'";

        fields.map(field => {
          if (field != "submit" ) {
            var inputBox = document.createElement('input');
            inputBox.setAttribute('type', field);

            if (field.toString().search(":") < 0) {
              inputBox.setAttribute('required', '');
            }

            this.form.appendChild(inputBox);
          } 
        });
      };

      setFetchTags = (tags = []) => {
        var formChild = this.form.children;
        var idx = 0;

        tags.map(tag => {
          formChild[idx].setAttribute('name', tag);
          idx++;
        });
      }

      configButton = (displayName, listener = (btn) => {}) => {
        var inputBox = document.createElement('input');
        inputBox.setAttribute('type', 'submit');
        inputBox.setAttribute('value', displayName ? displayName : "submit");

        this.form.appendChild(inputBox);

        return (() => {
          listener(inputBox);
        })();
      }


      formData = () => {
        const children = this.form.children;
        let dataSendable = {}
        let data = [];


        for (var child of children) {
          if (child.getAttribute('type') != "submit") {
            data.push(child.value);
          }
        };

        dataSendable = Object.assign(dataSendable, data);
        
        var options= [];
        options.push(dataSendable);
        options.push(data);

        return options;
      }
    }
  }

  return classes;
})();
