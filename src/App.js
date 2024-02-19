import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import VKBridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';

import Home from './panels/Home';
import Quest from './panels/Quest';
import CreateQuest from "./panels/Quest/CreateQuest";
import Slider from './panels/Slider';
import Notification from './panels/Notification/Notification';
import Calendar from './panels/Calendar/Calendar';
import Settings from './panels/Setting/Settings';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null);

	const [state, setState] = useState(null);

	const callBackendAPI = async () => {
		try {
			const response = await fetch('http://localhost:5000/api');

			if (!response.ok) {
				throw new Error('Ошибка запроса');
			}

			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error('Ошибка при запросе к API:', error);
			// Обработка ошибки
		}
	};

	// получение GET маршрута с сервера Express, который соответствует GET из server.js 
	// useEffect(() => {
	// 	callBackendAPI()
	// 		.then(res => setState(res.express))
	// 		.catch(err => console.log(err));
	// }, [])

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	// Vk bridge start
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		// Функция для получения ID пользователя через VK Bridge
		const fetchUserId = async () => {
			try {
				const userInfo = await VKBridge.send('VKWebAppGetUserInfo');
				setUserId(userInfo.id);
			} catch (error) {
				console.error('Ошибка при получении информации о пользователе:', error);
			}
		};

		// Вызываем функцию при монтировании компонента
		fetchUserId();
	}, []);
	// Vk bridge end

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Slider id='slider' go={go} userId={userId} />
								<Home id='home' go={go} />
								<Quest id='quest' go={go} />
								<CreateQuest id='CreateQuest' go={go} />
								<Notification id='Notification' go={go} />
								<Calendar id='calendar' go={go} />
								<Settings id='settings' go={go} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
