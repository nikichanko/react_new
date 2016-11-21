import React from "react";
import func from "../../globalFunctions";

export default class CartPage extends React.Component{
    constructor(props){
        super(props);
    }

    buildProdcuts(){
        const products = this.props.products || [];
        const pr = products.map(function(product, i){
            return (
                <div class="pruducts" key={product.name} >
                    <div className="pr_name">{product.name}</div>
                    <div className="pr_price">{product.price}</div>
                </div>
            )
        });
        return pr;
    }

    buildRealtedProdcuts(){
        const realted_products = this.props.related_products || [];
        const pr = realted_products.map(function(product, i){
            return (
                <div class="realted-pruducts" key={product.name} >
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
                {this.buildProdcuts()}
                {this.buildRealtedProdcuts()}
            </div>
        );
    }
}