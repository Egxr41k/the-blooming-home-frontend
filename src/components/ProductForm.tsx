import React, {useState} from "react";
import {IProduct} from "../types/IProduct";
import {RequestHandler} from "../services/RequestHandler";
const ProductForm = () => {
    const emptyProduct: IProduct = {
        count: 0,
        description: "",
        id: 0,
        imageSrc: "",
        isAvailable: false,
        isSale: false,
        name: "",
        newPrice: 0,
        oldPrice: 0
    }
    const [product, setProduct] = useState(emptyProduct)
    const [selectedImage, setSelectedImage] = useState<File |  undefined>();
    let message: string = "Додати товар"
    const createProduct = async (e:any)  => {
        e.preventDefault()
        if (selectedImage) {
            RequestHandler()
                .saveImage(selectedImage)
                .then(response => {
                    setProduct(prevState => ({
                        ...prevState, imageSrc: response as string
                    }))
                })
        }
        const result = await RequestHandler().create(product)
        if (result) message = "товар успішно доданий, бажаете додати ще?"
        setProduct(emptyProduct)
    }
    return <div className="w-80 h-160 bg-fuchsia-50 mx-10 my-5">
        {selectedImage && (
            <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected image"
                className="w-full h-72"/>
        )}
        <form className="h-64 p-6" encType="multipart/form-data" method="post">
            <h2 className="text-xl font-semibold">{message}</h2>
            <input type="file" id="fileInput" accept=".jpg"
                   className="block w-full my-2 text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-black file:text-white
                       hover:file:bg-fuchsia-600 "
                   onChange={event => {
                       setSelectedImage(event.target.files?.[0])
                   }}/>

            <div className="flex flex-wrap justify-between">
                <input className="w-48 my-2" placeholder="назва" type="text"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState, name: event.target.value
                           }))
                       }} value={product.name}/>
                <input className="w-16 my-2" placeholder="кількість" type="number"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState,  count: parseInt(event.target.value), isAvailable: true
                           }))
                       }} value={product.count}/>

                <input className="w-32 my-2" placeholder="стара ціна" type="number"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState,  oldPrice: parseInt(event.target.value), isSale: true
                           }))
                       }} value={product.oldPrice}/>

                <input className="w-32 my-2" placeholder="нова ціна" type="number"
                       onChange={event => {
                           setProduct(prevState => ({
                               ...prevState,  newPrice: parseInt(event.target.value)
                           }))
                       }} value={product.newPrice}/>
            </div>
            <textarea className="w-full h-20 my-2" placeholder="опис"
                      onChange={event => {
                          setProduct(prevState => ({
                              ...prevState, description: event.target.value
                          }))
                      }} value={product.description} />
            <button className="font-semibold border-0
                        bg-black text-white rounded-md px-10 py-2
                        hover:bg-fuchsia-600"
                    onClick={createProduct}>
                Додати
            </button>
        </form>
    </div>
}
export default ProductForm

