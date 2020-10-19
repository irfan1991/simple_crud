import React , {useState, useEffect} from 'react'
import { useHistory, useParams } from "react-router-dom";
import Axios from 'axios'

export default function Single() {
    const history = useHistory()
    const { productId } = useParams()
    const [product, setProduct] = useState({
        name : '',
        price : 0,
        stock : 1,
        status : true
    })

    useEffect(() => {
        Axios.get(`http://localhost:3000/product/${productId}`
        ).then(response => {
            const {status, message, data} = response.data

            if (status === 'success') {
                setProduct(data)
            } else {
                alert(message)
            }
        })
        .catch( error =>{
            alert(error)
        })
        // return () => {
        //     cleanup
        // }
    }, [productId])
    return (
        <div>
            <h2>Halaman Single Product</h2>
            {product && <>
            <div>Name : {product.name}</div>
            <div>Price : {product.price}</div>
            <div>StocK : {product.stock}</div>
            <div>Status : {product.status  ?'on' : 'off'}</div>
            </>}
            <button onClick={() => history.push('/product')}>&laquo; back</button>
        </div>
    )
}
