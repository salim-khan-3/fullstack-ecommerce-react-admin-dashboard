import React from 'react';
import TableFilters from '../TableFilters/TableFilters';
import ProductTable from '../ProductTable/ProductTable';

const ProductAnalyticsPage = () => {
    return (
        <div>
            <TableFilters></TableFilters>
            <ProductTable></ProductTable>
        </div>
    );
};

export default ProductAnalyticsPage;