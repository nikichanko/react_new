const that = {
    getDate: function(){
        return new  Date();
    },
    createMarkup: function(html_str){
         return {__html: html_str}; 
    },
    extend: function () {
        let obj = {};
        for (var i=0; i<arguments.length; i++) {
        for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    obj[key] = arguments[i][key];
                }
            }
        }
        return obj;
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
        this.settings = that.extend(defaults, options);
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
    },
    roughSizeOfObject : function ( object ) {
        var objectList = [];
        var stack = [ object ];
        var bytes = 0;

        while ( stack.length ) {
            var value = stack.pop();

            if ( typeof value === 'boolean' ) {
                bytes += 4;
            }
            else if ( typeof value === 'string' ) {
                bytes += value.length * 2;
            }
            else if ( typeof value === 'number' ) {
                bytes += 8;
            }
            else if
            (
                typeof value === 'object'
                && objectList.indexOf( value ) === -1
            )
            {
                objectList.push( value );

                for( var i in value ) {
                    stack.push( value[ i ] );
                }
            }
        }
        return bytes;
    }
}
/*
Object.defineProperty(Object.prototype, "extend", {
    enumerable: false,
    value: function(from) {
        var props = Object.getOwnPropertyNames(from);
        var dest = this;
        props.forEach(function(name) {
            if (name in dest) {
                var destination = Object.getOwnPropertyDescriptor(from, name);
                Object.defineProperty(dest, name, destination);
            }
        });
        return this;
    }
});
*/
module.exports = that;