import {Switch, Route, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import NotFound from './components/NotFound'
import JobsRoute from './components/JobsRoute'
import ProtectedRoute from './components/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
