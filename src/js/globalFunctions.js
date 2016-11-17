var self = {
    getDate: function(){
        return new  Date();
    },
    extend: function (defaults, options) {
        this.defaults = defaults;
        this.options = options;
        this.buildExtended = function(){
            var extended = {};
            for (var prop in this.defaults) {
                if (Object.prototype.hasOwnProperty.call(this.defaults, prop)) {
                    extended[prop] = this.defaults[prop];
                }
            }
            for (var prop in this.options) {
                if (Object.prototype.hasOwnProperty.call(this.options, prop)) {
                    extended[prop] = this.options[prop];
                }
            }
            return extended;
        }

        return this.buildExtended();
    },
    xmlhttpRequest: function (options) {
        const defaults = {
            url: '',
            type: 'GET',
            params: '',
            onCompleteRequest: function(response){console.log(response)},
            onStartRequest: function(){},
            onError404: function(){console.log("Error 400")},
            onErrorAll: function(){console.log("Other error")}
        };
        this.settings = self.extend(defaults, options);
        this.xmlhttp = new XMLHttpRequest();
        this.doRequest = function() {
            var obj = this;

            //open xml request
            obj.xmlhttp.open(obj.settings.type, obj.settings.url, true);
            obj.settings.onStartRequest();

            //result for xml request
            obj.xmlhttp.onreadystatechange = function() {
                if (obj.xmlhttp.readyState == XMLHttpRequest.DONE ) {
                    if (obj.xmlhttp.status == 200) {
                        obj.settings.onCompleteRequest(obj.xmlhttp.responseText);
                    }
                    else if (obj.xmlhttp.status == 400) {
                        obj.settings.onError404();
                    }
                    else {
                        obj.settings.onErrorAll();
                    }
                }
            }
            //send xml request
            obj.xmlhttp.send(obj.settings.params);
        }
    }
}
module.exports = self;