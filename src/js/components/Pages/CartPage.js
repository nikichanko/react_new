import React from "react";
import func from "../../globalFunctions";

export default class CartPage extends React.Component{
    constructor(props){
        super(props);
    }

    buildProdcutsStructure(){
        const products = this.props.products || [];
        const pr = products.map(function(product, i){
            return (
                <div class="priducts" key={product.name} >
                    <div className="pr_name">{product.name}</div>
                    <div className="pr_price">{product.price}</div>
                </div>
            )
        });
        return pr;
    }
    render(){
        return(
            <div className="cart">
                {this.props.extraContent && <div dangerouslySetInnerHTML={func.createMarkup(this.props.extraContent)} />}
                {this.buildProdcutsStructure()}
            </div>
        );
    }
}