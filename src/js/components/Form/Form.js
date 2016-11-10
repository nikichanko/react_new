import React from "react";

export default class Form extends React.Component{
    constructor(props){
        super(props);

        this.state = {fields_: this.props.fields.map(function(field){
            return {id: field.id, className:''}
        })};

       this.handleValidation = this.handleValidation.bind(this);
    }

    handleValidation(event) {
        let value = event.target.value;
        let field_id = event.target.id;
        let field = this.refs[field_id];

        let validation_regex = field.props.validation_regex;
        if(validation_regex === undefined) {
           // return
        }
        //this field has validation
            console.log(1);
                    let fields = this.state.fields_;
        fields.map(function(f, i){
            if(f.id === field_id){
                fields[i].className = 'niki';
            }
        });
        console.log(fields);
        this.setState({ fields_ : fields});
    


        //console.log(this.state);
    //    let f_values = this.state.fields_values;
       // let self_field = .getElementById(i);
     //   console.log(self_field);
      //  if(self_field.lenght)
     //       f_values[i].value = self_field.value;
     //   console.log(self_field.value);
     // //  f_values[0].value = event.target.value;
       // id = event.target.id;
      //  console.log(event.target.id);
      //   f_values[i].value = 
   //     console.log(event.target.value);
      //  feildss[i].value = 'niki';
     //   this.setState({fields: feildss});
       // console.log(1);
       // console.log(event.target.value);
//console.log(i);
    //    let fields = this.state.fields;
    //    console.log(fields[i]);
     //   console.log(fields);
    //    return;
        //       fields[i].value +=  'niki';

     //   this.setState({ fields_values : f_values});
    }

    FromfieldsBuild(){
        const self = this;
        return self.props.fields.map(function(input, i){
            if(input.type !== 'textarea')
                return <Input key={input.id} id={input.id} type={input.type} name={input.name} 
                            label={input.hasOwnProperty('label')?input.label:''}
                            validation_regex={input.hasOwnProperty('validation_regex')?input.validation_regex:''}
                            onCh={self.handleValidation}
                            className={self.state.fields_[i].className}
                            ref={input.id}
                        />
            else
                return <Textarea key={input.id} id={input.id} name={input.name} onCh={self.handleValidation} ref={input.id}
                        />
        });
    }

    render(){
        const fields = this.FromfieldsBuild();
        return(
           <form action={this.props.action} method={this.props.method}>
                {fields}
           </form>
        )
    }
}

class Textarea extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <textarea id={this.props.id} value={this.props.value} onChange={this.props.onCh}/>
                {this.props.validation_regex !== '' && (<div className={'error_'+this.props.id}></div>)}
            </div>
        )
    }
}

class Input extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onCh} className={this.props.className}/>
                {this.props.label !== '' && (<label for={this.props.id}>{this.props.label}</label>)}
                {this.props.validation_regex !== '' && (<div className={'error_'+this.props.id}></div>)}
            </div>
        )
    }
}