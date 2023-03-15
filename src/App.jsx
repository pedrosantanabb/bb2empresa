
import { Route, Routes } from 'react-router-dom';
import { TableItems} from './components/TableItems.jsx';
import { ItemDetail } from './components/ItemDetail.jsx';
import {ItemUpdateForm} from './components/ItemUpdateForm';
import { ItemNewForm } from './components/ItemNewForm.jsx';
import { SupplierList} from './components/SupplierList.jsx';

import { Menu } from './components/Menu.jsx';
import { SupplierNewForm } from './components/SupplierNewForm.jsx';
import { SupplierUpdateForm } from './components/SupplierUpdateForm.jsx';
import { SupplierDetail } from './components/SupplierDetail.jsx';


export function App() {
  return (
    <>
      <Menu/>
      <Routes>
        <Route path='/' element={<TableItems/>}/>
        <Route path='/items/:id' element={<ItemDetail/>}/>
        <Route path='/items/update/:id' element={<ItemUpdateForm/>}/>
        <Route path='/items/newItem' element={<ItemNewForm/>}/>

        <Route path='/suppliers' element={<SupplierList/>}/>
        <Route path='/suppliers/newSupplier' element={<SupplierNewForm/>}/>
        <Route path='/suppliers/:id' element={<SupplierDetail/>}/>
        <Route path='/suppliers/update/:id' element={<SupplierUpdateForm/>}/>
        
      </Routes>    
    </>
  );
}
