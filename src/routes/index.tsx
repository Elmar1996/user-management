import axios from 'axios';
import { lazy, Suspense, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { initializeUsers, User } from 'redux/user-slice';
import browserHistory from 'utils/browser-utils';

const AppLayout = lazy(() => import('views/layout'));

const Routes: React.FC = () => {
    const users = useSelector((state: { users: User[] }) => state.users);
    const dispatch = useDispatch();
      const { data } = useQuery(
          ['products'],
          () =>
              axios.get(`https://jsonplaceholder.typicode.com/users`,),
         
      );
      useEffect(() => {
        if(!users.length){
            dispatch(initializeUsers(data?.data));
          }
      },[data])
    
    return (
        <Router history={browserHistory}>
            <Suspense fallback={<></>}>
                <Switch>
                    <Route path="/" component={AppLayout} />
                </Switch>
            </Suspense>
        </Router>
    );
};

export default Routes;
