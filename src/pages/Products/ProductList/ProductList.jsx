import React, { useState, useEffect } from 'react';
import PageHeader from '../../../components/ProductComponent/PageHeader/PageHeader';
import StatsCards from '../../../components/ProductComponent/StatsCards/StatsCards';
import TableFilters from '../../../components/Shared/TableFilters/TableFilters';
import ProductTable from '../../../components/Shared/ProductTable/ProductTable';
import { getAllProducts } from "../../../api/productApi"; // আপনার API পাথ অনুযায়ী ঠিক করে নিন

const ProductList = () => {
    const [products, setProducts] = useState([]); // ডিফল্ট খালি অ্যারে
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                // API যদি সরাসরি অ্যারে দেয় তবে data, নতুবা data.products
                setProducts(Array.isArray(data) ? data : data.products || []); 
            } catch (error) {
                console.error("প্রোডাক্ট লিস্ট লোড করতে সমস্যা হয়েছে:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <PageHeader />
            <StatsCards />
            <div className="mt-6">
                <TableFilters />
                {/* এখানে products এবং loading প্রপস পাঠাতে হবে */}
                <ProductTable products={products} loading={loading} />
            </div>
        </div>
    );
};

export default ProductList;