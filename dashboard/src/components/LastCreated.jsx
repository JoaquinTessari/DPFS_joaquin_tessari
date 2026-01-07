import React, { useState, useEffect } from 'react';

function LastCreated() {
    const [lastProduct, setLastProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/products/latest')
            .then(response => response.json())
            .then(data => {
                console.log('API Response:', data);
                if (data.data) {
                    console.log('Image path from API:', data.data.image);
                    setLastProduct(data.data);
                }
            })
            .catch(error => console.error('API Error:', error));
    }, []);

    if (!lastProduct) return <div>Cargando...</div>;

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto agregado</h5>
                </div>
                <div className="card-body">
                    <h4 className="text-center mb-3">{lastProduct.name}</h4>
                    <div className="text-center">
                        <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            style={{ width: '25rem' }}
                            src={'http://localhost:3000' + lastProduct.image}
                            alt={lastProduct.name}
                            onError={(e) => {
                                console.error('Image failed to load:', e.target.src);
                                e.target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
                            }}
                        />
                    </div>
                    <p>{lastProduct.description}</p>
                    <a target="_blank" rel="nofollow" href={`http://localhost:3000/products/${lastProduct.id}`}>Ver detalle del producto</a>
                </div>
            </div>
        </div>
    );
}

export default LastCreated;
