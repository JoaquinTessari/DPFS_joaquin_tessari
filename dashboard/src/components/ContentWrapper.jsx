import React, { useState, useEffect } from 'react';
import SmallCard from './SmallCard';
import LastCreated from './LastCreated';
import CategoriesInDb from './CategoriesInDb';
import ProductList from './ProductList';

function ContentWrapper() {
    const [counts, setCounts] = useState({ products: 0, users: 0, categories: 0 });

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:3000/api/products').then(res => res.json()),
            fetch('http://localhost:3000/api/users').then(res => res.json())
        ])
            .then(([productsData, usersData]) => {
                setCounts({
                    products: productsData.meta.total,
                    users: usersData.meta.total,
                    categories: Object.keys(productsData.meta.countByCategory || {}).length
                });
            })
            .catch(err => console.error(err));
    }, []);

    const cardProps = [
        {
            title: 'Total de Productos',
            color: 'primary',
            count: counts.products,
            icon: 'fa-clipboard-list'
        },
        {
            title: 'Total de Usuarios',
            color: 'success',
            count: counts.users,
            icon: 'fa-user'
        },
        {
            title: 'Total de Categorías',
            color: 'warning',
            count: counts.categories,
            icon: 'fa-folder'
        }
    ];

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard de Administración</h1>
            </div>

            <div className="row">
                {cardProps.map((item, i) => <SmallCard {...item} key={i} />)}
            </div>

            <div className="row">
                <LastCreated />
                <CategoriesInDb />
            </div>

            <div className="row">
                <div className="col-12">
                    <h1 className="h3 mb-3 text-gray-800">Listado de Productos</h1>
                    <ProductList />
                </div>
            </div>
        </div>
    );
}

export default ContentWrapper;
