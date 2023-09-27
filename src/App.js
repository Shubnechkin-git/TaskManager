import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';



import Home from './panels/Home';
import Quest from './panels/Quest';
import Slider from './panels/Slider';

const App = () => {
	const [activePanel, setActivePanel] = useState('slider');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null);

	const [state, setState] = useState(null);

	const callBackendAPI = async () => {
		const response = await fetch('/express_backend').then(response => response.json())
			.then(data => {
				console.log(data);
			});
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message)
		}
		return body;
	};

	// получение GET маршрута с сервера Express, который соответствует GET из server.js 
	useEffect(() => {
		callBackendAPI()
			.then(res => setState(res.express))
			.catch(err => console.log(err));
	}, [])

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Slider id='slider' go={go} fetchedUser={fetchedUser} />
								<Home id='home' go={go} />
								<Quest id='quest' go={go} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
