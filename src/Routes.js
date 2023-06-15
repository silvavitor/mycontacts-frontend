import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import Categories from './pages/Categories';
import NewCategory from './pages/NewCategory';
import EditCategory from './pages/EditCategory';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
      <Route path="/categories" exact component={Categories} />
      <Route path="/categories/new" component={NewCategory} />
      <Route path="/categories/edit/:id" exact component={EditCategory} />
    </Switch>
  );
}
