import axios from "axios";
import { useEffect, useState } from "react";

function ProductCurd() {
    const [id, setId] = useState("");
    const [pname, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [img, setImg] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        Load();
    }, []);

    async function Load() {
        try {
            const result = await axios.get("https://localhost:7156/api/Products");
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("https://localhost:7156/api/Products", {
                Pname: pname,
                Price: price,
                Qty: qty,
                Pimg: img,
            });
            alert("Product Added Successfully");
            clearFields();
            Load();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    async function editProduct(product) {
        setId(product.pid);
        setName(product.pname);
        setPrice(product.price);
        setQty(product.qty);
        setImg(product.img);
    }

    async function update(event) {
        event.preventDefault();
        try {
            const productToUpdate = products.find((u) => u.pid === id);
            if (!productToUpdate) {
                throw new Error("Product not found for update.");
            }
            await axios.put("https://localhost:7156/api/Products/" + productToUpdate.pid,
                {
                    Pid: id,
                    Pname: pname,
                    Price: price,
                    Qty: qty,
                    Pimg: img
                }
            );
            alert("Product Updated");
            clearFields();
            Load();
        } catch (err) {
            alert(err.message);
        }
    }



    async function deleteProduct(id) {
        try {
            await axios.delete("https://localhost:7156/api/Products/" + id);
            alert("Product Deleted Successfully");
            clearFields();
            Load();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    const clearFields = () => {
        setId("");
        setName("");
        setPrice("");
        setQty("");
        setImg("");
    };

    return (
        <div>
            <h1>Products Details</h1>
            {/* Form to add and update products */}
            <form>
                {/* Form inputs */}
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        value={pname}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </div>
                <div>
                    <label>Quantity</label>
                    <input
                        type="text"
                        value={qty}
                        onChange={(event) => setQty(event.target.value)}
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type="text"
                        value={img}
                        onChange={(event) => setImg(event.target.value)}
                    />
                </div>
                {/* Buttons to add and update */}
                <div>
                    <button onClick={save}>Add Product</button>
                    <button onClick={update}>Update Product</button>
                </div>
            </form>

            {/* Table to display products */}
            <table>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Image</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.pid}>
                            <td>{product.pid}</td>
                            <td>{product.pname}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td>
                            <td>{product.img}</td>
                            <td>
                                {/* Buttons to edit and delete */}
                                <button onClick={() => editProduct(product)}>Edit</button>
                                <button onClick={() => deleteProduct(product.pid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductCurd;
