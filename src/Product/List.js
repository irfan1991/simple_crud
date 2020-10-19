import React , {useState, useEffect} from 'react'
import Axios from 'axios'
import { useHistory } from "react-router-dom";

export default function List() {
    const [products, setProducts] = useState([])
    const history = useHistory()

    useEffect(() => {
        Axios.get('http://localhost:3000/products'
        ).then(response => {
            const {status, message, data} = response.data

            if (status === 'success') {
                setProducts(data)
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
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('yakin mau hapus data ini ?')) {
            try {
               const response = await Axios.delete(`http://localhost:3000/product/${id}`)
               const {message} = response.data
               alert(message)
               window.location.reload()
            } catch (error) {
                alert('Network error because'+ error.getMesaage())
            }
        }
    }
    return (
        <div>
            <h2>Halaman List Product</h2>
            <a href="/product/create">CREATE DATA</a>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product, index)=>{
                        return <tr key={index}>
                            <td><a href={`/product/single/${product._id}`}>{product.name}</a></td>
                            <td className="center">{product.price}</td>
                            <td className="center">{product.stock}</td>
                            <td className="center"><a href={`/product/update/${product._id}`}> update </a>
                            <button onClick={() => handleDelete(product._id)}>Delete</button></td>
                        </tr>
                    })}
                </tbody>

            </table>

        </div>
    )
}
