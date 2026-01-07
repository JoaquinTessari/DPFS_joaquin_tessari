import React, { useState, useEffect } from 'react';

function CategoriesInDb() {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                if (data.meta && data.meta.countByCategory) {
                    setCategories(data.meta.countByCategory);
                }
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Categorías en Base de Datos</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        {Object.keys(categories).map((category, index) => (
                            <div className="col-lg-6 mb-4" key={index}>
                                <div className="card bg-info text-white shadow">
                                    <div className="card-body">
                                        {category}: {categories[category]}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriesInDb;
