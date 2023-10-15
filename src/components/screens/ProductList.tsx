import React from 'react';
import ProductItem from "../ProductItem";
import IProduct, {emptyProduct} from "../../types/IProduct";
import ProductForm from "../ProductForm";
import {emptyDetails} from "../../types/IProductDetails";
import useProducts from "../../hooks/useProducts";
import useAdmin from "../../hooks/useAdmin";

const ProductList = () => {
    const products = useProducts()
    const { isAdmin} = useAdmin()

    return <div className="flex flex-wrap justify-center">
        {products.map((item: IProduct) => <ProductItem item={item}/>)}
        {isAdmin && <ProductForm existingProductInfo={{product: emptyProduct, details: emptyDetails}}/>}
    </div>;
}

export default ProductList