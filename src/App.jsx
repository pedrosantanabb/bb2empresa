
import { Route, Routes } from 'react-router-dom';
import { TableItems} from './components/TableItems.jsx';
import { ItemDetail } from './components/ItemDetail.jsx';
import {ItemUpdateForm} from './components/ItemUpdateForm';
import { ItemNewForm } from './components/ItemNewForm.jsx';

export function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<TableItems/>}/>
        <Route path='/items/:id' element={<ItemDetail/>}/>
        <Route path='/items/update/:id' element={<ItemUpdateForm/>}/>
        <Route path='/items/newItem' element={<ItemNewForm/>}/>
      </Routes>    
    </>
  );
}
