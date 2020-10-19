import React , {useState, useEffect} from 'react'
import Axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'

export default function Update() {
    const history = useHistory()
    const {productId} = useParams()

    const [product, setProduct] = useState({
        name : '',
        price : 0,
        stock : 1,
        status : true
    })

    useEffect(() => {
        Axios.get(`http://localhost:3000/product/${productId}`)
        .then(response => {
            const {status, message, data} = response.data

            if (status === 'success') {
                setProduct(data)
            } else {
                alert(message)
            }
        })
        .catch(error => {
            alert(error)
        })
        
    }, [productId])

    const handleChange = (e, name) =>{
        const value = e.target.value
        setProduct({...product, [name] : value})
    }

    const handleClick = async (e) => {
        e.preventDefault()

        try {
            
            const response = await Axios.put(`http://localhost:3000/product/${productId}`, product)
            const {status, message, data} = response.data
            if (status === 'success') {
                alert(message)
                history.push('/product')
            } else {
                alert(message)
            }
        } catch (error) {
            alert('Network error because '+ error.getMessage())
        }

    }

    return (
        <div>
            <h2>Halaman Edit</h2>

            <form>
                <label>Name</label>
                <input type="text" size={50} value={product.name} onChange={ e => handleChange(e, 'name')} />
                <br />

                <label>Price</label>
                <input type="number" value={product.price} onChange={ e => handleChange(e, 'price')} />
                <br />

                <label>Stock</label>
                <input type="number" size={30} value={product.stock} onChange={ e => handleChange(e, 'stock')} />
                <br />

                <label>Statu</label>
                <select value={product.status} onChange={ e => handleChange(e, 'status')}>
                    <option value={false}>Off</option>                   
                    <option value={true}>On</option> 
                </select>
                <br />

                <label></label>
                <button onClick={handleClick}>Submit</button>
                <button onClick={() => history.push('/product')}>&laquo; back</button>
            </form>

        </div>
    )
}
