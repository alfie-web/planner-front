import { Switch, Route, Redirect } from 'react-router-dom';
import './layouts/fonts.sass';
import './layouts/main.sass';

import { DatesPage } from './pages';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path={['/', '/:day/:month/:year']} component={DatesPage} />
				<Redirect from="*" to="/" />
			</Switch>
		</div>
	);
}

export default App;
