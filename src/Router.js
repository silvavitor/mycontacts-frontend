import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import Categories from './pages/Categories';
import NewCategory from './pages/NewCategory';
import EditCategory from './pages/EditCategory';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/new" element={<NewCategory />} />
      <Route path="/categories/edit/:id" element={<EditCategory />} />
    </Routes>
  );
}
