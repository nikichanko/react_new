import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LazyLoad from 'react-lazyload';

import func from "../../globalFunctions";
import '../../../css/animations.css';

const PAGECONST = {
    PRODUCTS_WAPPER_C   : 'pruducts',
    REALTEDPR_WAPPER_C  : 'realted-products',
    PRODUCT_NAME_C      : 'pr_name',
    PRODUCT_PRICE_C     : 'pr_price',
    APPER_C             : 'example2'
}

export default class CartPage extends React.Component{
    constructor(props){
        super(props);
        this.products = this.props.products || [];
        this.realted_products = this.props.related_products || [];
    }

    buildProdcuts(){ 
        return this.products.map(function(product, i){
            return (
                <LazyLoad key={product.name} height={200} placeholder={(<span>niki</span>)} offset={100}>
                    <div className={PAGECONST.PRODUCTS_WAPPER_C}  >
                        <div className={PAGECONST.PRODUCT_NAME_C}>{product.name}</div>
                        <div className={PAGECONST.PRODUCT_PRICE_C}>{product.price}</div>
                    </div>
                </LazyLoad>
            )
        });
    }

    buildRealtedProdcuts(){
        return this.realted_products.map(function(product, i){
            return (
                <ReactCSSTransitionGroup key={product.name}
                    transitionName={PAGECONST.APPER_C}
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={0}
                    transitionLeaveTimeout={0}>
                    <div className={PAGECONST.REALTEDPR_WAPPER_C}  >
                        <div className={PAGECONST.PRODUCT_NAME_C}>{product.name}</div>
                        <div className={PAGECONST.PRODUCT_PRICE_C}>{product.price}</div>
                    </div>
                </ReactCSSTransitionGroup>
            )
        });
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