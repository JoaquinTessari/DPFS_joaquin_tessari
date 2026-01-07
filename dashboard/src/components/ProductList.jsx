import React, { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    setProducts(data.data);
                }
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.category ? product.category.name : 'N/A'}</td>
                                    <td><a href={'http://localhost:3000/products/' + product.id} target="_blank" rel="noreferrer">Ver</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
