import { lazy } from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';

const UsersPage = lazy(() => import('views/users'));
const CreateNewUsersPage = lazy(() => import('views/users/create'));
const EditUsersPage = lazy(() => import('views/users/edit'));


const AppRouter: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/users/create" component={CreateNewUsersPage} />
            <Route exact path="/users/edit/:id" component={EditUsersPage} />
            <Redirect to="/users"/>
        </Switch>
    );
};
export default AppRouter;
